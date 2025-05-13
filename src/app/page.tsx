"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import FeatureSection from "@/components/FeatureSection"
import StatSection from "@/components/StatSection"
import BlogTeaser from "@/components/BlogTeaser"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <Hero />

      <FeatureSection
        imageUrl="/images/andrey-bond.webp"
        title="🎑Discover Ancient Temples"
        description="Explore the rich cultural heritage of Bali through its ancient temples. Our guided tours take you through the historical landmarks that have stood the test of time."
        flip={false}
      />

      <FeatureSection
        imageUrl="/images/johan-mouchet.webp"
        title="🌾Experience Local Traditions"
        description="Immerse yourself in the vibrant local traditions of Java. From traditional dances to culinary delights, experience the authentic culture of the island."
        flip={true}
      />

      <StatSection />

      <BlogTeaser />

      <ContactForm />

      <Footer />
    </>
  )
}
