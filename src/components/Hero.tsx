"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Borobudur Temple",
    description: "Ancient Buddhist temple with stunning sunrise views",
    imageUrl: "/images/zulkifli-ghazali.webp",
  },
  {
    id: 2,
    name: "Prambanan Temple",
    description: "Magnificent Hindu temple complex with intricate carvings",
    imageUrl: "/images/wendy-winarno.webp",
  },
  {
    id: 3,
    name: "Mount Bromo",
    description: "Active volcano with breathtaking landscape views",
    imageUrl: "/images/kilarov.webp",
  },
  {
    id: 4,
    name: "Komodo National Island",
    description: "Experience the rare indonesian komodo dragons",
    imageUrl: "/images/vivien-placzek.webp",
  },
]

export default function Hero() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Handle vertical wheel scroll as horizontal scroll
  const handleWheel = (e: WheelEvent) => {
    if (!scrollContainerRef.current) return
    if (!e.shiftKey) {
      e.preventDefault()
      scrollContainerRef.current.scrollLeft += e.deltaY
    }
  }

useEffect(() => {
  const scrollContainer = scrollContainerRef.current
  if (!scrollContainer) return

  scrollContainer.addEventListener("wheel", handleWheel, { passive: false })

  let isDragging = false
  let startX = 0
  let scrollLeft = 0
  let velocity = 0
  let lastX = 0
  let lastTime = 0
  let momentumId: number

  const onMouseDown = (e: MouseEvent) => {
    isDragging = true
    scrollContainer.classList.add("cursor-grabbing")
    startX = e.pageX
    scrollLeft = scrollContainer.scrollLeft
    velocity = 0
    lastX = e.pageX
    lastTime = performance.now()
    cancelAnimationFrame(momentumId)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX
    const dx = x - startX
    scrollContainer.scrollLeft = scrollLeft - dx

    const now = performance.now()
    const deltaT = now - lastTime
    if (deltaT > 0) {
      velocity = (x - lastX) / deltaT // px/ms
      lastX = x
      lastTime = now
    }
  }

  const onMouseUp = () => {
    isDragging = false
    scrollContainer.classList.remove("cursor-grabbing")
    momentumScroll()
  }

  const onMouseLeave = () => {
    if (isDragging) {
      isDragging = false
      scrollContainer.classList.remove("cursor-grabbing")
      momentumScroll()
    }
  }

  const momentumScroll = () => {
    let currentVelocity = velocity * 1000 // convert to px/sec
    const decay = 0.95

    const animate = () => {
      if (Math.abs(currentVelocity) < 0.5) return
      scrollContainer.scrollLeft -= currentVelocity * (1 / 60) // frame time
      currentVelocity *= decay
      momentumId = requestAnimationFrame(animate)
    }

    momentumId = requestAnimationFrame(animate)
  }

  scrollContainer.addEventListener("mousedown", onMouseDown)
  scrollContainer.addEventListener("mousemove", onMouseMove)
  scrollContainer.addEventListener("mouseup", onMouseUp)
  scrollContainer.addEventListener("mouseleave", onMouseLeave)

  return () => {
    scrollContainer.removeEventListener("wheel", handleWheel)
    scrollContainer.removeEventListener("mousedown", onMouseDown)
    scrollContainer.removeEventListener("mousemove", onMouseMove)
    scrollContainer.removeEventListener("mouseup", onMouseUp)
    scrollContainer.removeEventListener("mouseleave", onMouseLeave)
    cancelAnimationFrame(momentumId)
  }
}, [])


  return (
    <section className="relative h-screen select-none">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/nindy-rahmadani.webp"
          alt="Java landscape"
          fill
          priority
          className="object-cover select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#060c20]"></div>
      </div>

      <div className="container mx-auto px-4 relative h-full">
        <div className="flex flex-col md:flex-row h-full items-center pt-20">
          {/* Left Content */}
          <div className="w-full md:w-1/2 text-white z-10 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Explore Indonesia</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">Our Top Destinations</p>
            <Link
              href="#"
              className="inline-flex items-center bg-white text-[#060c20] px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Start Travelling
            </Link>
          </div>

          {/* Right Carousel */}
          <div
            ref={scrollContainerRef}
            className="w-full md:w-1/2 z-10 overflow-x-auto pb-4 cursor-grab select-none"
          >
            <div className="flex space-x-4">
              {destinations.map((destination) => (
                <div key={destination.id} className="min-w-[280px] flex-shrink-0">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden h-full select-none">
                    <div className="relative h-48 select-none">
                      <Image
                        src={destination.imageUrl || "/placeholder.svg"}
                        alt={destination.name}
                        fill
                        className="object-cover select-none pointer-events-none"
                      />
                    </div>
                    <div className="p-4 relative">
                      <h3 className="text-white text-xl font-semibold mb-2">{destination.name}</h3>
                      <p className="text-gray-300 mb-8">{destination.description}</p>
                      <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                        <ArrowRight className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
