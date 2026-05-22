import nodemailer from 'nodemailer'

type NewRegistrationEmailInput = {
  uid: string
  name: string
  companyName: string
  cnpj?: string
  phone: string
  email: string
  howHeard: string
}

const APPROVAL_WINDOW = '40 minutos a 1 hora'
const BRAND_NAME = 'RDF Logistica'

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Variavel de ambiente ${name} nao configurada.`)
  }
  return value
}

function getMailTransport() {
  const port = Number(process.env.SMTP_PORT ?? 465)

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: {
      user: requiredEnv('SMTP_USER'),
      pass: requiredEnv('SMTP_PASS'),
    },
  })
}

function getMailFrom(): string {
  const fromName = process.env.SMTP_FROM_NAME ?? 'RDF Logistica'
  const fromEmail = process.env.SMTP_FROM_EMAIL ?? requiredEnv('SMTP_USER')
  return `"${fromName}" <${fromEmail}>`
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function displayValue(value: string | undefined): string {
  const trimmed = value?.trim()
  return trimmed ? escapeHtml(trimmed) : 'Nao informado'
}

function getSiteUrl(): string | null {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL

  if (!rawUrl) {
    return null
  }

  const url = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`
  return url.replace(/\/$/, '')
}

function getLogoUrl(): string | null {
  const customLogoUrl = process.env.EMAIL_LOGO_URL
  if (customLogoUrl) {
    return customLogoUrl
  }

  const siteUrl = getSiteUrl()
  return siteUrl ? `${siteUrl}/logo.png` : null
}

function createEmailShell(title: string, content: string): string {
  return `
    <div style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;color:#223354;">
      <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
        <div style="overflow:hidden;border:1px solid #dbe4ee;border-radius:16px;background:#ffffff;">
          <div style="height:6px;background:linear-gradient(90deg,#34d1b4 0%,#2ab59c 35%,#223354 100%);"></div>
          <div style="padding:28px;">
            <p style="margin:0 0 8px;color:#0d6b5c;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">RDF Logistica</p>
            <h1 style="margin:0 0 18px;color:#223354;font-size:24px;line-height:1.25;">${title}</h1>
            ${content}
          </div>
        </div>
      </div>
    </div>
  `
}

function buildAdminEmail(input: NewRegistrationEmailInput) {
  const content = `
    <p style="margin:0 0 18px;color:#4b5563;font-size:15px;line-height:1.6;">
      Um novo usuario concluiu o cadastro e esta aguardando autorizacao para acessar o sistema.
    </p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tbody>
        <tr><td style="padding:10px;border-top:1px solid #eef2f7;font-weight:700;">Nome</td><td style="padding:10px;border-top:1px solid #eef2f7;">${displayValue(input.name)}</td></tr>
        <tr><td style="padding:10px;border-top:1px solid #eef2f7;font-weight:700;">Empresa</td><td style="padding:10px;border-top:1px solid #eef2f7;">${displayValue(input.companyName)}</td></tr>
        <tr><td style="padding:10px;border-top:1px solid #eef2f7;font-weight:700;">E-mail</td><td style="padding:10px;border-top:1px solid #eef2f7;">${displayValue(input.email)}</td></tr>
        <tr><td style="padding:10px;border-top:1px solid #eef2f7;font-weight:700;">Telefone</td><td style="padding:10px;border-top:1px solid #eef2f7;">${displayValue(input.phone)}</td></tr>
        <tr><td style="padding:10px;border-top:1px solid #eef2f7;font-weight:700;">CNPJ</td><td style="padding:10px;border-top:1px solid #eef2f7;">${displayValue(input.cnpj)}</td></tr>
        <tr><td style="padding:10px;border-top:1px solid #eef2f7;font-weight:700;">Como conheceu</td><td style="padding:10px;border-top:1px solid #eef2f7;">${displayValue(input.howHeard)}</td></tr>
        <tr><td style="padding:10px;border-top:1px solid #eef2f7;font-weight:700;">UID Firebase</td><td style="padding:10px;border-top:1px solid #eef2f7;">${displayValue(input.uid)}</td></tr>
      </tbody>
    </table>
    <div style="margin-top:20px;padding:14px;border-radius:12px;background:#fff7ed;color:#9a3412;font-size:14px;line-height:1.5;">
      Status atual: aguardando autorizacao. Para liberar o acesso, atualize o usuario para <strong>accessStatus: approved</strong>.
    </div>
  `

  return {
    subject: `Novo cadastro aguardando aprovacao - ${input.companyName || input.name || input.email}`,
    text: [
      'Novo cadastro aguardando autorizacao.',
      `Nome: ${input.name || 'Nao informado'}`,
      `Empresa: ${input.companyName || 'Nao informado'}`,
      `E-mail: ${input.email}`,
      `Telefone: ${input.phone || 'Nao informado'}`,
      `CNPJ: ${input.cnpj || 'Nao informado'}`,
      `Como conheceu: ${input.howHeard || 'Nao informado'}`,
      `UID Firebase: ${input.uid}`,
      'Para liberar o acesso, atualize o usuario para accessStatus: approved.',
    ].join('\n'),
    html: createEmailShell('Novo cadastro aguardando aprovacao', content),
  }
}

