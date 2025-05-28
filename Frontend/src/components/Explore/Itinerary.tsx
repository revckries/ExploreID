import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

interface ItineraryProps {
  place: string;
}

const Itinerary: React.FC<ItineraryProps> = ({ place }) => {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState(3);
  const [itinerary, setItinerary] = useState<string | null>(null);

  const generateItinerary = () => {
    const mock = Array.from({ length: days }, (_, i) => `Day ${i + 1}: Explore ${place} and discover local gems.`).join('\n');
    setItinerary(mock);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-300 text-white py-3 px-6 rounded-full shadow-lg flex items-center gap-2 font-bold transition duration-300 z-[20]"
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span className="hidden md:block">Create Itinerary</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-[350px] bg-blue-100 text-blue-900 p-6 rounded-3xl shadow-2xl transition-all duration-700 z-[20]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-blue-700">Itinerary Generator</h3>
            <button onClick={() => setOpen(false)}>
              <X className="text-blue-500 hover:text-red-500" />
            </button>
          </div>

          <p className="text-sm mb-3">
            Plan your trip to <span className="font-semibold">{place}</span> and customize your itinerary.
          </p>

          <label className="block mb-2 text-sm">Number of Days:</label>
          <input
            type="number"
            min={1}
            max={10}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full bg-blue-200 text-blue-900 p-2 rounded-md mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            onClick={generateItinerary}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Generate
          </button>

          {itinerary && (
            <div className="mt-4 max-h-[200px] overflow-auto bg-blue-50 p-4 rounded-lg shadow-inner">
              <h4 className="text-blue-600 text-sm font-semibold mb-2">Your Itinerary</h4>
              <pre className="text-sm whitespace-pre-wrap">{itinerary}</pre>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Itinerary;
