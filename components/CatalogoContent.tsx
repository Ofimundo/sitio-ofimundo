"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ProductCard } from "./ProductCard"
import { FilterSidebar } from "./FilterSidebar"
import type { Equipo } from "@/lib/types"

// Datos mock para cuando no hay BD conectada
const mockEquipos: Equipo[] = [
  {
    ID_Producto: "WF-C5891",
    ID_Marca: 1,
    Nombre_Equipo: "WorkForce Pro WF-C5891",
    Tipo_Equipo: "Multifuncional",
    Tecnologia_Equipo: "Inyección de tinta",
    Color_Equipo: "Color",
    Tamano_Papel_Equipo: "A4",
    Velocidad_BN_Equipo: 25,
    Velocidad_Color_Equipo: 25,
    Velocidad_1ra_Pag_BN_Equipo: null,
    Velocidad_1ra_Pag_Color_Equipo: null,
    Capacidad_Bandeja1_Equipo: 250,
    Capacidad_Bypass_Equipo: null,
    Ciclo_Recomendado_Equipo: "8300 pág",
    Ciclo_Mensual_Equipo: null,
    Ciclo_Maximo_Equipo: null,
    Tipo_Pantalla_Equipo: "Táctil",
    Tamano_Pantalla_Equipo: null,
    Memoria_RAM_Equipo: null,
    Procesador_Equipo: null,
    Disco_Duro_Equipo: null,
    Funciones_Equipo: "Imprimir, Copiar, Escanear, Fax",
    Conectividad_Equipo: "WiFi, Ethernet, USB",
    Duracion_Bateria_Equipo: null,
    Archivo_PDF_Equipo: null,
    Imagen_Equipo: "/images/equipos/multifuncional/WF-C5891.png",
    Descripcion_Equipo: "Esta multifuncional PrecisionCore Heat-Free optimiza su oficina con 25 ppm ISO.",
    Fecha_Carga_Equipo: null,
    Fecha_Registro_Equipo: null,
    Nombre_Marca: "Epson",
  },
  {
    ID_Producto: "WF-M5899",
    ID_Marca: 1,
    Nombre_Equipo: "WorkForce Pro WF-M5899",
    Tipo_Equipo: "Multifuncional",
    Tecnologia_Equipo: "Inyección de tinta",
    Color_Equipo: "Monocromático",
    Tamano_Papel_Equipo: "A4",
    Velocidad_BN_Equipo: 25,
    Velocidad_Color_Equipo: null,
    Velocidad_1ra_Pag_BN_Equipo: null,
    Velocidad_1ra_Pag_Color_Equipo: null,
    Capacidad_Bandeja1_Equipo: 250,
    Capacidad_Bypass_Equipo: null,
    Ciclo_Recomendado_Equipo: null,
    Ciclo_Mensual_Equipo: null,
    Ciclo_Maximo_Equipo: null,
    Tipo_Pantalla_Equipo: null,
    Tamano_Pantalla_Equipo: null,
    Memoria_RAM_Equipo: null,
    Procesador_Equipo: null,
    Disco_Duro_Equipo: null,
    Funciones_Equipo: "Imprimir, Copiar, Escanear",
    Conectividad_Equipo: "WiFi, Ethernet, USB",
    Duracion_Bateria_Equipo: null,
    Archivo_PDF_Equipo: null,
    Imagen_Equipo: "/images/equipos/multifuncional/WF-M5899.png",
    Descripcion_Equipo: "Multifuncional que maximiza tu productividad con 25 ppm ISO.",
    Fecha_Carga_Equipo: null,
    Fecha_Registro_Equipo: null,
    Nombre_Marca: "Epson",
  },
  {
    ID_Producto: "M3170",
    ID_Marca: 1,
    Nombre_Equipo: "EcoTank M3180",
    Tipo_Equipo: "Multifuncional",
    Tecnologia_Equipo: "EcoTank",
    Color_Equipo: "Monocromático",
    Tamano_Papel_Equipo: "A4",
    Velocidad_BN_Equipo: 20,
    Velocidad_Color_Equipo: null,
    Velocidad_1ra_Pag_BN_Equipo: null,
    Velocidad_1ra_Pag_Color_Equipo: null,
    Capacidad_Bandeja1_Equipo: 250,
    Capacidad_Bypass_Equipo: null,
    Ciclo_Recomendado_Equipo: null,
    Ciclo_Mensual_Equipo: null,
    Ciclo_Maximo_Equipo: null,
    Tipo_Pantalla_Equipo: null,
    Tamano_Pantalla_Equipo: null,
    Memoria_RAM_Equipo: null,
    Procesador_Equipo: null,
    Disco_Duro_Equipo: null,
    Funciones_Equipo: "Imprimir, Copiar, Escanear",
    Conectividad_Equipo: "WiFi, Ethernet",
    Duracion_Bateria_Equipo: null,
    Archivo_PDF_Equipo: null,
    Imagen_Equipo: "/images/equipos/multifuncional/M3170.png",
    Descripcion_Equipo: "Revoluciona su oficina con ahorros de hasta el 90%.",
    Fecha_Carga_Equipo: null,
    Fecha_Registro_Equipo: null,
    Nombre_Marca: "Epson",
  },
  {
    ID_Producto: "WF-M5399",
    ID_Marca: 1,
    Nombre_Equipo: "WF-M5399",
    Tipo_Equipo: "Impresora",
    Tecnologia_Equipo: "Inyección de tinta",
    Color_Equipo: "Monocromático",
    Tamano_Papel_Equipo: "A4",
    Velocidad_BN_Equipo: 24,
    Velocidad_Color_Equipo: null,
    Velocidad_1ra_Pag_BN_Equipo: null,
    Velocidad_1ra_Pag_Color_Equipo: null,
    Capacidad_Bandeja1_Equipo: 250,
    Capacidad_Bypass_Equipo: null,
    Ciclo_Recomendado_Equipo: null,
    Ciclo_Mensual_Equipo: null,
    Ciclo_Maximo_Equipo: null,
    Tipo_Pantalla_Equipo: null,
    Tamano_Pantalla_Equipo: null,
    Memoria_RAM_Equipo: null,
    Procesador_Equipo: null,
    Disco_Duro_Equipo: null,
    Funciones_Equipo: "Imprimir",
    Conectividad_Equipo: "WiFi, Ethernet, USB",
    Duracion_Bateria_Equipo: null,
    Archivo_PDF_Equipo: null,
    Imagen_Equipo: "/images/equipos/impresoras/WF-M5399.png",
    Descripcion_Equipo: "Robusto equipo de impresión monocromática que ofrece alta productividad.",
    Fecha_Carga_Equipo: null,
    Fecha_Registro_Equipo: null,
    Nombre_Marca: "Epson",
  },
  {
    ID_Producto: "M1180",
    ID_Marca: 1,
    Nombre_Equipo: "EcoTank M1180",
    Tipo_Equipo: "Impresora",
    Tecnologia_Equipo: "EcoTank",
    Color_Equipo: "Monocromático",
    Tamano_Papel_Equipo: "A4",
    Velocidad_BN_Equipo: 20,
    Velocidad_Color_Equipo: null,
    Velocidad_1ra_Pag_BN_Equipo: "6 seg",
    Velocidad_1ra_Pag_Color_Equipo: null,
    Capacidad_Bandeja1_Equipo: 250,
    Capacidad_Bypass_Equipo: null,
    Ciclo_Recomendado_Equipo: null,
    Ciclo_Mensual_Equipo: null,
    Ciclo_Maximo_Equipo: null,
    Tipo_Pantalla_Equipo: null,
    Tamano_Pantalla_Equipo: null,
    Memoria_RAM_Equipo: null,
    Procesador_Equipo: null,
    Disco_Duro_Equipo: null,
    Funciones_Equipo: "Imprimir",
    Conectividad_Equipo: "WiFi, Ethernet",
    Duracion_Bateria_Equipo: null,
    Archivo_PDF_Equipo: null,
    Imagen_Equipo: "/images/equipos/impresoras/M1180.png",
    Descripcion_Equipo: "Maximiza su productividad con una primera página en 6 segundos y 20 ppm.",
    Fecha_Carga_Equipo: null,
    Fecha_Registro_Equipo: null,
    Nombre_Marca: "Epson",
  },
  {
    ID_Producto: "PA4500X",
    ID_Marca: 2,
    Nombre_Equipo: "ECOSYS PA4500x",
    Tipo_Equipo: "Impresora",
    Tecnologia_Equipo: "Láser",
    Color_Equipo: "Monocromático",
    Tamano_Papel_Equipo: "A4",
    Velocidad_BN_Equipo: 45,
    Velocidad_Color_Equipo: null,
    Velocidad_1ra_Pag_BN_Equipo: null,
    Velocidad_1ra_Pag_Color_Equipo: null,
    Capacidad_Bandeja1_Equipo: 500,
    Capacidad_Bypass_Equipo: null,
    Ciclo_Recomendado_Equipo: null,
    Ciclo_Mensual_Equipo: null,
    Ciclo_Maximo_Equipo: null,
    Tipo_Pantalla_Equipo: null,
    Tamano_Pantalla_Equipo: null,
    Memoria_RAM_Equipo: null,
    Procesador_Equipo: null,
    Disco_Duro_Equipo: null,
    Funciones_Equipo: "Imprimir",
    Conectividad_Equipo: "WiFi, Ethernet, USB",
    Duracion_Bateria_Equipo: null,
    Archivo_PDF_Equipo: null,
    Imagen_Equipo: "/images/equipos/impresoras/ECOSYS-PA-4500X.png",
    Descripcion_Equipo: "Impresora láser monocromática de alta velocidad para entornos exigentes.",
    Fecha_Carga_Equipo: null,
    Fecha_Registro_Equipo: null,
    Nombre_Marca: "Kyocera",
  },
]

