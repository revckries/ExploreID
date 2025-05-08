"use client"

import type { Slider } from "@/components/ui/slider"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Borobudur Temple",
    description: "Ancient Buddhist temple with stunning sunrise views",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "Prambanan Temple",
    description: "Magnificent Hindu temple complex with intricate carvings",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    name: "Mount Bromo",
    description: "Active volcano with breathtaking landscape views",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    name: "Yogyakarta Palace",
    description: "Cultural center with traditional Javanese architecture",
    imageUrl: "https://via.placeholder.com/300x200",
  },
]

export default function Hero() {
  const sliderRef = useRef<Slider>(null)

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.2,
        },
      },
    ],
  }

  return (
    <section className="relative h-screen">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://via.placeholder.com/1920x1080"
          alt="Java landscape"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#060c20]"></div>
      </div>

      <div className="container mx-auto px-4 relative h-full">
        <div className="flex flex-col md:flex-row h-full items-center pt-20">
          {/* Left Content */}
          <div className="w-full md:w-1/2 text-white z-10 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Java's Cultural Wonders</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">Our Top Destinations</p>
            <Link
              href="#"
              className="inline-flex items-center bg-white text-[#060c20] px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Start Travelling
            </Link>
          </div>

          {/* Right Carousel */}
          <div className="w-full md:w-1/2 z-10 overflow-x-auto pb-4">
            <div className="flex space-x-4">
              {destinations.map((destination) => (
                <div key={destination.id} className="min-w-[280px] flex-shrink-0">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden h-full">
                    <div className="relative h-48">
                      <Image
                        src={destination.imageUrl || "/placeholder.svg"}
                        alt={destination.name}
                        fill
                        className="object-cover"
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
