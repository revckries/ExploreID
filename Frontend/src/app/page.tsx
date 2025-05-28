<<<<<<< HEAD
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
=======
"use client" 

import { useState } from "react"
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66
import HeroSection from "@/components/Home/HeroSection"
import HighlightsSection from "@/components/Home/HighlightsSection"
import FeatureGallery from "@/components/Home/FeatureGallery"
import StatsAndQuote from "@/components/Home/StatsAndQuote"
import ContactUsSection from "@/components/Home/ContactForm"
<<<<<<< HEAD
import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearchChangeAndNavigate = (query: string) => {
    setSearchQuery(query)
    router.push(`/explore?q=${encodeURIComponent(query)}`)
  }

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChangeAndNavigate} />

      <HeroSection />
      <HighlightsSection />
      <StatsAndQuote />
=======
import Footer from "@/components/Footer/Footer"
import Navbar from "@/components/Navbar/Navbar"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("") 

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <HeroSection />
      <HighlightsSection />
      <StatsAndQuote /> 
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66
      <FeatureGallery />
      <ContactUsSection />
      <Footer />
    </>
  )
}