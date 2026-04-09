"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function HeroSection() {
  const swiperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Inicializar Swiper solo en el cliente
    const initSwiper = async () => {
      const Swiper = (await import("swiper")).default
      const { Autoplay, Pagination } = await import("swiper/modules")
      await import("swiper/css")
      await import("swiper/css/pagination")

      if (swiperRef.current) {
        new Swiper(swiperRef.current, {
          modules: [Autoplay, Pagination],
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        })
      }
    }

    initSwiper()
  }, [])

  const banners = [
    {
      image: "/images/banners/01-banner-of.jpg",
      title: "Diseñados para potenciar tu crecimiento",
      subtitle: "Soluciones tecnológicas para empresas",
    },
    {
      image: "/images/banners/02-banner-of.png",
      title: "Diseñados para potenciar tu crecimiento",
      subtitle: "Soluciones tecnológicas para empresas",
    },
    {
      image: "/images/banners/03-banner-of.jpg",
      title: "Diseñados para potenciar tu crecimiento",
      subtitle: "Soluciones tecnológicas para empresas",
    },
  ]

  return (
    <section className="hero-gradient pt-24 pb-12 px-4 min-h-[70vh]">
      {/* Banner Swiper */}
      <div className="w-full flex justify-center px-4 mb-12">
        <div
          ref={swiperRef}
          className="swiper w-full max-w-[1200px] aspect-[16/5] overflow-hidden rounded-[20px] relative"
        >
          <div className="swiper-wrapper">
            {banners.map((banner, index) => (
              <div key={index} className="swiper-slide relative">
                <Image
                  src={banner.image}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
                  <p className="text-2xl mb-2">{banner.subtitle}</p>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">{banner.title}</h1>
                  <a
                    href="/catalogo"
                    className="btn-account bg-gradient-to-br from-[var(--ofimundo-purple)] to-[var(--ofimundo-magenta)] text-white rounded-lg text-sm font-semibold px-6 py-3 hover:from-[#241a78] hover:to-[#c62842] transition"
                  >
                    {"Conoce la Solución →"}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>

      {/* Título principal */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="title-xl text-5xl text-gradient leading-snug mb-4">
          Encuentra el producto ideal para tu Empresa
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Cuéntanos lo que necesitas y te recomendaremos las mejores opciones
        </p>
      </div>
    </section>
  )
}
