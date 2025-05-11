"use client"

import type React from "react"
import { useState, type FormEvent } from "react"
import Image from "next/image"

// This function would be replaced with actual API integration
const submitContact = async (data: any) => {
  // In a real application, this would be an API call
  // Example:
  // const response = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return response.json();

  console.log("Form data submitted:", data)
  return { success: true }
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    company: "",
    interest: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      // Call the service function that would handle the API integration
      await submitContact(formData)
      setIsSubmitted(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        company: "",
        interest: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <section className="py-16 md:py-24 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/silas-baisch.webp" alt="Background" fill className="object-cover" />

        {/* Main Overlay - Same color as before but with opacity */}
        <div className="absolute inset-0 bg-[#060c20]/80"></div>

        {/* Top Gradient - Fades from solid color to transparent */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#060c20] to-transparent"></div>

        {/* Bottom Gradient - Fades from transparent to solid color */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060c20] to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Contact Us</h2>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-2xl font-semibold text-white mb-2">Thank you for getting in touch!</div>
              <p className="text-gray-300">We'll get back to you as soon as possible.</p>
              <button
                className="mt-6 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-colors"
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-white mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-white mb-2">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="">Select a country</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-white mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              <div>
                <label htmlFor="interest" className="block text-white mb-2">
                  Interested In
                </label>
                <input
                  type="text"
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-white text-[#060c20] px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Let's Connect with us!
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
