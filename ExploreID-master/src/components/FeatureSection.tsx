import Image from "next/image"

interface FeatureSectionProps {
  imageUrl: string
  title: string
  description: string
  flip?: boolean
}

export default function FeatureSection({ imageUrl, title, description, flip = false }: FeatureSectionProps) {
  return (
    <section className="relative py-16 md:py-24 bg-[#060c20]">
      {/* Gradient overlay - opacity increases downward */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060c20]/80 to-[#060c20] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col ${flip ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12`}>
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-gray-300 text-lg">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
