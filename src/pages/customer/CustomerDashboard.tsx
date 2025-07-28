import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Search, 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  Plus,
  Image as ImageIcon,
  FileText,
  CreditCard,
  Phone
} from "lucide-react";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  
  // Mock customer data
  const customer = {
    name: "John Smith",
    email: "john.smith@example.com",
    joinDate: "March 2024",
    completedProjects: 3,
    totalSpent: "$4,200"
  };

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "Living Room Makeover",
      status: "In Progress",
      progress: 75,
      vendor: "Elite Painters Co.",
      vendorRating: 4.8,
      startDate: "2024-01-15",
      estimatedCompletion: "2024-01-25",
      price: "$1,200",
      address: "123 Main Street, San Francisco, CA",
      description: "Modern minimalist design with neutral colors",
      nextMilestone: "Final coat application",
      image: "photo-1721322800607-8c38375eef04"
    },
    {
      id: 2,
      title: "Master Bedroom Refresh",
      status: "Completed",
      progress: 100,
      vendor: "Artistic Touch Painters",
      vendorRating: 4.9,
      startDate: "2023-12-01",
      completedDate: "2023-12-08",
      price: "$800",
      address: "123 Main Street, San Francisco, CA",
      description: "Calming blue and white color scheme",
      rating: 5,
      image: "photo-1465146344425-f00d5f5c8f07"
    },
    {
      id: 3,
      title: "Kitchen Cabinet Painting",
      status: "Pending",
      progress: 0,
      vendor: "Pro Kitchen Painters",
      vendorRating: 4.7,
      estimatedStart: "2024-02-01",
      price: "$1,500",
      address: "123 Main Street, San Francisco, CA",
      description: "White cabinets with soft-close hinges",
      image: "photo-1487058792275-0ad4aaf24ca7"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "destructive";
      case "Pending":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return "✓";
      case "In Progress":
        return "🔄";
      case "Pending":
        return "⏳";
      default:
        return "•";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {customer.name}!
            </h1>
            <p className="text-muted-foreground">
              Track your painting projects and discover new designs
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
                    <p className="text-2xl font-bold text-primary">
                      {projects.filter(p => p.status === "In Progress").length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Completed</p>
                    <p className="text-2xl font-bold text-success">{customer.completedProjects}</p>
                  </div>
                  <Star className="h-8 w-8 text-success/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                    <p className="text-2xl font-bold text-secondary">{customer.totalSpent}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-secondary/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-gradient-primary text-white">
              <CardContent className="p-6">
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => navigate("/browse-designs")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">My Projects</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              {projects.map((project) => (
                <Card key={project.id} className="shadow-card border-0 hover:shadow-elegant transition-spring">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Project Image */}
                      <div className="lg:col-span-1">
                        <img
                          src={`${project.image}`}
                          alt={project.title}
                          className="w-full h-32 lg:h-24 object-cover rounded-lg"
                        />
                      </div>

                      {/* Project Info */}
                      <div className="lg:col-span-2 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                          <Badge variant={getStatusColor(project.status) as any}>
                            {getStatusIcon(project.status)} {project.status}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground text-sm">{project.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {project.address.split(',')[0]}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-muted-foreground">
                              {project.vendor} ({project.vendorRating}/5)
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {project.status === "Completed" 
                                ? `Completed ${project.completedDate}`
                                : project.status === "In Progress"
                                ? `Est. completion ${project.estimatedCompletion}`
                                : `Starts ${project.estimatedStart}`
                              }
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground font-medium">{project.price}</span>
                          </div>
                        </div>

                        {project.status === "In Progress" && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Progress</span>
                              <span className="text-sm font-medium">{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                            <p className="text-sm text-muted-foreground">
                              Next: {project.nextMilestone}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="lg:col-span-1 flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        
                        {project.status === "In Progress" && (
                          <>
                            <Button variant="outline" size="sm">
                              <ImageIcon className="mr-2 h-4 w-4" />
                              View Photos
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="mr-2 h-4 w-4" />
                              Contact Vendor
                            </Button>
                          </>
                        )}
                        
                        {project.status === "Completed" && !project.rating && (
                          <Button variant="gradient" size="sm">
                            <Star className="mr-2 h-4 w-4" />
                            Rate Project
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {projects.length === 0 && (
                <Card className="shadow-card border-0">
                  <CardContent className="p-12 text-center">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No projects yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start your first painting project by browsing our design gallery
                    </p>
                    <Button variant="gradient" onClick={() => navigate("/browse-designs")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Start New Project
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle>Favorite Designs</CardTitle>
                  <CardDescription>
                    Designs you've saved for future projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No favorites yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Browse designs and save your favorites for quick access
                    </p>
                    <Button variant="outline" onClick={() => navigate("/browse-designs")}>
                      Browse Designs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Personal Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Name:</span> {customer.name}</p>
                        <p><span className="text-muted-foreground">Email:</span> {customer.email}</p>
                        <p><span className="text-muted-foreground">Member since:</span> {customer.joinDate}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Account Summary</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Projects completed:</span> {customer.completedProjects}</p>
                        <p><span className="text-muted-foreground">Total spent:</span> {customer.totalSpent}</p>
                        <p><span className="text-muted-foreground">Account status:</span> <Badge variant="default">Active</Badge></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline">Edit Profile</Button>
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">Notification Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomerDashboard;