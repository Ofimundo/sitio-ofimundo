import { NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Equipo, ApiResponse } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Obtener parámetros de filtro
    const tipo = searchParams.get("tipo")
    const marca = searchParams.get("marca")
    const tecnologia = searchParams.get("tecnologia")
    const color = searchParams.get("color")
    const search = searchParams.get("search")
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")

    // Construir query con filtros dinámicos
    let query = `
      SELECT 
        e.*,
        m.Nombre_Marca,
        m.Sitio_Web as Sitio_Web_Marca
      FROM Equipos e
      LEFT JOIN Marcas m ON e.ID_Marca = m.ID_Marca
      WHERE 1=1
    `
    const params: Record<string, unknown> = {}

    if (tipo) {
      query += " AND e.Tipo_Equipo = @tipo"
      params.tipo = tipo
    }

    if (marca) {
      query += " AND m.Nombre_Marca = @marca"
      params.marca = marca
    }

    if (tecnologia) {
      query += " AND e.Tecnologia_Equipo = @tecnologia"
      params.tecnologia = tecnologia
    }

    if (color) {
      query += " AND e.Color_Equipo = @color"
      params.color = color
    }

    if (search) {
      query += " AND (e.Nombre_Equipo LIKE @search OR e.Descripcion_Equipo LIKE @search)"
      params.search = `%${search}%`
    }

    // Agregar paginación
    query += ` ORDER BY e.Fecha_Registro_Equipo DESC
               OFFSET @offset ROWS
               FETCH NEXT @limit ROWS ONLY`
    params.offset = offset
    params.limit = limit

    const equipos = await executeQuery<Equipo>(query, params)

    // Obtener total de registros
    let countQuery = `
      SELECT COUNT(*) as total
      FROM Equipos e
      LEFT JOIN Marcas m ON e.ID_Marca = m.ID_Marca
      WHERE 1=1
    `
    
    if (tipo) countQuery += " AND e.Tipo_Equipo = @tipo"
    if (marca) countQuery += " AND m.Nombre_Marca = @marca"
    if (tecnologia) countQuery += " AND e.Tecnologia_Equipo = @tecnologia"
    if (color) countQuery += " AND e.Color_Equipo = @color"
    if (search) countQuery += " AND (e.Nombre_Equipo LIKE @search OR e.Descripcion_Equipo LIKE @search)"

    const countResult = await executeQuery<{ total: number }>(countQuery, params)
    const total = countResult[0]?.total || 0

    const response: ApiResponse<Equipo[]> = {
      success: true,
      data: equipos,
      total,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error obteniendo equipos:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener equipos" },
      { status: 500 }
    )
  }
}