const mockFiltros = {
  tipos: ["Multifuncional", "Impresora", "Scanner", "Fotocopiadora"],
  marcas: ["Epson", "Kyocera", "Brother", "HP", "Lexmark"],
  tecnologias: ["Inyección de tinta", "Láser", "EcoTank"],
  colores: ["Color", "Monocromático"],
}

export function CatalogoContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [equipos, setEquipos] = useState<Equipo[]>(mockEquipos)
  const [filtros, setFiltros] = useState(mockFiltros)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(mockEquipos.length)
  const [searchTerm, setSearchTerm] = useState("")

  const [filtrosActivos, setFiltrosActivos] = useState({
    tipo: searchParams.get("tipo") || undefined,
    marca: searchParams.get("marca") || undefined,
    tecnologia: searchParams.get("tecnologia") || undefined,
    color: searchParams.get("color") || undefined,
  })

  // Cargar equipos desde API
  const cargarEquipos = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filtrosActivos.tipo) params.set("tipo", filtrosActivos.tipo)
      if (filtrosActivos.marca) params.set("marca", filtrosActivos.marca)
      if (filtrosActivos.tecnologia) params.set("tecnologia", filtrosActivos.tecnologia)
      if (filtrosActivos.color) params.set("color", filtrosActivos.color)
      if (searchTerm) params.set("search", searchTerm)

      const res = await fetch(`/api/equipos?${params.toString()}`)
      const data = await res.json()

      if (data.success && data.data) {
        setEquipos(data.data)
        setTotal(data.total || data.data.length)
      }
    } catch (error) {
      console.error("Error cargando equipos:", error)
      // Mantener datos mock en caso de error
      // Filtrar mock localmente
      let filtered = mockEquipos
      if (filtrosActivos.tipo) {
        filtered = filtered.filter((e) => e.Tipo_Equipo === filtrosActivos.tipo)
      }
      if (filtrosActivos.marca) {
        filtered = filtered.filter((e) => e.Nombre_Marca === filtrosActivos.marca)
      }
      if (filtrosActivos.tecnologia) {
        filtered = filtered.filter((e) => e.Tecnologia_Equipo === filtrosActivos.tecnologia)
      }
      if (filtrosActivos.color) {
        filtered = filtered.filter((e) => e.Color_Equipo === filtrosActivos.color)
      }
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(
          (e) =>
            e.Nombre_Equipo.toLowerCase().includes(term) ||
            e.Descripcion_Equipo?.toLowerCase().includes(term)
        )
      }
      setEquipos(filtered)
      setTotal(filtered.length)
    } finally {
      setLoading(false)
    }
  }, [filtrosActivos, searchTerm])

  // Cargar filtros disponibles
  useEffect(() => {
    const cargarFiltros = async () => {
      try {
        const res = await fetch("/api/equipos/filtros")
        const data = await res.json()
        if (data.success && data.data) {
          setFiltros(data.data)
        }
      } catch (error) {
        console.error("Error cargando filtros:", error)
        // Mantener filtros mock
      }
    }
    cargarFiltros()
  }, [])

  // Cargar equipos cuando cambian los filtros
  useEffect(() => {
    cargarEquipos()
  }, [cargarEquipos])

  // Actualizar URL cuando cambian los filtros
  const handleFiltroChange = (key: string, value: string | undefined) => {
    const newFiltros = { ...filtrosActivos, [key]: value }
    setFiltrosActivos(newFiltros)

    // Actualizar URL
    const params = new URLSearchParams()
    Object.entries(newFiltros).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    router.push(`/catalogo?${params.toString()}`, { scroll: false })
  }

  const handleLimpiarFiltros = () => {
    setFiltrosActivos({
      tipo: undefined,
      marca: undefined,
      tecnologia: undefined,
      color: undefined,
    })
    setSearchTerm("")
    router.push("/catalogo", { scroll: false })
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 pb-16">
      <div className="flex gap-6">
        {/* Sidebar de filtros */}
        <FilterSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          filtros={filtros}
          filtrosActivos={filtrosActivos}
          onFiltroChange={handleFiltroChange}
          onLimpiarFiltros={handleLimpiarFiltros}
        />

        {/* Contenido principal */}
        <div className="flex-1">
          {/* Barra de herramientas */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-ofimundo-purple transition"
                >
                  <i className="fas fa-filter text-ofimundo-purple"></i>
                  <span className="text-sm font-medium">Filtros</span>
                </button>
              )}
              <span className="text-gray-600">
                <strong className="text-ofimundo-navy">{total}</strong> equipos encontrados
              </span>
            </div>

            {/* Búsqueda */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar equipos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:border-ofimundo-purple"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Grid de productos */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
          ) : equipos.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="fas fa-box-open text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron equipos</h3>
              <p className="text-gray-500 mb-4">Intenta ajustar los filtros de búsqueda</p>
              <button
                onClick={handleLimpiarFiltros}
                className="px-6 py-2 bg-ofimundo-purple text-white rounded-lg hover:opacity-90 transition"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipos.map((equipo) => (
                <ProductCard key={equipo.ID_Producto} equipo={equipo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
