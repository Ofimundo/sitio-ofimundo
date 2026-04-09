"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const partners = [
  { name: "Brother", gray: "/images/marcas/brother-gris.svg", color: "/images/marcas/brother.svg", link: "https://www.brother.cl/" },
  { name: "Epson", gray: "/images/marcas/epson-gris.svg", color: "/images/marcas/epson.svg", link: "https://epson.cl/" },
  { name: "Kyocera", gray: "/images/marcas/kyocera-gris.svg", color: "/images/marcas/kyocera.svg", link: "https://www.kyoceradocumentsolutions.cl/" },
  { name: "Lexmark", gray: "/images/marcas/lexmark-gris.svg", color: "/images/marcas/lexmark.svg", link: "https://www.lexmark.com/es_xl.html" },
  { name: "Xerox", gray: "/images/marcas/xerox-gris.svg", color: "/images/marcas/xerox.svg", link: "https://www.xerox.com/es-cl" },
  { name: "Logitech", gray: "/images/marcas/logitech-gris.svg", color: "/images/marcas/logitech.svg", link: "https://www.logitech.com/es-roam" },
  { name: "Samsung", gray: "/images/marcas/samsung-gris.svg", color: "/images/marcas/samsung.svg", link: "https://www.samsung.com/cl/" },
  { name: "Hikvision", gray: "/images/marcas/hikvision-gris.svg", color: "/images/marcas/hikvision.svg", link: "https://www.hikvision.com/es-la/" },
  { name: "HP", gray: "/images/marcas/hp-gris.svg", color: "/images/marcas/hp.svg", link: "https://www.hp.com/cl-es/home.html" },
  { name: "Barco", gray: "/images/marcas/barco-gris.svg", color: "/images/marcas/barco.svg", link: "https://www.barco.com/es" },
  { name: "Poly", gray: "/images/marcas/poly-gris.svg", color: "/images/marcas/poly.svg", link: "https://www.hp.com/cl-es/solutions/poly.html" },
  { name: "Jabra", gray: "/images/marcas/jabra-gris.svg", color: "/images/marcas/jabra.svg", link: "https://www.jabra.com/es-es/" },
  { name: "Sennheiser", gray: "/images/marcas/senheisser-gris.svg", color: "/images/marcas/senheisser.svg", link: "https://cl.sennheiser-hearing.com/" },
  { name: "Lenovo", gray: "/images/marcas/lenovo-gris.svg", color: "/images/marcas/lenovo.svg", link: "https://www.lenovo.com/cl/es/" },
  { name: "Dell", gray: "/images/marcas/dell-gris.svg", color: "/images/marcas/dell.svg", link: "https://www.dell.com/es-cl/lp" },
  { name: "Asus", gray: "/images/marcas/asus-gris.svg", color: "/images/marcas/asus.svg", link: "https://www.asus.com/cl/" },
]

export function PartnersSection() {
  const swiperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initSwiper = async () => {
      const Swiper = (await import("swiper")).default
      const { Autoplay } = await import("swiper/modules")
      await import("swiper/css")

      if (swiperRef.current) {
        new Swiper(swiperRef.current, {
          modules: [Autoplay],
          slidesPerView: "auto",
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
        })
      }
    }

    initSwiper()
  }, [])

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-5xl text-gradient title-xl mb-2">Nuestros Partners</h2>
          <p className="text-xl text-gray-600">Trabajamos con las mejores marcas de tecnología.</p>
        </div>

        <div ref={swiperRef} className="swiper swiper-partners mt-5">
          <div className="swiper-wrapper">
            {partners.map((partner, index) => (
              <div key={index} className="swiper-slide w-[180px] flex justify-center items-center">
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-logo"
                >
                  <Image
                    src={partner.gray}
                    alt={partner.name}
                    width={150}
                    height={60}
                    className="logo logo-gray"
                  />
                  <Image
                    src={partner.color}
                    alt={partner.name}
                    width={150}
                    height={60}
                    className="logo logo-color"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
