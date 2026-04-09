import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HeroSection } from "@/components/HeroSection"
import { SolucionesSection } from "@/components/SolucionesSection"
import { PartnersSection } from "@/components/PartnersSection"
import { CategoriaSection } from "@/components/CategoriaSection"
import { getEquipos } from "@/lib/data"

export default async function HomePage() {
  // Obtener equipos destacados por categoría
  let multifuncionales = []
  let impresoras = []

  try {
    const [multiResult, impResult] = await Promise.all([
      getEquipos({ tipo: "Multifuncional", limit: 6 }),
      getEquipos({ tipo: "Impresora", limit: 6 }),
    ])
    multifuncionales = multiResult.equipos
    impresoras = impResult.equipos
  } catch (error) {
    console.error("Error cargando equipos:", error)
    // Los componentes manejarán el estado vacío
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Nuestras Soluciones */}
      <SolucionesSection />

      {/* Categoría Multifuncional */}
      <CategoriaSection
        titulo="Categoría Multifuncional"
        subtitulo="Explora nuestras categorías principales"
        equipos={multifuncionales}
        verMasLink="/catalogo?tipo=Multifuncional"
      />

      {/* Partners Section */}
      <PartnersSection />

      {/* Categoría Impresoras */}
      <CategoriaSection
        titulo="Categoría Impresoras"
        subtitulo="Más opciones para tu negocio"
        equipos={impresoras}
        verMasLink="/catalogo?tipo=Impresora"
      />

      <Footer />
    </main>
  )
}
