import { MongoClient, type Db } from 'mongodb'

const options = {}

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error(
      'MONGODB_URI não está definida. Crie .env.local com a string de conexão do MongoDB.'
    )
  }
  return uri
}

let clientPromise: Promise<MongoClient> | null = null

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) {
    return clientPromise
  }

  if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = globalThis as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }
    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(getMongoUri(), options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    const client = new MongoClient(getMongoUri(), options)
    clientPromise = client.connect()
  }

  return clientPromise
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise()
  const name = process.env.MONGODB_DB_NAME || 'rdf_site'
  return client.db(name)
}
