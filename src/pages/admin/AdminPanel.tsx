import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Users, Briefcase, PaintBucket, BarChart3, Settings,
  Check, X, UserCheck, DollarSign, TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Adjust path as needed
import { useAssignStore } from "@/hooks/zustand/UserRequestinfo";

interface Vendor {
  _id: string;
  username: string;
  email: string;
  phone_number: string;
  isApproved: boolean;
  status?: string;
  experience?: string;
}

interface UserRequest {
  _id: string;
  userId: {
    username: string;
    email: string;
  };
  description: string;
  photos: { url: string }[];
  status: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const setSelectedRequest = useAssignStore((state) => state.setSelectedRequest);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { title: "Active Vendors", value: "89", icon: Briefcase, change: "+5%" },
    { title: "Completed Projects", value: "456", icon: PaintBucket, change: "+18%" },
    { title: "Revenue", value: "$45,678", icon: DollarSign, change: "+23%" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminId = localStorage.getItem("Admin-Id");
        if (!adminId) {
          setError("You are not authorized to view this page");
          navigate("/admin-login");
          setLoading(false);
          return;
        }

        const [vendorRes, requestRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKENDURI}/api/admin/vendor-requests`),
          axios.get(`${import.meta.env.VITE_BACKENDURI}/api/usersRequest/`),
        ]);

        const fetchedVendors: Vendor[] = vendorRes.data.vendorRequests.map((v: Vendor) => ({
          ...v,
          status: v.isApproved ? "approved" : "pending",
        }));

        setVendors(fetchedVendors);
        setUserRequests(requestRes.data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVendorAction = async (vendorId: string, action: "approve" | "reject") => {
    try {
      setVendors(prev =>
        prev.map(v =>
          v._id === vendorId ? { ...v, status: action === "approve" ? "approved" : "rejected" } : v
        )
      );

      const response = await axios.post(`${import.meta.env.VITE_BACKENDURI}/api/admin/vendor-action`, {
        vendorId,
        action,
      });

      console.log(response.data.message);
    } catch (error: any) {
      console.error("Error approving/rejecting vendor:", error.response?.data || error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <PaintBucket className="h-8 w-8 text-primary" />
            <h1 onClick={() => navigate("/")} className="text-2xl cursor-pointer font-bold">
              PaintPro Admin
            </h1>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="vendors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vendors">Vendor Approvals</TabsTrigger>
            <TabsTrigger value="requests">User Requests</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Vendor Approvals */}
          <TabsContent value="vendors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Vendor Approvals</CardTitle>
                <CardDescription>Review and approve new vendor applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendors.filter(v => v.status === "pending").map(vendor => (
                    <div
                      key={vendor._id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{vendor.username}</h3>
                        <p className="text-sm text-muted-foreground">{vendor.email}</p>
                        <p className="text-sm">Experience: {vendor.experience || "N/A"}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            vendor.status === "approved"
                              ? "default"
                              : vendor.status === "rejected"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {vendor.status}
                        </Badge>
                        {vendor.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleVendorAction(vendor._id, "approve")}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleVendorAction(vendor._id, "reject")}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Requests */}
          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Requests</CardTitle>
                <CardDescription>All submitted user requests with images</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRequests.map(req => (
                    <div key={req._id} className="p-4 border border-border rounded-lg space-y-2">
                      <div>
                        <h3 className="font-semibold">{req.userId?.username}</h3>
                        <p className="text-sm text-muted-foreground">{req.userId?.email}</p>
                        <p className="text-sm mt-1">Description: {req.description}</p>
                      </div>

                      {req.photos?.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto">
                          {req.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo.url}
                              alt="User Upload"
                              className="w-24 h-24 rounded object-cover border"
                            />
                          ))}
                        </div>
                      )}

                      <Badge variant="outline">{req.status}</Badge>

                      <div className="mt-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(req);
                            navigate("/assign-vendor");
                          }}
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          Assign
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
