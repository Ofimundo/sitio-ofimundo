// Tipos para la tabla Equipos
export interface Equipo {
  ID_Producto: string
  ID_Marca: number
  Nombre_Equipo: string
  Tipo_Equipo: string
  Tecnologia_Equipo: string
  Color_Equipo: string
  Tamano_Papel_Equipo: string | null
  Velocidad_BN_Equipo: number | null
  Velocidad_Color_Equipo: number | null
  Velocidad_1ra_Pag_BN_Equipo: string | null
  Velocidad_1ra_Pag_Color_Equipo: string | null
  Capacidad_Bandeja1_Equipo: number | null
  Capacidad_Bypass_Equipo: number | null
  Ciclo_Recomendado_Equipo: string | null
  Ciclo_Mensual_Equipo: string | null
  Ciclo_Maximo_Equipo: string | null
  Tipo_Pantalla_Equipo: string | null
  Tamano_Pantalla_Equipo: string | null
  Memoria_RAM_Equipo: string | null
  Procesador_Equipo: string | null
  Disco_Duro_Equipo: string | null
  Funciones_Equipo: string | null
  Conectividad_Equipo: string | null
  Duracion_Bateria_Equipo: string | null
  Archivo_PDF_Equipo: string | null
  Imagen_Equipo: string | null
  Descripcion_Equipo: string | null
  Fecha_Carga_Equipo: string | null
  Fecha_Registro_Equipo: string | null
  // Campos adicionales para JOIN con Marca
  Nombre_Marca?: string
  Sitio_Web_Marca?: string
}

// Tipos para la tabla Marcas
export interface Marca {
  ID_Marca: number
  Nombre_Marca: string
  Sitio_Web: string | null
  Fecha_Registro: string | null
  Activo: boolean
}

// Tipos para filtros
export interface FiltrosEquipo {
  tipo?: string
  marca?: string
  tecnologia?: string
  color?: string
  search?: string
  limit?: number
  offset?: number
}

// Tipo para respuesta de API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  total?: number
}

// Categorías de equipos disponibles
export const CATEGORIAS_EQUIPO = [
  "Multifuncional",
  "Impresora",
  "Scanner",
  "Fotocopiadora",
  "Plotter",
  "Sala Colaborativa",
  "Toner",
  "Equipo de Oficina"
] as const

export type CategoriaEquipo = typeof CATEGORIAS_EQUIPO[number]
