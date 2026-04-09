import Link from "next/link"
import Image from "next/image"
import type { Equipo } from "@/lib/types"

interface ProductCardProps {
  equipo: Equipo
  showBadge?: boolean
  badgeText?: string
}

export function ProductCard({ equipo, showBadge = false, badgeText = "DESTACADO" }: ProductCardProps) {
  // Construir URL de imagen
  const imagenUrl = equipo.Imagen_Equipo 
    ? equipo.Imagen_Equipo.startsWith("http") 
      ? equipo.Imagen_Equipo 
      : `/images/equipos/${equipo.Imagen_Equipo}`
    : "/images/equipos/placeholder.png"

  return (
    <div className="card-hover relative bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
      {/* Imagen del producto */}
      <div className="h-[275px] flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-50">
        <Image
          src={imagenUrl}
          alt={equipo.Nombre_Equipo}
          width={280}
          height={275}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Badge opcional */}
      {showBadge && (
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-ofimundo-red text-white text-xs font-bold rounded-full">
            {badgeText}
          </span>
        </div>
      )}

      {/* Información del producto */}
      <div className="p-6 flex flex-col flex-1">
        {/* Marca */}
        {equipo.Nombre_Marca && (
          <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {equipo.Nombre_Marca}
          </span>
        )}

        {/* Nombre */}
        <h3 className="nombre-producto text-lg font-bold text-ofimundo-navy mb-2">
          {equipo.Nombre_Equipo}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {equipo.Descripcion_Equipo || `${equipo.Tipo_Equipo} ${equipo.Tecnologia_Equipo || ""}`}
        </p>

        {/* Especificaciones rápidas */}
        <div className="flex flex-wrap gap-2 mb-4">
          {equipo.Velocidad_BN_Equipo && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {equipo.Velocidad_BN_Equipo} ppm
            </span>
          )}
          {equipo.Color_Equipo && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {equipo.Color_Equipo}
            </span>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-3 mt-auto">
          <button className="btn-cotizar flex-1 text-center px-4 py-3 bg-gradient-to-br from-[var(--ofimundo-purple)] to-[var(--ofimundo-magenta)] text-white rounded-lg text-sm font-semibold hover:from-[#241a78] hover:to-[#c62842] transition">
            Cotizar
          </button>

          <Link
            href={`/equipo/${equipo.ID_Producto}`}
            className="flex-1 text-center px-4 py-3 border border-gray-300 text-ofimundo-navy rounded-lg text-sm font-medium hover:bg-gray-50 transition"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  )
}
