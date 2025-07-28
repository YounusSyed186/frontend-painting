import React, { useState } from "react";
import axios from "axios";

interface DesignUploadProps {
  vendorId: string;
  onUpload: () => void;
}

const DesignUpload: React.FC<DesignUploadProps> = ({ vendorId, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("designImage", file);
    formData.append("description", description);

    try {
      await axios.post(`${import.meta.env.VITE_BACKENDURI}/api/vendor/upload-design/${vendorId}`, formData);
      alert("Design uploaded successfully!");
      setFile(null);
      setDescription("");
      onUpload();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">📤 Upload New Design</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Select Design Image
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-gray-700 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          placeholder="Describe your design..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
        />
      </div>

      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Upload Design
      </button>
    </div>
  );
};

export default DesignUpload;
