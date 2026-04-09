import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { ApiResponse } from "@/lib/types"

interface FiltrosDisponibles {
  tipos: string[]
  marcas: string[]
  tecnologias: string[]
  colores: string[]
}

export async function GET() {
  try {
    // Obtener tipos únicos
    const tiposQuery = `
      SELECT DISTINCT Tipo_Equipo as valor
      FROM Equipos
      WHERE Tipo_Equipo IS NOT NULL
      ORDER BY Tipo_Equipo
    `
    const tipos = await executeQuery<{ valor: string }>(tiposQuery)

    // Obtener marcas únicas
    const marcasQuery = `
      SELECT DISTINCT m.Nombre_Marca as valor
      FROM Equipos e
      INNER JOIN Marcas m ON e.ID_Marca = m.ID_Marca
      WHERE m.Activo = 1
      ORDER BY m.Nombre_Marca
    `
    const marcas = await executeQuery<{ valor: string }>(marcasQuery)

    // Obtener tecnologías únicas
    const tecnologiasQuery = `
      SELECT DISTINCT Tecnologia_Equipo as valor
      FROM Equipos
      WHERE Tecnologia_Equipo IS NOT NULL
      ORDER BY Tecnologia_Equipo
    `
    const tecnologias = await executeQuery<{ valor: string }>(tecnologiasQuery)

    // Obtener colores únicos
    const coloresQuery = `
      SELECT DISTINCT Color_Equipo as valor
      FROM Equipos
      WHERE Color_Equipo IS NOT NULL
      ORDER BY Color_Equipo
    `
    const colores = await executeQuery<{ valor: string }>(coloresQuery)

    const filtros: FiltrosDisponibles = {
      tipos: tipos.map(t => t.valor),
      marcas: marcas.map(m => m.valor),
      tecnologias: tecnologias.map(t => t.valor),
      colores: colores.map(c => c.valor),
    }

    const response: ApiResponse<FiltrosDisponibles> = {
      success: true,
      data: filtros,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error obteniendo filtros:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener filtros" },
      { status: 500 }
    )
  }
}
