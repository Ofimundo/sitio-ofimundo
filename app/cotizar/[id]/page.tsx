"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Equipo } from '@/lib/types'

export default function CotizarPage() {
  const params = useParams()
  const router = useRouter()
  const [equipo, setEquipo] = useState<Equipo | null>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Form state - Step 1
  const [cuotasMensuales, setCuotasMensuales] = useState(36)
  const [cantidadEquipos, setCantidadEquipos] = useState(1)
  const [volumenImpresion, setVolumenImpresion] = useState('2,000 a 3,000')
  const [cobertura, setCobertura] = useState('5% blanco y negro')
  const [direccionDespacho, setDireccionDespacho] = useState('')
  const [direccionesAdicionales, setDireccionesAdicionales] = useState<string[]>([])

  // Form state - Step 2
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')

  useEffect(() => {
    async function fetchEquipo() {
      try {
        const res = await fetch(`/api/equipos/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setEquipo(data)
        }
      } catch (error) {
        console.error('Error fetching equipo:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchEquipo()
    }
  }, [params.id])

  const handleAddDireccion = () => {
    setDireccionesAdicionales([...direccionesAdicionales, ''])
  }

  const handleDireccionChange = (index: number, value: string) => {
    const newDirecciones = [...direccionesAdicionales]
    newDirecciones[index] = value
    setDireccionesAdicionales(newDirecciones)
  }

  const handleRemoveDireccion = (index: number) => {
    setDireccionesAdicionales(direccionesAdicionales.filter((_, i) => i !== index))
  }

  const resetForm = () => {
    setCuotasMensuales(36)
    setCantidadEquipos(1)
    setVolumenImpresion('2,000 a 3,000')
    setCobertura('5% blanco y negro')
    setDireccionDespacho('')
    setDireccionesAdicionales([])
  }

  const nextStep = () => {
    if (step === 1) {
      setStep(2)
    }
  }

  const prevStep = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    
    // Aquí se enviaría la cotización a la base de datos o por email
    const cotizacionData = {
      equipo_id: params.id,
      equipo_nombre: equipo?.Nombre_Equipo,
      cuotas_mensuales: cuotasMensuales,
      cantidad_equipos: cantidadEquipos,
      volumen_impresion: volumenImpresion,
      cobertura: cobertura,
      direccion_despacho: direccionDespacho,
      direcciones_adicionales: direccionesAdicionales,
      nombre_completo: nombreCompleto,
      telefono: telefono,
      email: email,
      empresa: empresa,
      fecha_solicitud: new Date().toISOString()
    }

    // Simular envío (en producción se enviaría a un endpoint)
    console.log('Cotización enviada:', cotizacionData)
    
    // Simular delay de envío
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmitting(false)
    setSubmitted(true)
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ofimundo-purple"></div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!equipo) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Equipo no encontrado</h1>
            <p className="text-gray-600 mb-6">El equipo que buscas no existe o no está disponible.</p>
            <Link 
              href="/catalogo" 
              className="inline-flex items-center gap-2 bg-ofimundo-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-ofimundo-purple/90 transition"
            >
              Ver Catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Cotización Enviada</h1>
            <p className="text-lg text-gray-600 mb-8">
              Hemos recibido tu solicitud de cotización para <strong>{equipo.Nombre_Equipo}</strong>. 
              Un asesor se pondrá en contacto contigo pronto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/catalogo" 
                className="inline-flex items-center justify-center gap-2 border-2 border-ofimundo-purple text-ofimundo-purple px-6 py-3 rounded-lg font-semibold hover:bg-ofimundo-purple/5 transition"
              >
                Ver más equipos
              </Link>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-2 bg-ofimundo-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-ofimundo-purple/90 transition"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 font-bold bg-gradient-to-r from-ofimundo-purple to-ofimundo-magenta bg-clip-text text-transparent">
            Cotización de servicio de impresión
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Completa el formulario para recibir una cotización personalizada
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Form Section */}
          <div className="lg:col-span-3 space-y-8">
            {/* Product Selection */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 md:p-8 border-2 border-yellow-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {equipo.Imagen_Equipo ? (
                    <Image
                      src={equipo.Imagen_Equipo}
                      alt={equipo.Nombre_Equipo}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  ) : (
                    <svg className="w-10 h-10 text-ofimundo-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2"/>
                      <path d="M8 21h8M12 17v4" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-bold text-ofimundo-navy mb-2">
                    {equipo.Nombre_Equipo} + Arriendo + Servicio de Mantención
                  </h2>
                  <p className="text-sm text-gray-600">Producto seleccionado para cotización</p>
                  {equipo.Marca && (
                    <span className="inline-block mt-2 px-3 py-1 bg-white/80 rounded-full text-xs font-medium text-ofimundo-purple">
                      {equipo.Marca}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* PASO 1 */}
            {step === 1 && (
              <div id="step-1">
                <div className="bg-white rounded-2xl shadow-sm border-2 border-ofimundo-purple p-6 md:p-8 mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-ofimundo-purple to-ofimundo-magenta bg-clip-text text-transparent mb-6">
                    Solicitud de Servicios de Impresión
                  </h2>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Cuotas mensuales:
                        </label>
                        <select
                          value={cuotasMensuales}
                          onChange={(e) => setCuotasMensuales(Number(e.target.value))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-ofimundo-purple focus:border-ofimundo-purple transition"
                        >
                          <option value={12}>12 meses</option>
                          <option value={24}>24 meses</option>
                          <option value={36}>36 meses</option>
                          <option value={48}>48 meses</option>
                          <option value={60}>60 meses</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Cantidad de equipos:
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={cantidadEquipos}
                          onChange={(e) => setCantidadEquipos(Number(e.target.value))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-ofimundo-purple focus:border-ofimundo-purple transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Volumen de impresión mensual promedio:
                      </label>
                      <select
                        value={volumenImpresion}
                        onChange={(e) => setVolumenImpresion(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-ofimundo-purple focus:border-ofimundo-purple transition"
                      >
                        <option value="0 a 1,000">0 a 1,000 páginas</option>
                        <option value="1,000 a 2,000">1,000 a 2,000 páginas</option>
                        <option value="2,000 a 3,000">2,000 a 3,000 páginas</option>
                        <option value="3,000 a 5,000">3,000 a 5,000 páginas</option>
                        <option value="5,000 a 10,000">5,000 a 10,000 páginas</option>
                        <option value="10,000+">Más de 10,000 páginas</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Cobertura:
                      </label>
                      <select
                        value={cobertura}
                        onChange={(e) => setCobertura(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-ofimundo-purple focus:border-ofimundo-purple transition"
                      >
                        <option value="5% blanco y negro">5% blanco y negro</option>
                        <option value="10% blanco y negro">10% blanco y negro</option>
                        <option value="5% color">5% color</option>
                        <option value="10% color">10% color</option>
                        <option value="20% color">20% color</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Dirección de despacho equipo:
                      </label>
                      <textarea
                        rows={2}
                        value={direccionDespacho}
                        onChange={(e) => setDireccionDespacho(e.target.value)}
                        placeholder="Ingrese dirección completa"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-ofimundo-purple focus:border-ofimundo-purple transition resize-none"
                      />
                    </div>

                    {/* Direcciones adicionales */}
                    {direccionesAdicionales.map((direccion, index) => (
                      <div key={index} className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Dirección adicional {index + 2}:
                        </label>
                        <div className="flex gap-2">
                          <textarea
                            rows={2}
                            value={direccion}
                            onChange={(e) => handleDireccionChange(index, e.target.value)}
                            placeholder="Ingrese dirección completa"
                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-ofimundo-purple focus:border-ofimundo-purple transition resize-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveDireccion(index)}
                            className="px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddDireccion}
                      className="text-sm text-ofimundo-purple font-semibold hover:text-ofimundo-magenta flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      agregar otra dirección
                    </button>
                  </div>
                </div>

                {/* Botones Paso 1 */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 md:px-8 py-3 md:py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition"
                  >
                    Limpiar
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 md:px-12 py-3 md:py-4 bg-ofimundo-navy text-white rounded-lg font-semibold hover:opacity-90 transition shadow-lg"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {/* PASO 2 */}
            {step === 2 && (
              <div id="step-2">
                <div className="bg-white rounded-2xl shadow-sm border-2 border-ofimundo-purple p-6 md:p-8 mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-ofimundo-purple to-ofimundo-magenta bg-clip-text text-transparent mb-6">
                    Datos de contacto
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Nombre completo: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                        placeholder="Juan Pérez"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-ofimundo-purple focus:border-ofimundo-purple transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Teléfono: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="+56 9 1234 5678"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-ofimundo-purple focus:border-ofimundo-purple transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Email: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="juan.perez@empresa.cl"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-ofimundo-purple focus:border-ofimundo-purple transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Empresa: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        placeholder="Nombre de la empresa"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-ofimundo-purple focus:border-ofimundo-purple transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Botones Paso 2 */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 md:px-8 py-3 md:py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition"
                  >
                    Volver
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting || !nombreCompleto || !telefono || !email || !empresa}
                    className="px-8 md:px-12 py-3 md:py-4 bg-ofimundo-navy text-white rounded-lg font-semibold hover:opacity-90 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      'Enviar'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Info Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Configuration Info */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-ofimundo-purple">
              <h3 className="text-sm font-semibold text-ofimundo-purple mb-3 uppercase tracking-wide">
                Configuración de Características
              </h3>
              <p className="text-sm text-gray-700">
                Ajusta los parámetros según tus necesidades de impresión para recibir la mejor cotización
              </p>
            </div>

            {/* Quotation Process */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-ofimundo-purple p-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-ofimundo-purple to-ofimundo-magenta bg-clip-text text-transparent mb-6 text-center">
                Cotización
              </h3>

              <div className="space-y-6">
                <div className={`rounded-xl p-6 transition-all ${step === 1 ? 'bg-gradient-to-br from-ofimundo-purple to-ofimundo-magenta text-white' : 'border-2 border-gray-200 hover:border-ofimundo-magenta'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg ${step === 1 ? 'bg-white/20 text-white' : 'bg-ofimundo-purple text-white'}`}>
                      1
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold mb-2 ${step === 1 ? 'text-white' : 'text-ofimundo-navy'}`}>
                        Completa tu Solicitud
                      </h4>
                      <p className={`text-sm ${step === 1 ? 'text-white/90' : 'text-gray-700'}`}>
                        Ingresa la información y déjanos tus datos.
                        <br />
                        Te ayudaremos a encontrar la mejor solución para tu empresa.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`rounded-xl p-6 transition-all ${step === 2 ? 'bg-gradient-to-br from-ofimundo-purple to-ofimundo-magenta text-white' : 'border-2 border-gray-200 hover:border-ofimundo-magenta'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg ${step === 2 ? 'bg-white/20 text-white' : 'bg-ofimundo-magenta text-white'}`}>
                      2
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold mb-2 ${step === 2 ? 'text-white' : 'text-ofimundo-navy'}`}>
                        Recibe tu Cotización
                      </h4>
                      <p className={`text-sm ${step === 2 ? 'text-white/90' : 'text-gray-700'}`}>
                        Revisaremos tu solicitud.
                        <br />
                        Te enviaremos una propuesta a tu medida.
                        <br />
                        Un asesor te contactará para resolver tus dudas y acompañarte en el proceso.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment Summary */}
            {equipo && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-ofimundo-navy mb-4">Resumen del Equipo</h3>
                <div className="space-y-3 text-sm">
                  {equipo.Tipo_Equipo && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="font-medium">{equipo.Tipo_Equipo}</span>
                    </div>
                  )}
                  {equipo.Velocidad_BN && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Velocidad B/N:</span>
                      <span className="font-medium">{equipo.Velocidad_BN} ppm</span>
                    </div>
                  )}
                  {equipo.Velocidad_Color && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Velocidad Color:</span>
                      <span className="font-medium">{equipo.Velocidad_Color} ppm</span>
                    </div>
                  )}
                  {equipo.Resolucion_Impresion && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Resolución:</span>
                      <span className="font-medium">{equipo.Resolucion_Impresion}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
