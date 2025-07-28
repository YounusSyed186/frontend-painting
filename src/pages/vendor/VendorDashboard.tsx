import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Upload,
  Eye,
  Calendar,
  DollarSign,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Design {
  _id?: string;
  imageUrl: string;
  description: string;
  title?: string;
  category?: string;
  tags?: string[];
  uploadDate?: string;
  views?: number;
  likes?: number;
}

interface UserRequest {
  _id: string;
  photos: string[];
  price: number;
  progress: string;
  requestedAt: string;
  rooms: number;
  userId: string;
  vendorAssigned: boolean;
}

interface AssignedTask {
  _id: string;
  UserRequestId: UserRequest;
  afterImages: string[];
  assignedAt: string;
  beforeImages: string[];
  price: number;
  vendorId: string;
  status: string;
}

interface Vendor {
  _id: string;
  username: string;
  design: Design[];
  assignedTasks: AssignedTask[];
}

const VendorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const vendorId = localStorage.getItem("vendorId");
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    category: "",
    tags: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fetchVendorData = async () => {
    try {
      if (!vendorId) {
        navigate('/vendor-login');
        return;
      }
      
      // Fetch vendor basic info and designs
      const vendorRes = await axios.get(`${import.meta.env.VITE_BACKENDURI}/api/vendor/${vendorId}`);
      
      // Fetch assigned tasks
      const assignedTasksRes = await axios.get(
        `${import.meta.env.VITE_BACKENDURI}/api/assignments/assigned/${vendorId}`
      );
      
      // Combine the data
      setVendor({
        ...vendorRes.data,
        assignedTasks: assignedTasksRes.data.map((task: any) => ({
          ...task,
          status: task.status || 'pending'
        }))
      });
      
    } catch (error) {
      console.error("Error fetching vendor data", error);
      toast({
        title: "Error loading data",
        description: "Failed to fetch vendor information",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadForm.title || !uploadForm.category) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("designImage", selectedFile);
    formData.append("description", uploadForm.description);
    formData.append("title", uploadForm.title);
    formData.append("category", uploadForm.category);
    formData.append("tags", uploadForm.tags);

    try {
      await axios.post(`${import.meta.env.VITE_BACKENDURI}/api/vendor/upload-design/${vendorId}`, formData);
      toast({ 
        title: "Upload successful", 
        description: "Design added to your portfolio" 
      });
      setUploadForm({ title: "", category: "", tags: "", description: "" });
      setSelectedFile(null);
      fetchVendorData();
    } catch (err) {
      console.error("Upload failed", err);
      toast({ 
        title: "Upload failed", 
        description: "Could not upload design",
        variant: "destructive" 
      });
    }
  };

  // const handleStatusUpdate = async (taskId: string, newStatus: string) => {
  //   try {
  //     await axios.put(
  //       `${import.meta.env.VITE_BACKENDURI}/api/vendor/update-assigned-request/${taskId}`,
  //       { status: newStatus }
  //     );
  //     toast({ 
  //       title: "Status updated", 
  //       description: `Task marked as ${newStatus}` 
  //     });
  //     fetchVendorData();
  //   } catch (err) {
  //     console.error("Status update failed", err);
  //     toast({ 
  //       title: "Update failed", 
  //       description: "Could not update task status",
  //       variant: "destructive" 
  //     });
  //   }
  // };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "in-progress": return <AlertCircle className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!vendor) return <p className="p-6 text-center text-muted-foreground">Loading dashboard...</p>;

  const designs = vendor.design || [];
  const tasks = vendor.assignedTasks || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {vendor.username} 👋</h1>
          <p className="text-muted-foreground">Manage your designs and painting projects.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Designs</p>
                  <p className="text-2xl font-bold">{designs.length}</p>
                </div>
                <Upload className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Tasks</p>
                  <p className="text-2xl font-bold">{tasks.filter(t => t.status !== "completed").length}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{designs.reduce((acc, d) => acc + (d.views || 0), 0)}</p>
                </div>
                <Eye className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">₹{tasks.reduce((acc, t) => acc + (t.price || 0), 0)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="designs">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="designs">My Designs</TabsTrigger>
            <TabsTrigger value="tasks">Assigned Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="designs" className="space-y-6">
            {/* Upload Dialog */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-foreground">My Designs</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button><Upload className="h-4 w-4 mr-2" />Upload Design</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload New Design</DialogTitle>
                    <DialogDescription>Add a design to your gallery.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                    <Input 
                      placeholder="Title" 
                      value={uploadForm.title} 
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })} 
                    />
                    <Select 
                      value={uploadForm.category} 
                      onValueChange={(v) => setUploadForm({ ...uploadForm, category: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Living Room">Living Room</SelectItem>
                        <SelectItem value="Bedroom">Bedroom</SelectItem>
                        <SelectItem value="Kitchen">Kitchen</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="Tags (comma separated)" 
                      value={uploadForm.tags} 
                      onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })} 
                    />
                    <Textarea 
                      placeholder="Description" 
                      value={uploadForm.description} 
                      onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })} 
                    />
                    <Button onClick={handleUpload}>Upload</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Design Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((design, i) => (
                <Card key={i}>
                  <div className="aspect-video bg-muted">
                    <img 
                      src={design.imageUrl} 
                      alt={design.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{design.title}</h3>
                    <p className="text-sm text-muted-foreground">{design.category}</p>
                    <div className="flex flex-wrap gap-1 my-2">
                      {(design.tags || []).map((tag, idx) => (
                        <Badge key={idx} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span className="flex gap-2">
                        <Eye className="h-4 w-4" />
                        {design.views || 0}
                      </span>
                      <span className="flex gap-2">
                        <Star className="h-4 w-4" />
                        {design.likes || 0}
                      </span>
                      <span>{design.uploadDate?.slice(0, 10)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <h2 className="text-2xl font-semibold mb-4">Assigned Tasks</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Requested At</TableHead>
                    <TableHead>Assigned At</TableHead>
                    <TableHead>Rooms</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map(task => (
                    <TableRow key={task._id}>
                      <TableCell>Project #{task.UserRequestId?._id.slice(-6)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(task.status)}>
                          {getStatusIcon(task.status)}
                          <span className="ml-1 capitalize">{task.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>₹{task.price}</TableCell>
                      <TableCell>{formatDate(task.UserRequestId?.requestedAt)}</TableCell>
                      <TableCell>{formatDate(task.assignedAt)}</TableCell>
                      <TableCell>{task.UserRequestId?.rooms}</TableCell>
                      <TableCell>
                        <Select 
                          value={task.status} 
                          // onValueChange={(val) => handleStatusUpdate(task._id, val)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;