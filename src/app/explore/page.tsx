'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Navbar';
import DetailDestination from '@/components/DetailDestination';
import AllDestination from '@/components/AllDestinations';
import Itinerary from '@/components/Itinerary';
import Footer from '@/components/Footer';

export interface Destination {
  Place: string;
  Picture: string;
  Location: string;
  'Tourism/Visitor Fee (approx in USD)': string;
}

const Explore: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [favorites, setFavorites] = useState<Destination[]>([]);
  const [query, setQuery] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();
  const place = searchParams.get('place');
  const showAll = searchParams.get('show');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    fetch('/dataset/destinationBali.json')
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setFilteredDestinations(data);
      })
      .catch((err) => {
        console.error('Failed to load destination data:', err);
      });

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    const updateFavorites = () => {
      const storedFavorites = localStorage.getItem('myList');
      if (storedFavorites) {
        const list = JSON.parse(storedFavorites);
        const favs = destinations.filter((dest) => list.includes(dest.Place));
        setFavorites(favs);
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

  // ✅ Only one version of handleSearch is declared
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
    <div className="min-h-screen bg-[#060c20] text-white overflow-x-hidden relative">
      <main className="flex-1 py-6 max-w-7xl mx-auto px-4 transition-all duration-500">
        <Header searchQuery={query} onSearchChange={handleSearch} />

        {showAll === 'all' ? (
          <AllDestination destinations={destinations} />
        ) : isSearching ? (
          <div className="mt-32 transition-all duration-500">
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
          </div>
        ) : (
          <>
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

            <div className="flex justify-between items-center mt-10 mb-6 transition-all duration-500">
              <h2 className="text-2xl font-semibold">Explore Destination</h2>
              <button
                onClick={() => router.push('/explore?show=all')}
                className="text-blue-300 hover:underline"
              >
                Show All →
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredDestinations.slice(8, 16).map((item) => (
                <DestinationCard key={item.Place} dest={item} onClick={handleCardClick} />
              ))}
            </div>
          </>
        )}
      </main>

      <Itinerary place={query || 'your destination'} />
      <Footer />
    </div>
  );
};

const DestinationCard: React.FC<{ dest: Destination; onClick: (place: string) => void }> = ({
  dest,
  onClick,
}) => (
  <div
    onClick={() => onClick(dest.Place)}
    className="cursor-pointer relative h-[250px] rounded-3xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500"
  >
    <img
      src={dest.Picture.replace('./public', '')}
      alt={dest.Place}
      className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    <div className="absolute bottom-5 left-5 text-white z-10">
      <p className="text-xl font-bold drop-shadow">{dest.Place}</p>
      <p className="text-sm text-gray-200">{dest.Location}</p>
    </div>
  </div>
);

export default Explore;
