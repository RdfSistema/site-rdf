import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import WhyChooseUs from "@/components/why-choose-us"
import NossaEstrutura from "@/components/nossa-estrutura"
import Stats from "@/components/stats"
import Contact from "@/components/contact"
import Location from "@/components/location"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-white">
      <Header />
      <Hero />
      <Services />
      <WhyChooseUs />
      <NossaEstrutura />
      <Stats />
      <Contact />
      <Location />
      <Footer />
    </main>
  )
}