function buildClientEmail(input: NewRegistrationEmailInput) {
  const firstName = input.name.trim().split(/\s+/)[0] || 'Cliente'
  const logoUrl = getLogoUrl()
  const logoMarkup = logoUrl
    ? `<img src="${escapeHtml(logoUrl)}" width="116" alt="${BRAND_NAME}" style="display:block;max-width:116px;height:auto;border:0;outline:none;text-decoration:none;">`
    : `<strong style="font-size:22px;letter-spacing:.08em;color:#ffffff;">RDF</strong>`
  const companyLine = input.companyName
    ? `<p style="margin:8px 0 0;color:#64748b;font-size:13px;line-height:1.5;">Cadastro vinculado a <strong style="color:#223354;">${displayValue(input.companyName)}</strong>.</p>`
    : ''

  const html = `
    <div style="margin:0;padding:0;background:#eef3f7;font-family:Arial,sans-serif;color:#223354;">
      <div style="max-width:720px;margin:0 auto;padding:28px 14px;">
        <div style="overflow:hidden;border-radius:18px;background:#ffffff;border:1px solid #dbe4ee;box-shadow:0 18px 45px rgba(34,51,84,.12);">
          <div style="background:#223354;padding:24px 26px 28px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <tr>
                <td style="vertical-align:middle;">
                  ${logoMarkup}
                </td>
                <td align="right" style="vertical-align:middle;">
                  <span style="display:inline-block;border-radius:999px;background:rgba(52,209,180,.16);color:#34d1b4;padding:8px 12px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">
                    Cadastro recebido
                  </span>
                </td>
              </tr>
            </table>
            <div style="height:4px;background:linear-gradient(90deg,#34d1b4 0%,#2ab59c 45%,rgba(255,255,255,.32) 100%);border-radius:999px;margin-top:22px;"></div>
            <h1 style="margin:24px 0 0;color:#ffffff;font-size:28px;line-height:1.22;font-weight:800;">
              Seu cadastro foi realizado com sucesso
            </h1>
            <p style="margin:10px 0 0;color:rgba(255,255,255,.78);font-size:15px;line-height:1.6;">
              Ola, ${escapeHtml(firstName)}. Recebemos sua solicitacao de acesso a area do cliente RDF.
            </p>
          </div>

          <div style="padding:28px 26px 8px;">
            <div style="border:1px solid #b8f3e6;background:#ecfdf8;border-radius:16px;padding:18px 18px 16px;">
              <p style="margin:0;color:#0d6b5c;font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">
                Status da solicitacao
              </p>
              <h2 style="margin:8px 0 6px;color:#223354;font-size:20px;line-height:1.3;">
                Aguardando autorizacao
              </h2>
              <p style="margin:0;color:#35516f;font-size:14px;line-height:1.65;">
                Nossa equipe fara a conferencia dos dados. A aprovacao leva no maximo entre <strong>${APPROVAL_WINDOW}</strong>.
              </p>
              ${companyLine}
            </div>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-top:18px;">
              <tr>
                <td width="33.33%" style="padding:0 6px 12px 0;vertical-align:top;">
                  <div style="min-height:128px;border:1px solid #e5edf5;border-radius:14px;padding:16px;background:#ffffff;">
                    <div style="width:32px;height:32px;border-radius:10px;background:#34d1b4;color:#ffffff;text-align:center;line-height:32px;font-weight:800;">1</div>
                    <h3 style="margin:12px 0 6px;color:#223354;font-size:14px;">Recebemos seus dados</h3>
                    <p style="margin:0;color:#64748b;font-size:12px;line-height:1.55;">Seu cadastro entrou na fila de atendimento RDF.</p>
                  </div>
                </td>
                <td width="33.33%" style="padding:0 6px 12px;vertical-align:top;">
                  <div style="min-height:128px;border:1px solid #e5edf5;border-radius:14px;padding:16px;background:#ffffff;">
                    <div style="width:32px;height:32px;border-radius:10px;background:#34d1b4;color:#ffffff;text-align:center;line-height:32px;font-weight:800;">2</div>
                    <h3 style="margin:12px 0 6px;color:#223354;font-size:14px;">Validacao interna</h3>
                    <p style="margin:0;color:#64748b;font-size:12px;line-height:1.55;">A equipe confere as informacoes antes de liberar o sistema.</p>
                  </div>
                </td>
                <td width="33.33%" style="padding:0 0 12px 6px;vertical-align:top;">
                  <div style="min-height:128px;border:1px solid #e5edf5;border-radius:14px;padding:16px;background:#ffffff;">
                    <div style="width:32px;height:32px;border-radius:10px;background:#34d1b4;color:#ffffff;text-align:center;line-height:32px;font-weight:800;">3</div>
                    <h3 style="margin:12px 0 6px;color:#223354;font-size:14px;">Acesso liberado</h3>
                    <p style="margin:0;color:#64748b;font-size:12px;line-height:1.55;">Depois da confirmacao por e-mail, volte ao login para entrar.</p>
                  </div>
                </td>
              </tr>
            </table>

            <div style="margin-top:8px;border-left:4px solid #34d1b4;background:#f8fafc;border-radius:12px;padding:16px;">
              <p style="margin:0;color:#334155;font-size:14px;line-height:1.65;">
                Importante: o login nao e liberado automaticamente apos o cadastro. Aguarde a autorizacao por e-mail antes de tentar acessar a area do cliente.
              </p>
            </div>
          </div>

          <div style="padding:18px 26px 26px;">
            <div style="background:#223354;border-radius:16px;padding:18px;">
              <p style="margin:0;color:#ffffff;font-size:14px;font-weight:700;">
                RDF Comercio Exterior e Armazens Gerais
              </p>
              <p style="margin:6px 0 0;color:rgba(255,255,255,.72);font-size:12px;line-height:1.55;">
                Solucoes em comercio exterior, armazenagem e operacoes logisticas.
              </p>
            </div>
            <p style="margin:16px 0 0;color:#94a3b8;font-size:11px;line-height:1.5;text-align:center;">
              Esta mensagem foi enviada automaticamente. Nao e necessario responder este e-mail.
            </p>
          </div>
        </div>
      </div>
    </div>
  `

  return {
    subject: 'Cadastro recebido com sucesso - RDF Logistica',
    text: [
      `Ola, ${firstName}. Recebemos seu cadastro com sucesso.`,
      `A equipe RDF fara a conferencia dos dados. A aprovacao leva no maximo entre ${APPROVAL_WINDOW}.`,
      'Assim que seu acesso for autorizado, voce recebera uma confirmacao por e-mail.',
      'O login nao e liberado automaticamente apos o cadastro.',
    ].join('\n'),
    html,
  }
}

export async function sendRegistrationEmails(
  input: NewRegistrationEmailInput
): Promise<void> {
  const adminEmail = requiredEnv('ADMIN_EMAIL')
  const transport = getMailTransport()
  const from = getMailFrom()
  const admin = buildAdminEmail(input)
  const client = buildClientEmail(input)

  const results = await Promise.allSettled([
    transport.sendMail({
      from,
      to: adminEmail,
      replyTo: input.email,
      subject: admin.subject,
      text: admin.text,
      html: admin.html,
    }),
    transport.sendMail({
      from,
      to: input.email,
      subject: client.subject,
      text: client.text,
      html: client.html,
    }),
  ])

  const rejected = results.filter((result) => result.status === 'rejected')
  if (rejected.length > 0) {
    console.error('registration email error', rejected)
  }
}
