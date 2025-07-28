import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  PaintBucket, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Clock,
  Award,
  Search,
  Upload,
  MessageSquare
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);

  const features = [
    {
      icon: Search,
      title: "Browse Designs",
      description: "Explore thousands of painting designs from verified professionals",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Expert Painters",
      description: "Connect with skilled painters in your area",
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "All work is insured and comes with satisfaction guarantee",
      color: "text-success"
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "Get quotes within 24 hours and quick project completion",
      color: "text-warning"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Choose Your Design",
      description: "Browse our gallery or upload your room photos for custom estimates",
      icon: Search
    },
    {
      step: "2",
      title: "Get Matched",
      description: "We connect you with verified painters in your area",
      icon: Users
    },
    {
      step: "3",
      title: "Book & Relax",
      description: "Schedule your painting project and track progress in real-time",
      icon: CheckCircle
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Verified Painters" },
    { number: "50,000+", label: "Projects Completed" },
    { number: "4.9/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Professional painting service" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  #1 Painting Service Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Transform Your Space with 
                  <span className="text-yellow-300"> Professional</span> Painters
                </h1>
                <p className="text-xl lg:text-2xl text-white/90">
                  Connect with verified painters, browse stunning designs, and bring your vision to life with quality guaranteed.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate("/browse-designs")}
                  className="text-lg px-8 py-4"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Browse Designs
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
                  onClick={() => navigate("/become-vendor")}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Join as Painter
                </Button>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-sm">10,000+ happy customers</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                  ))}
                  <span className="ml-2 text-sm">4.9/5 rating</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-white/95 backdrop-blur-sm shadow-glow border-0">
                <CardHeader>
                  <CardTitle className="text-center text-foreground">Start Your Project Today</CardTitle>
                  <CardDescription className="text-center">Choose how you'd like to get started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <Button 
                      variant={selectedUserType === "customer" ? "default" : "outline"}
                      size="lg"
                      onClick={() => {
                        setSelectedUserType("customer");
                        navigate("/customer-register");
                      }}
                      className="justify-start h-16"
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">I need painting services</span>
                        <span className="text-sm opacity-75">Get quotes from verified painters</span>
                      </div>
                      <ArrowRight className="ml-auto h-5 w-5" />
                    </Button>
                    
                    <Button 
                      variant={selectedUserType === "vendor" ? "default" : "outline"}
                      size="lg"
                      onClick={() => {
                        setSelectedUserType("vendor");
                        navigate("/vendor-register");
                      }}
                      className="justify-start h-16"
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">I'm a professional painter</span>
                        <span className="text-sm opacity-75">Join our network of verified painters</span>
                      </div>
                      <ArrowRight className="ml-auto h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose PaintPro?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make finding and hiring professional painters simple, secure, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-card hover:shadow-elegant transition-spring bg-gradient-card">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get your painting project done in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <Card className="text-center h-full border-0 shadow-card bg-card">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-primary text-white flex items-center justify-center mx-auto mb-4 shadow-glow">
                      <span className="text-xl font-bold">{step.step}</span>
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-lg">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of satisfied customers who trust PaintPro for their painting needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate("/browse-designs")}
              className="text-lg px-8 py-4"
            >
              <Search className="mr-2 h-5 w-5" />
              Start Your Project
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => navigate("/contact")}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
