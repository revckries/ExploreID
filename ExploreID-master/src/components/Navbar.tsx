import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter, Search } from 'lucide-react';
import SidebarFilter from './SidebarFilter';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedCrowdness, setSelectedCrowdness] = useState('');

  const handleApplyFilter = () => setShowFilter(false);
  const handleResetFilter = () => {
    setSelectedExperience('');
    setSelectedActivity('');
    setSelectedCrowdness('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#2d2e31] py-4 px-6 rounded-3xl shadow-xl w-[95%] max-w-screen-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={36} height={36} className="object-contain" />
          </div>

          <nav className="flex gap-6 text-white font-medium">
            <Link href="/" className="hover:text-blue-300 transition">Home</Link> {/* Home biasanya di root path "/" */}
            <Link href="/explore" className="hover:text-blue-300 transition">Explore</Link> {/* Pastikan pathnya benar */}
            <Link href="#experience" className="hover:text-blue-300 transition">Experience</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center bg-white/90 px-4 py-2 rounded-full shadow-lg w-[400px]">
            <Search className="text-gray-500 mr-2" size={16} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent w-full text-sm text-black placeholder-gray-500 focus:outline-none"
            />
            <button className="ml-2 px-3 py-1 bg-blue-300 text-black text-sm font-semibold rounded-full hover:bg-blue-400 transition">
              Search
            </button>
          </div>

          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-1 bg-blue-100 px-4 py-2 rounded-full shadow-lg text-black hover:bg-blue-200 transition"
          >
            <Filter size={16} />
            Filter
          </button>

          {/* Tombol Login/Register */}
          <div className="flex gap-4 text-black">
            <Link href="/login">
              <button className="px-4 py-2 bg-blue-300 text-black rounded-full hover:bg-blue-400 transition">
                Login
              </button>
            </Link>
          </div>

        </div>
      </div>

      <SidebarFilter
        selectedExperience={selectedExperience}
        selectedActivity={selectedActivity}
        selectedCrowdness={selectedCrowdness}
        setSelectedExperience={setSelectedExperience}
        setSelectedActivity={setSelectedActivity}
        setSelectedCrowdness={setSelectedCrowdness}
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
        showFilter={showFilter}
        filterRef={filterRef}
      />
    </header>
  );
};

export default Header;
