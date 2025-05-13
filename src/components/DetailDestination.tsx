import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddToList from '@/components/AddToList';

interface Destination {
  Place: string;
  Picture: string;
  Location: string;
  'Tourism/Visitor Fee (approx in USD)': string;
}

interface DetailDestinationProps {
  place: string;
  destinations: Destination[];
}

const DetailDestination: React.FC<DetailDestinationProps> = ({ place, destinations }) => {
  const router = useRouter();
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    if (place) {
      const matched = destinations.find((item) => item.Place === place);
      setDestination(matched || null);
    }
  }, [place, destinations]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-[#081827] text-white flex items-center justify-center">
        <p className="text-blue-300 text-lg">Loading or destination not found...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081827] text-white relative">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <button
          onClick={() => router.back()}
          className="mb-8 text-sm text-blue-400 hover:underline transition"
        >
          ← Back to Explore
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[70vh]">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div className="relative w-full h-80 md:h-[400px]">
              <img
                src={destination.Picture.replace('./public', '')}
                alt={destination.Place}
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 z-10">
                <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-md mb-1 text-white">
                  {destination.Place}
                </h1>
                <p className="text-md text-blue-200">{destination.Location}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#0e253b] border border-[#1e3b57] p-6 md:p-8 rounded-2xl shadow-xl space-y-6">
            <h2 className="text-2xl font-semibold text-blue-300">About this Destination</h2>
            <p className="text-blue-100 leading-relaxed text-md">
              Welcome to <span className="font-semibold text-white">{destination.Place}</span>, located in{' '}
              <span className="text-white">{destination.Location}</span>. This destination offers unique attractions
              and breathtaking views that make it a must-visit spot in Bali.
            </p>
            <p className="text-blue-100 text-md">
              <span className="font-semibold text-white">Visitor Fee:</span>{' '}
              <span className="text-blue-400 font-medium">{destination['Tourism/Visitor Fee (approx in USD)']}</span>
            </p>

            {/* Add to List */}
            <div className="mt-6">
              <AddToList place={destination.Place} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDestination;
