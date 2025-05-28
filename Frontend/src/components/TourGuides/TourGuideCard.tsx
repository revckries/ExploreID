import React from 'react';
<<<<<<< HEAD
import Image from 'next/image';
=======
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66

interface TourGuide {
  id: string;
  name: string;
  language: string;
  price: string;
  description: string;
  picture: string;
}

interface TourGuideCardProps {
  guide: TourGuide;
}

const TourGuideCard: React.FC<TourGuideCardProps> = ({ guide }) => {
<<<<<<< HEAD

  let imageUrl = guide.picture;
  if (imageUrl.startsWith('./public')) {
    imageUrl = imageUrl.replace('./public', '/');
  }

  imageUrl = imageUrl.replace(/^\/\//, '/'); 

=======
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66
  return (
    <div 
      className="bg-[#1f1d2b] rounded-3xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 flex flex-col h-full"
    >
<<<<<<< HEAD
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3">
        <Image
          src={imageUrl}
          alt={guide.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={(e) => { e.currentTarget.src = '/placeholder-guide.jpg'; }}
        />
      </div>
=======
      <img
        src={guide.picture}
        alt={guide.name}
        className="w-full h-48 object-cover rounded-xl mb-3"
      />
>>>>>>> 792cb8520518d6091513d49a2301aa8948dada66
      <h3 className="text-lg font-semibold mb-1 text-white line-clamp-2">{guide.name}</h3>
      <p className="text-gray-300 text-sm mb-1">🗣️ {guide.language}</p>
      <p className="text-blue-300 font-semibold mt-1 mb-2">💰 {guide.price}</p>
      <p className="text-gray-400 text-sm mt-2 flex-grow leading-normal line-clamp-3">{guide.description}</p>
      <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
        Contact Guide
      </button>
    </div>
  );
};

export default TourGuideCard;