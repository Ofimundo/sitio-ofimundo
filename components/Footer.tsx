import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-ofimundo-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/images/logo-ofimundo.png"
              alt="Ofimundo"
              width={180}
              height={40}
              className="mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Soluciones tecnológicas para empresas. Más de 30 años entregando 
              equipos de impresión, salas colaborativas y servicios de gestión 
              para optimizar tu negocio.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-gray-300 hover:text-white transition">
                  Catálogo
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.ofimundo.cl/servicios/mps.html" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition"
                >
                  Servicios MPS
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ofimundo.cl/contacto.html" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <i className="fas fa-phone text-ofimundo-magenta"></i>
                <span>+56 2 2345 6789</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope text-ofimundo-magenta"></i>
                <span>contacto@ofimundo.cl</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt text-ofimundo-magenta mt-1"></i>
                <span>Santiago, Chile</span>
              </li>
            </ul>

            {/* Redes sociales */}
            <div className="flex gap-4 mt-6">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-ofimundo-magenta transition"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-ofimundo-magenta transition"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-ofimundo-magenta transition"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ofimundo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
