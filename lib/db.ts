import sql from "mssql"

// Configuración de conexión SQL Server
const sqlConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER || "localhost",
  port: parseInt(process.env.DB_PORT || "1433"),
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: process.env.DB_ENCRYPT === "true", // true para Azure
    trustServerCertificate: process.env.DB_TRUST_CERT === "true", // true para desarrollo local
  },
}

// Pool de conexiones singleton
let pool: sql.ConnectionPool | null = null

export async function getConnection(): Promise<sql.ConnectionPool> {
  if (pool) {
    return pool
  }

  try {
    pool = await sql.connect(sqlConfig)
    console.log("Conexión a SQL Server establecida")
    return pool
  } catch (error) {
    console.error("Error conectando a SQL Server:", error)
    throw error
  }
}

export async function closeConnection(): Promise<void> {
  if (pool) {
    await pool.close()
    pool = null
    console.log("Conexión a SQL Server cerrada")
  }
}

// Helper para ejecutar queries
export async function executeQuery<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T[]> {
  const connection = await getConnection()
  const request = connection.request()

  // Agregar parámetros si existen
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      request.input(key, value)
    })
  }

  const result = await request.query(query)
  return result.recordset as T[]
}
