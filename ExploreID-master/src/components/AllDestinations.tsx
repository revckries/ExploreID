import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Navbar';

export interface Destination {
  Place: string;
  Picture: string;
  Location: string;
  'Tourism/Visitor Fee (approx in USD)': string;
}

interface AllDestinationsProps {
  destinations: Destination[];
}

const AllDestinations: React.FC<AllDestinationsProps> = ({ destinations }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(destinations);

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

  return (
    <div className="min-h-screen bg-[#060c20] text-white overflow-x-hidden max-w-7xl mx-auto">
      <Header searchQuery={query} onSearchChange={handleSearch} />

      {/* Display "All Destinations" or "Search Results" */}
      <h2 className="text-2xl font-semibold mb-10 text-center mt-32">
        {query ? `Search Results for "${query}"` : 'All Destinations in Bali'}
      </h2>

      {/* Destination Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredDestinations.map((item) => (
          <div
            key={item.Place}
            onClick={() => handleCardClick(item.Place)}
            className="cursor-pointer relative h-[250px] rounded-3xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500"
          >
            <img
              src={item.Picture.replace('./public', '')}
              alt={item.Place}
              className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 text-white z-10">
              <p className="text-xl font-bold drop-shadow">{item.Place}</p>
              <p className="text-sm text-gray-200">{item.Location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDestinations;
