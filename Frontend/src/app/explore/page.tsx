'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Navbar/Navbar';
import DetailDestination from '@/components/Explore/DetailDestination';
import AllDestination from '@/components/Explore/AllDestinations';
import Itinerary from '@/components/Explore/Itinerary';
import Footer from '@/components/Footer/Footer';
import { motion } from 'framer-motion';

export interface Destination {
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

const fadeInAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const Explore: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [favorites, setFavorites] = useState<Destination[]>([]);
  const [topRecommendations, setTopRecommendations] = useState<Destination[]>([]);
  const [query, setQuery] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();
  const place = searchParams.get('place');
  const showAll = searchParams.get('show');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const fetchAllData = async () => {
      try {
        const [destRes, reviewRes] = await Promise.all([
          fetch('/dataset/destinationBali.json'),
          fetch('/dataset/destinationReview.json')
        ]);

        if (!destRes.ok) throw new Error(`HTTP error! status: ${destRes.status}`);
        if (!reviewRes.ok) throw new Error(`HTTP error! status: ${reviewRes.status}`);

        const destData: Destination[] = await destRes.json();
        const reviewData: DestinationReview[] = await reviewRes.json();

        setDestinations(destData);
        setFilteredDestinations(destData);

        const placeRatings: { [key: string]: { total: number; count: number } } = {};
        reviewData.forEach(dr => {
          if (dr.reviews && dr.reviews.length > 0) {
            const totalRating = dr.reviews.reduce((sum, r) => sum + r.rating, 0);
            placeRatings[dr.place] = {
              total: totalRating,
              count: dr.reviews.length
            };
          }
        });

        const sortedRecommendations = [...destData].sort((a, b) => {
          const ratingA = placeRatings[a.Place] ? placeRatings[a.Place].total / placeRatings[a.Place].count : 0;
          const ratingB = placeRatings[b.Place] ? placeRatings[b.Place].total / placeRatings[b.Place].count : 0;
          return ratingB - ratingA;
        });
        
        setTopRecommendations(sortedRecommendations.slice(0, 8));

      } catch (err) {
        console.error('Failed to load data:', err);
      }
    };

    fetchAllData();

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    const updateFavorites = () => {
      const storedFavorites = localStorage.getItem('myList');
      if (storedFavorites) {
        try {
          const list = JSON.parse(storedFavorites);
          if (Array.isArray(list)) {
            const favs = destinations.filter((dest) => list.includes(dest.Place));
            setFavorites(favs);
          } else {
            console.warn("localStorage 'myList' is not an array, resetting favorites.");
            setFavorites([]);
          }
        } catch (e) {
          console.error("Failed to parse 'myList' from localStorage:", e);
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    };

    updateFavorites();
    window.addEventListener('myListUpdated', updateFavorites);
    return () => {
      window.removeEventListener('myListUpdated', updateFavorites);
    };
  }, [destinations]);

  const handleCardClick = (place: string) => {
    router.push(`/explore?place=${encodeURIComponent(place)}`);
  };

  const handleSearch = (query: string) => {
    setQuery(query);
    const filtered = destinations.filter((destination) =>
      destination.Place.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  if (place && destinations.length > 0) {
    return <DetailDestination place={place} destinations={destinations} />;
  }

  const isSearching = query && query.trim() !== '';

  return (
    <motion.div
      className="min-h-screen bg-[#060c20] text-white overflow-x-hidden relative"
      {...fadeInAnimation}
    >
      <main className="flex-1 py-6 max-w-7xl mx-auto px-4 transition-all duration-500">
        <Header searchQuery={query} onSearchChange={handleSearch} />

        {showAll === 'all' ? (
          <motion.div {...fadeInAnimation}>
            <AllDestination destinations={destinations} />
          </motion.div>
        ) : isSearching ? (
          <motion.div className="mt-32 transition-all duration-500" {...fadeInAnimation}>
            <h2 className="text-2xl font-semibold mb-4">
              {query ? `Search Results for "${query}"` : 'Explore Destination'}
            </h2>
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredDestinations.map((dest) => (
                  <DestinationCard key={dest.Place} dest={dest} onClick={handleCardClick} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No results found for "{query}".</p>
            )}
          </motion.div>
        ) : (
          <motion.div {...fadeInAnimation}>
            <div className="mt-32 mb-6 transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Favorite Destination</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {favorites.length > 0 ? (
                  favorites.map((dest) => (
                    <DestinationCard key={dest.Place} dest={dest} onClick={handleCardClick} />
                  ))
                ) : (
                  <div className="col-span-4 text-center text-white transition-all duration-500">
                    <p className="text-xl">Oops! Your favorite destinations are empty.</p>
                    <p className="text-gray-400 mt-2">
                      Start exploring and add your favorite destinations to this list!
                    </p>
                    <p className="mt-4 text-blue-300 font-bold">Get started now!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Top Recommendations Section with Show All Button */}
            {topRecommendations.length > 0 && (
              <div className="mt-10 mb-6 transition-all duration-500">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Top Recommendations</h2>
                  <button
                    onClick={() => router.push('/explore?show=all')}
                    className="text-blue-300 hover:underline"
                  >
                    Show All →
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {topRecommendations.map((dest) => (
                    <DestinationCard key={dest.Place} dest={dest} onClick={handleCardClick} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>

      <Itinerary place={query || 'your destination'} />
      <Footer />
    </motion.div>
  );
};

const cardVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

const DestinationCard: React.FC<{ dest: Destination; onClick: (place: string) => void }> = ({
  dest,
  onClick,
}) => (
  <motion.div
    variants={cardVariants}
    initial="initial"
    animate="animate"
    whileHover="hover"
    onClick={() => onClick(dest.Place)}
    className="cursor-pointer relative h-[250px] rounded-3xl overflow-hidden shadow-xl"
  >
    <motion.img
      src={dest.Picture.replace('./public', '')}
      alt={dest.Place}
      className="w-full h-full object-cover"
      transition={{ duration: 0.3 }}
      style={{ scale: 1.0 }}
      whileHover={{ scale: 1.1 }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    <div className="absolute bottom-5 left-5 text-white z-10">
      <p className="text-xl font-bold drop-shadow">{dest.Place}</p>
      <p className="text-sm text-gray-200">{dest.Location}</p>
    </div>
  </motion.div>
);

export default Explore;