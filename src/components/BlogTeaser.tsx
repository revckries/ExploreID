import Image from "next/image"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Hidden Gems in Java",
    author: "Mark Ronson",
    date: "02 May, 2023",
    imageUrl: "/images/lina-bob.webp",
  },
  {
    id: 2,
    title: "A Culinary Journey Through Java",
    author: "Mark Ronson",
    date: "15 May, 2023",
    imageUrl: "/images/sebastian-staines.webp",
  },
  {
    id: 3,
    title: "The Art of Batik: Java's Cultural Heritage",
    author: "Mark Ronson",
    date: "28 May, 2023",
    imageUrl: "/images/roman-bintangh.webp",
  },
]

export default function BlogTeaser() {
  return (
    <section className="py-16 md:py-24 bg-[#060c20]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Travel Blog Created For You</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
              <div className="relative h-48">
                <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                <div className="flex items-center text-gray-400 mb-4">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
                <Link href="#" className="text-white hover:text-gray-300 font-medium inline-flex items-center">
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#"
            className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  )
}
