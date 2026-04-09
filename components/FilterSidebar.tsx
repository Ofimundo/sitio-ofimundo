"use client"

import { useState } from "react"

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filtros: {
    tipos: string[]
    marcas: string[]
    tecnologias: string[]
    colores: string[]
  }
  filtrosActivos: {
    tipo?: string
    marca?: string
    tecnologia?: string
    color?: string
  }
  onFiltroChange: (key: string, value: string | undefined) => void
  onLimpiarFiltros: () => void
}

export function FilterSidebar({
  isOpen,
  onClose,
  filtros,
  filtrosActivos,
  onFiltroChange,
  onLimpiarFiltros,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<string[]>(["tipo", "marca"])

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    )
  }

  const filtrosCount = Object.values(filtrosActivos).filter(Boolean).length

  return (
    <aside className={`filter-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-inner w-[280px] h-screen flex flex-col sticky top-0">
        {/* Header */}
        <div className="sidebar-header p-5 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--ofimundo-purple)] to-[var(--ofimundo-magenta)] rounded-lg flex items-center justify-center text-white">
                <i className="fas fa-filter"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ofimundo-navy">Filtros</h2>
                <p className="text-xs text-gray-500">Refina tu búsqueda</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:text-ofimundo-magenta hover:bg-gray-50 transition shadow-sm"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Filtros activos */}
        {filtrosCount > 0 && (
          <div className="p-3 border-b border-gray-200 bg-yellow-50 flex flex-wrap gap-2">
            {filtrosActivos.tipo && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[var(--ofimundo-purple)] to-[var(--ofimundo-magenta)] text-white text-xs font-semibold rounded-full">
                {filtrosActivos.tipo}
                <button onClick={() => onFiltroChange("tipo", undefined)} className="hover:opacity-80">
                  <i className="fas fa-times text-[10px]"></i>
                </button>
              </span>
            )}
            {filtrosActivos.marca && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[var(--ofimundo-purple)] to-[var(--ofimundo-magenta)] text-white text-xs font-semibold rounded-full">
                {filtrosActivos.marca}
                <button onClick={() => onFiltroChange("marca", undefined)} className="hover:opacity-80">
                  <i className="fas fa-times text-[10px]"></i>
                </button>
              </span>
            )}
            {filtrosActivos.tecnologia && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[var(--ofimundo-purple)] to-[var(--ofimundo-magenta)] text-white text-xs font-semibold rounded-full">
                {filtrosActivos.tecnologia}
                <button onClick={() => onFiltroChange("tecnologia", undefined)} className="hover:opacity-80">
                  <i className="fas fa-times text-[10px]"></i>
                </button>
              </span>
            )}
            {filtrosActivos.color && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[var(--ofimundo-purple)] to-[var(--ofimundo-magenta)] text-white text-xs font-semibold rounded-full">
                {filtrosActivos.color}
                <button onClick={() => onFiltroChange("color", undefined)} className="hover:opacity-80">
                  <i className="fas fa-times text-[10px]"></i>
                </button>
              </span>
            )}
          </div>
        )}

        {/* Contenido de filtros */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* Tipo de Equipo */}
          <FilterSection
            title="Tipo de Equipo"
            isOpen={openSections.includes("tipo")}
            onToggle={() => toggleSection("tipo")}
          >
            {filtros.tipos.map((tipo) => (
              <FilterCheckbox
                key={tipo}
                label={tipo}
                checked={filtrosActivos.tipo === tipo}
                onChange={() =>
                  onFiltroChange("tipo", filtrosActivos.tipo === tipo ? undefined : tipo)
                }
              />
            ))}
          </FilterSection>

          {/* Marca */}
          <FilterSection
            title="Marca"
            isOpen={openSections.includes("marca")}
            onToggle={() => toggleSection("marca")}
          >
            {filtros.marcas.map((marca) => (
              <FilterCheckbox
                key={marca}
                label={marca}
                checked={filtrosActivos.marca === marca}
                onChange={() =>
                  onFiltroChange("marca", filtrosActivos.marca === marca ? undefined : marca)
                }
              />
            ))}
          </FilterSection>

          {/* Tecnología */}
          <FilterSection
            title="Tecnología"
            isOpen={openSections.includes("tecnologia")}
            onToggle={() => toggleSection("tecnologia")}
          >
            {filtros.tecnologias.map((tec) => (
              <FilterCheckbox
                key={tec}
                label={tec}
                checked={filtrosActivos.tecnologia === tec}
                onChange={() =>
                  onFiltroChange("tecnologia", filtrosActivos.tecnologia === tec ? undefined : tec)
                }
              />
            ))}
          </FilterSection>

          {/* Color */}
          <FilterSection
            title="Color"
            isOpen={openSections.includes("color")}
            onToggle={() => toggleSection("color")}
          >
            {filtros.colores.map((color) => (
              <FilterCheckbox
                key={color}
                label={color}
                checked={filtrosActivos.color === color}
                onChange={() =>
                  onFiltroChange("color", filtrosActivos.color === color ? undefined : color)
                }
              />
            ))}
          </FilterSection>
        </div>

        {/* Footer con botones */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex gap-3">
          <button
            onClick={onLimpiarFiltros}
            className="flex-1 py-3 border border-gray-200 bg-white text-gray-600 font-semibold rounded-lg hover:border-ofimundo-magenta hover:text-ofimundo-magenta transition"
          >
            Limpiar
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gradient-to-r from-[var(--ofimundo-purple)] to-[var(--ofimundo-magenta)] text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Aplicar
          </button>
        </div>
      </div>
    </aside>
  )
}

function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className={`filter-section border-b border-gray-100 ${isOpen ? "open" : ""}`}>
      <button
        onClick={onToggle}
        className="filter-section-header w-full text-left"
      >
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        <i className={`fas fa-chevron-down text-gray-400 text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}></i>
      </button>
      <div className={`overflow-hidden transition-all ${isOpen ? "max-h-[250px]" : "max-h-0"}`}>
        {children}
      </div>
    </div>
  )
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="filter-checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
      <span
        className={`w-[18px] h-[18px] border-2 rounded flex items-center justify-center transition ${
          checked
            ? "bg-gradient-to-r from-[var(--ofimundo-purple)] to-[var(--ofimundo-magenta)] border-[var(--ofimundo-purple)]"
            : "border-gray-300"
        }`}
      >
        {checked && <i className="fas fa-check text-white text-[10px]"></i>}
      </span>
      <span className="text-sm text-gray-600">{label}</span>
    </label>
  )
}
