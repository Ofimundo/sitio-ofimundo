import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ofimundo - Soluciones Tecnológicas para Empresas",
  description: "Encuentra equipos multifuncionales, impresoras, scanners y más. Soluciones de impresión y tecnología para tu empresa.",
  keywords: ["multifuncionales", "impresoras", "ofimundo", "MPS", "equipos de oficina"],
}

export const viewport: Viewport = {
  themeColor: "#2e2096",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
