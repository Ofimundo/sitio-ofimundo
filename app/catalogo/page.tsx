import { Suspense } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CatalogoContent } from "@/components/CatalogoContent"

export const metadata = {
  title: "Catálogo de Equipos - Ofimundo",
  description: "Explora nuestro catálogo completo de multifuncionales, impresoras, scanners y más equipos de oficina.",
}

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl text-gradient title-xl mb-2">
              Catálogo de Equipos
            </h1>
            <p className="text-xl text-gray-600">
              Encuentra el equipo ideal para tu empresa
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<CatalogoSkeleton />}>
        <CatalogoContent />
      </Suspense>

      <Footer />
    </main>
  )
}

function CatalogoSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-[280px] bg-white rounded-xl p-4 h-[600px] animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-24"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="h-[200px] bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
