export default function StatSection() {
  const stats = [
    { value: "100+", label: "Destinations" },
    { value: "43,000+", label: "Happy Travelers" },
    { value: "30+", label: "Years in Business" },
  ]

  return (
    <section className="py-16 md:py-24 bg-[#060c20]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="w-full sm:w-[calc(33.333%-2rem)] md:w-[calc(33.333%-3rem)] bg-white/5 backdrop-blur-sm rounded-lg p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
