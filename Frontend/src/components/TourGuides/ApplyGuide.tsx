import React from 'react';

interface ApplyGuideModalProps {
  isVisible: boolean; 
  formData: {
    name: string;
    language: string;
    price: string;
    description: string;
    picture: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const ApplyGuideModal: React.FC<ApplyGuideModalProps> = ({
  isVisible,
  formData,
  onInputChange,
  onSubmit,
  onClose,
}) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div
        className={`bg-[#1f1d2b] rounded-3xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} 
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Apply as Tour Guide</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={onInputChange}
          className="w-full mb-3 p-3 rounded-xl bg-[#060c20] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="language"
          placeholder="Languages Spoken"
          value={formData.language}
          onChange={onInputChange}
          className="w-full mb-3 p-3 rounded-xl bg-[#060c20] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="price"
          placeholder="Price Range"
          value={formData.price}
          onChange={onInputChange}
          className="w-full mb-3 p-3 rounded-xl bg-[#060c20] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={onInputChange}
          rows={4}
          className="w-full mb-3 p-3 rounded-xl bg-[#060c20] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-y"
        />
        <input
          type="text"
          name="picture"
          placeholder="Image URL"
          value={formData.picture}
          onChange={onInputChange}
          className="w-full mb-4 p-3 rounded-xl bg-[#060c20] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-600 px-5 py-2 rounded-xl hover:bg-gray-500 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-600 px-5 py-2 rounded-xl hover:bg-blue-700 transition font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyGuideModal;