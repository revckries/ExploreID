import React, { useState, useEffect } from 'react';

interface AddToListProps {
  place: string;
}

const AddToList: React.FC<AddToListProps> = ({ place }) => {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    setAdded(list.includes(place)); // Cek apakah tempat ada di list
  }, [place]);

  const handleAddToList = () => {
    const list = JSON.parse(localStorage.getItem('myList') || '[]');

    if (added) {
      const newList = list.filter((item: string) => item !== place);
      localStorage.setItem('myList', JSON.stringify(newList));
      setAdded(false);
      window.dispatchEvent(new Event('myListUpdated')); // ← Trigger event
    } else {
      list.push(place);
      localStorage.setItem('myList', JSON.stringify(list));
      setAdded(true);
      window.dispatchEvent(new Event('myListUpdated')); // ← Trigger event
    }
  };

  return (
    <button
      onClick={handleAddToList}
      className={`mt-4 px-6 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out transform ${
        added ? 'bg-blue-300 text-black scale-105' : 'bg-gray-700 text-white scale-100'
      }`}
    >
      {added ? (
        <>
          <span role="img" aria-label="heart">❤️</span> Added to List
        </>
      ) : (
        'Add to List'
      )}
    </button>
  );
};

export default AddToList;
