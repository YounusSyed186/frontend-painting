import { Link } from "react-router-dom";
import { PaintBucket, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <PaintBucket className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">PaintPro</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Professional painting services marketplace connecting customers with skilled painters for quality results.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-smooth" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-smooth" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-smooth" />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/interior-painting" className="text-muted-foreground hover:text-primary transition-smooth">Interior Painting</Link></li>
              <li><Link to="/exterior-painting" className="text-muted-foreground hover:text-primary transition-smooth">Exterior Painting</Link></li>
              <li><Link to="/commercial-painting" className="text-muted-foreground hover:text-primary transition-smooth">Commercial Painting</Link></li>
              <li><Link to="/custom-designs" className="text-muted-foreground hover:text-primary transition-smooth">Custom Designs</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-smooth">About Us</Link></li>
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-smooth">How It Works</Link></li>
              <li><Link to="/become-vendor" className="text-muted-foreground hover:text-primary transition-smooth">Become a Vendor</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-primary transition-smooth">Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">1-800-PAINTPRO</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@paintpro.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Available Nationwide</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 PaintPro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;