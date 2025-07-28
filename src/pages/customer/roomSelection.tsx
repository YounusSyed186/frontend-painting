import React, { useEffect, useState } from 'react';
import axios from 'axios'; // ✅ import the Zustand store
import { useVendorStore } from '@/hooks/zustand/vendorInfo';
import { useNavigate } from 'react-router-dom';


const UserRequestsPage = () => {
  const [rooms, setRooms] = useState('');
  const [user, setUser] = useState(localStorage.getItem('user_id') || '');
  const [price, setPrice] = useState('');
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [photoMeta, setPhotoMeta] = useState({ type: '', height: '', width: '', length: '' });
  const [userRequests, setUserRequests] = useState([]);
  const navigate = useNavigate();


  const { selectedVendor } = useVendorStore(); // ✅ get selected vendor info


  console.log("user_id", user);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photos || photos.length === 0) return alert('Please select photos.');

    const formData = new FormData();
    formData.append('userId', user);
    formData.append('rooms', rooms);
    formData.append('price', price);

    Array.from(photos).forEach((file) => {
      formData.append('photos', file);
    });

    Object.entries(photoMeta).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post(`${import.meta.env.VITE_BACKENDURI}/api/usersRequest/createRequest`, formData);
      alert('Request with photos created successfully!');
      setRooms('');
      setPrice('');
      setPhotos(null);
      setPhotoMeta({ type: '', height: '', width: '', length: '' });
      navigate("/customer-dashboard");
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to create request with photos.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* ✅ Selected Design Preview */}
      {selectedVendor?.imageUrl && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Selected Design</h2>
          <img
            src={selectedVendor.imageUrl}
            alt="Selected design"
            className="w-full h-64 object-cover rounded shadow"
          />
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">User Request System</h1>

      {/* Request Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input type="text" placeholder="Rooms" value={rooms} onChange={(e) => setRooms(e.target.value)} className="border p-2 w-full" required />
        {/* <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 w-full" required /> */}
        <input type="file" multiple onChange={(e) => setPhotos(e.target.files)} className="w-full" required />
        <input type="text" placeholder="Type" value={photoMeta.type} onChange={(e) => setPhotoMeta((prev) => ({ ...prev, type: e.target.value }))} className="border p-2 w-full" required />
        <input type="text" placeholder="Height" value={photoMeta.height} onChange={(e) => setPhotoMeta((prev) => ({ ...prev, height: e.target.value }))} className="border p-2 w-full" />
        <input type="text" placeholder="Width" value={photoMeta.width} onChange={(e) => setPhotoMeta((prev) => ({ ...prev, width: e.target.value }))} className="border p-2 w-full" />
        <input type="text" placeholder="Length" value={photoMeta.length} onChange={(e) => setPhotoMeta((prev) => ({ ...prev, length: e.target.value }))} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Request + Upload Photos</button>
      </form>

      {/* Display All Requests */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All User Requests</h2>
        {userRequests.map((req: any) => (
          <div key={req._id} className="border rounded p-4 mb-4">
            <p><strong>User:</strong> {req.userId?.username || 'N/A'}</p>
            <p><strong>Rooms:</strong> {req.rooms}</p>
            {/* <p><strong>Price:</strong> ₹{req.price}</p> */}
            <p><strong>Status:</strong> {req.progress}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {req.photos?.map((photo: any) => (
                <img
                  key={photo._id}
                  src={photo.url}
                  alt="uploaded"
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRequestsPage;
