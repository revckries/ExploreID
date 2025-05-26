'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Header from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import TourGuideList from '@/components/TourGuides/TourGuideList';
import ApplyGuideModal from '@/components/TourGuides/ApplyGuide';
import { motion } from 'framer-motion';

interface TourGuide {
  id: string;
  name: string;
  language: string;
  price: string;
  description: string;
  picture: string;
}

const fadeInPage = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const TourGuidePage: React.FC = () => {
  const [guides, setGuides] = useState<TourGuide[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    language: '',
    price: '',
    description: '',
    picture: '',
  });

  useEffect(() => {
    fetch('/dataset/tourGuides.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: TourGuide[]) => setGuides(data))
      .catch((err) => console.error('Failed to load guide data:', err));
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formData.name || !formData.language || !formData.price || !formData.description || !formData.picture) {
      alert('Please fill in all fields.');
      return;
    }

    const newGuide: TourGuide = {
      id: Date.now().toString(),
      ...formData,
    };

    console.log('Submitted for approval:', newGuide);

    alert('Your application has been submitted and is awaiting admin approval.');

    setFormData({ name: '', language: '', price: '', description: '', picture: '' });
    setFormVisible(false);
    setTimeout(() => setShowForm(false), 300);
  }, [formData]);

  const openForm = useCallback(() => {
    setShowForm(true);
    setTimeout(() => setFormVisible(true), 10);
  }, []);

  const closeForm = useCallback(() => {
    setFormVisible(false);
    setTimeout(() => setShowForm(false), 300);
  }, []);

  return (
    <div className="min-h-screen bg-[#060c20] text-white overflow-x-hidden transition-all duration-500">
      <Header searchQuery="" onSearchChange={() => {}} />

      <motion.main
        className="mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10"
        variants={fadeInPage}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold">Meet Your Tour Guides</h2>
          <button
            onClick={openForm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-2xl font-medium transition-colors duration-300"
          >
            Apply as Tour Guide
          </button>
        </motion.div>

        <TourGuideList guides={guides} />

        {showForm && (
          <ApplyGuideModal
            isVisible={formVisible}
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onClose={closeForm}
          />
        )}
      </motion.main>

      <Footer />
    </div>
  );
};

export default TourGuidePage;