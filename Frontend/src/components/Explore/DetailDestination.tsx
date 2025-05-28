'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddToList from '@/components/Explore/AddToList';
<<<<<<< HEAD
import { MapPin, Star, DollarSign, Users, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
=======
import { MapPin, Star, DollarSign, Users, X } from 'lucide-react'; // Tambah X icon
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'; // Tambah AnimatePresence
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66

interface Destination {
  Place: string;
  Picture: string;
  Location: string;
  Coordinate: string;
  'Google Maps Rating': number;
  'Google Reviews (Count)': number;
  Source: string;
  Description: string;
  'Tourism/Visitor Fee (approx in USD)': string;
}

interface Review {
  review: string;
  rating: number;
}

interface DestinationReview {
  place: string;
  reviews: Review[];
}

interface Hotel {
  Name: string;
  Picture: string;
  Category: string;
  Rating: number;
  Address: string;
  Contact: string;
  Price: string;
  Amenities: string;
}

interface DetailDestinationProps {
  place: string;
  destinations: Destination[];
}

const contentVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

<<<<<<< HEAD
=======
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66
const imageSlideVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const textSlideVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContentVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 25 } },
  exit: { scale: 0.8, opacity: 0 },
};

const DetailDestination: React.FC<DetailDestinationProps> = ({ place, destinations }) => {
  const router = useRouter();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
<<<<<<< HEAD
  const [showImageModal, setShowImageModal] = useState(false);
=======
  const [showImageModal, setShowImageModal] = useState(false); // State baru untuk modal
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66

  useEffect(() => {
    if (place) {
      const matched = destinations.find((item) => item.Place === place);
      setDestination(matched || null);
    }
  }, [place, destinations]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/dataset/destinationReview.json');
        const data: DestinationReview[] = await res.json();
        const matched = data.find((item) => item.place === place);
        if (matched) {
          setReviews(matched.reviews);
          const avg =
            matched.reviews.reduce((acc, cur) => acc + cur.rating, 0) / matched.reviews.length;
          setAverageRating(parseFloat(avg.toFixed(2)));
        } else {
          setReviews([]);
          setAverageRating(null);
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
        setReviews([]);
        setAverageRating(null);
      }
    };

    const fetchHotels = async () => {
      if (!destination) return;

      try {
        const res = await fetch('/dataset/hotelsBali.json');
        const allHotels: Hotel[] = await res.json();

        const destinationLocationKeywords = destination.Location.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

        let nearbyHotels = allHotels.filter(hotel => {
          if (!hotel.Address) return false;
          const hotelAddressLower = hotel.Address.toLowerCase();
          return destinationLocationKeywords.some(keyword => hotelAddressLower.includes(keyword));
        });

        if (nearbyHotels.length === 0) {
          console.warn(`No specific hotels found for ${destination.Place} based on location. Displaying top-rated hotels as fallback.`);
          nearbyHotels = allHotels.sort((a, b) => (b.Rating || 0) - (a.Rating || 0)).slice(0, 8);
        } else {
          nearbyHotels = nearbyHotels.slice(0, 8);
        }

        setHotels(nearbyHotels);
      } catch (error) {
        console.error('Error loading hotels:', error);
        setHotels([]);
      }
    };

    fetchReviews();
    if (destination) {
      fetchHotels();
    }
  }, [place, destination]);

  useEffect(() => {
    if (showImageModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showImageModal]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-[#060c20] text-white flex items-center justify-center">
        <p className="text-blue-300 text-lg">Loading or destination not found...</p>
      </div>
    );
  }

<<<<<<< HEAD
  const getGoogleMapsUrl = (source: string) => {
    return source || '#';
=======
  const getGoogleMapsUrl = (coordinate: string) => {
    const [lat, lng] = coordinate.split(',').map(Number);
    if (!isNaN(lat) && !isNaN(lng)) {
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }
    return '#';
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66
  };

  let imageUrl = (destination?.Picture || '/placeholder.jpg').toString();
  if (imageUrl.startsWith('./public')) {
    imageUrl = imageUrl.replace('./public', '/');
  }
  imageUrl = imageUrl.replace(/^\/\//, '/');

  const imageAlt = destination?.Place?.toString() || 'Destination image';

  return (
    <div className="min-h-screen bg-[#060c20] text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <button
          onClick={() => router.back()}
          className="mb-6 text-sm text-blue-400 hover:underline transition"
        >
          ← Back to Explore
        </button>

        <motion.div
<<<<<<< HEAD
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16"
=======
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16"
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
<<<<<<< HEAD
=======
          {/* Gambar Destinasi di Kiri */}
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66
          <motion.div
            className="rounded-2xl overflow-hidden shadow-lg md:order-1"
            variants={imageSlideVariants}
          >
            <div className="relative w-full h-80 md:h-[400px] cursor-pointer" onClick={() => setShowImageModal(true)}>
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                onError={(e) => { e.currentTarget.src = '/placeholder-image.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 z-10">
                <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-md mb-1 text-white">
                  {destination.Place}
                </h1>
                <p className="text-md text-blue-200">{destination.Location}</p>
              </div>
            </div>
          </motion.div>

<<<<<<< HEAD
=======
          {/* Deskripsi & Detail di Kanan */}
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66
          <motion.div
            className="bg-[#0e253b] border border-[#1e3b57] p-6 md:p-8 rounded-2xl shadow-xl flex flex-col h-full md:order-2"
            variants={textSlideVariants}
          >
            <h2 className="text-2xl font-semibold text-blue-300 mb-6">About this Destination</h2>

            <p className="text-blue-100 leading-relaxed text-md mb-6">
              Welcome to <span className="font-semibold text-white">{destination.Place}</span>, located in{' '}
              <span className="text-white">{destination.Location}</span>. {destination.Description || 'This destination offers unique attractions and breathtaking views that make it a must-visit spot in Bali.'}
            </p>

<<<<<<< HEAD
            {/* Perbaikan untuk Meratakan Titik Dua */}
            <div className="grid grid-cols-[min-content_1fr] gap-x-4 gap-y-3 mb-6 text-blue-100">
              <div className="flex items-start">
                <DollarSign size={20} className="text-blue-400 mr-3 flex-shrink-0" />
                <span className="font-semibold text-white whitespace-nowrap">Visitor Fee:</span>
              </div>
              <span className="text-blue-400 font-medium">
                {destination['Tourism/Visitor Fee (approx in USD)'] || 'N/A'}
              </span>

              <a
                href={getGoogleMapsUrl(destination.Source)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start text-blue-100 hover:text-blue-300 transition group"
              >
                <MapPin size={20} className="text-blue-400 mr-3 flex-shrink-0 group-hover:text-blue-300" />
                <span className="font-semibold text-white whitespace-nowrap">Location:</span>
              </a>
              <a
                href={getGoogleMapsUrl(destination.Source)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-blue-300 transition"
              >
                <span className="ml-0 hover:underline">{destination.Location}</span>
                <span className="ml-2 text-xs text-gray-400 group-hover:text-blue-300">(View on Map)</span>
              </a>

              <div className="flex items-center">
                <Star size={20} className="text-yellow-400 mr-3 flex-shrink-0" />
                <span className="font-semibold text-white whitespace-nowrap">Google Rating:</span>
              </div>
              <span className="text-yellow-400 font-medium">
                {destination['Google Maps Rating'] ? `${destination['Google Maps Rating']} / 5` : 'N/A'}
              </span>

              <div className="flex items-center">
                <Users size={20} className="text-green-400 mr-3 flex-shrink-0" />
                <span className="font-semibold text-white whitespace-nowrap">Reviews Count:</span>
              </div>
              <span className="text-green-300 font-medium">
                {destination['Google Reviews (Count)'] || 0} Reviews
              </span>
=======
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-blue-100">
                <DollarSign size={20} className="text-blue-400 mr-3 flex-shrink-0" />
                <span className="font-semibold text-white">Visitor Fee:</span>
                <span className="ml-2 text-blue-400 font-medium">
                  {destination['Tourism/Visitor Fee (approx in USD)'] || 'N/A'}
                </span>
              </div>
              <a
                href={getGoogleMapsUrl(destination.Coordinate)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-100 hover:text-blue-300 transition group"
              >
                <MapPin size={20} className="text-blue-400 mr-3 flex-shrink-0 group-hover:text-blue-300" />
                <span className="font-semibold text-white">Location:</span>
                <span className="ml-2 hover:underline">{destination.Location}</span>
                <span className="ml-auto text-xs text-gray-400 group-hover:text-blue-300">(View on Map)</span>
              </a>
              <div className="flex items-center text-blue-100">
                <Star size={20} className="text-yellow-400 mr-3 flex-shrink-0" />
                <span className="font-semibold text-white">Google Rating:</span>
                <span className="ml-2 text-yellow-400 font-medium">{destination['Google Maps Rating'] ? `${destination['Google Maps Rating']} / 5` : 'N/A'}</span>
              </div>
              <div className="flex items-center text-blue-100">
                <Users size={20} className="text-green-400 mr-3 flex-shrink-0" />
                <span className="font-semibold text-white">Reviews Count:</span>
                <span className="ml-2 text-green-300 font-medium">{destination['Google Reviews (Count)'] || 0} Reviews</span>
              </div>
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66
            </div>

            <div className="mt-auto pt-6 border-t border-[#1e3b57]">
              <AddToList place={destination.Place} />
            </div>
          </motion.div>
        </motion.div>

        {reviews.length > 0 && (
          <div className="mt-12 md:mt-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-semibold text-blue-300">Visitor Reviews</h2>
              {averageRating !== null && (
                <span className="text-yellow-400 text-base font-medium">⭐ {averageRating} / 5</span>
              )}
            </div>
            <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
              {reviews.map((r, index) => (
                <div
                  key={index}
                  className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-[#102d46] border border-[#1e3b57] rounded-xl p-5 snap-center shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-400 font-bold mr-2">{r.rating.toFixed(1)}</span>
                      <span className="text-sm text-blue-200">/ 5</span>
                    </div>
                    <p className="text-blue-100 text-sm leading-relaxed">{r.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hotels.length > 0 && (
          <div className="mt-12 md:mt-16 mb-12 md:mb-16">
            <h2 className="text-2xl font-semibold text-blue-300 mb-6">Recommended Hotels Nearby</h2>
            <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
              {hotels.map((hotel, index) => (
                <div
                  key={index}
                  className="min-w-[260px] max-w-[260px] h-[360px] flex-shrink-0 flex flex-col bg-[#102d46] border border-[#1e3b57] rounded-xl p-5 snap-center shadow-md"
                >
                  <img
                    src={hotel.Picture.replace('./public', '')}
                    alt={hotel.Name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">{hotel.Name}</h3>
                  <p className="text-blue-200 text-sm mb-1">{hotel.Category}</p>
                  <p className="text-yellow-400 text-sm font-medium mb-2">⭐ {hotel.Rating} / 5</p>

                  <p className="text-blue-400 text-sm mt-auto">{hotel.Price ? hotel.Price.replace('Â', '') : 'Price not available'}</p>
                  <p className="text-blue-100 text-xs mt-1 leading-tight line-clamp-2">{hotel.Amenities}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showImageModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[9999]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full h-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center"
              variants={modalContentVariants}
<<<<<<< HEAD
              onClick={(e) => e.stopPropagation()}
=======
              onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutupnya
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
<<<<<<< HEAD
                className="object-contain"
=======
                className="object-contain" // object-contain agar gambar tidak terpotong
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66
              />
              <button
                className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition"
                onClick={() => setShowImageModal(false)}
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DetailDestination;