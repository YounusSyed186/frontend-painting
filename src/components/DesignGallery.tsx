import React from "react";

interface Design {
  imageUrl: string;
  description: string;
}

interface DesignGalleryProps {
  designs: Design[];
}

const DesignGallery: React.FC<DesignGalleryProps> = ({ designs }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">🖼️ Your Designs</h2>

      {designs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">No designs uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {designs.map((design, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={design.imageUrl}
                alt={`Design ${index + 1}`}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <p className="text-sm text-gray-700 dark:text-gray-200">{design.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignGallery;
