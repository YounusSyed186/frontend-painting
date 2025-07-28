import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // ✅ Zustand store
import { useNavigate } from "react-router-dom";
import { useAssignStore } from "@/hooks/zustand/UserRequestinfo";

interface Vendor {
  _id: string;
  username: string;
  email: string;
  phone_number: number;
  isApproved: boolean;
  discription?: string;
  design: any[];
  To_do: string[];
  history: string[];
}

const AllVendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedRequest, clearRequest } = useAssignStore(); // ✅ Zustand
  const navigate = useNavigate();
  console.log("Selected Request:", selectedRequest);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKENDURI}/api/admin/get-vendor`);
        setVendors(res.data);
      } catch (err: any) {
        console.error("Failed to fetch vendors:", err);
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handleAssign = async (vendorId: string) => {
    if (!selectedRequest) {
      alert("No user request selected.");
      return;
    }

    try {
      const payload = {
        vendorId,
        UserRequestId: selectedRequest._id,
        userId: selectedRequest.userId, // optional if needed
        price: 5000, // replace with UI input or logic if needed
      };

      await axios.post(`${import.meta.env.VITE_BACKENDURI}/api/assignments/assignVendor`, payload);

      alert("Vendor assigned successfully!");
      clearRequest();
      navigate("/admin/requests"); // redirect or reload
    } catch (err: any) {
      console.error("Assignment failed:", err);
      alert("Failed to assign vendor.");
    }
  };

  if (loading) return <p className="p-4">Loading vendors...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Vendors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map((vendor) => (
          <Card key={vendor._id}>
            <CardHeader>
              <CardTitle>{vendor.username}</CardTitle>
              <CardDescription>{vendor.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Phone:</strong> {vendor.phone_number}</p>
              <p><strong>Description:</strong> {vendor.discription || "N/A"}</p>
              <p><strong>Designs:</strong> {vendor.design.length}</p>
              <p><strong>To Do:</strong> {vendor.To_do.length}</p>
              <p><strong>History:</strong> {vendor.history.length}</p>
              <Badge variant={vendor.isApproved ? "default" : "destructive"}>
                {vendor.isApproved ? "Approved" : "Pending"}
              </Badge>

              {/* ✅ Assign Button */}
              <div className="pt-2">
                <Button onClick={() => handleAssign(vendor._id)} className="w-full">
                  Assign
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllVendors;
