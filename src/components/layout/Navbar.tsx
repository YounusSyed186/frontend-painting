import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn, PaintBucket } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  // Detect login from localStorage
  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      setUserRole("customer");
      setUserName("Customer");
    } else if (localStorage.getItem("vendorId")) {
      setUserRole("vendor");
      setUserName("Vendor");
    } else if (localStorage.getItem("Admin-Id")) {
      setUserRole("admin");
      setUserName("Admin");
    } else {
      setUserRole(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("vendorId");
    localStorage.removeItem("Admin-Id");
    setUserRole(null);
    navigate("/");
  };

  const handleAuth = (role: string) => {
    if (role === "customer") {
      navigate("/customer-login");
    } else if (role === "vendor") {
      navigate("/vendor-login");
    } else {
      navigate("/admin-login");
    }
  };

  const navItems = [
    { name: "Browse Designs", href: "/browse-designs", role: "customer" },
    { name: "My Projects", href: "/projects", role: "customer" },
    { name: "Upload Design", href: "/upload-design", role: "vendor" },
    { name: "My Jobs", href: "/vendor-projects", role: "vendor" },
    { name: "Admin Panel", href: "/admin-panel", role: "admin" },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.role || item.role === userRole
  );

  const dashboardLink =
    userRole === "customer"
      ? "/customer-dashboard"
      : userRole === "vendor"
      ? "/vendor-dashboard"
      : userRole === "admin"
      ? "/admin-panel"
      : null;

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <PaintBucket className="h-8 w-8 text-primary group-hover:text-primary-glow transition-smooth" />
              <span onClick={()=> navigate("/")} className="text-xl font-bold text-foreground">PaintPro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-smooth px-3 py-2 rounded-md ${
                  location.pathname === item.href
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {userRole ? (
              <>
                {dashboardLink && (
                  <Button
                    variant="outline"
                    onClick={() => navigate(dashboardLink)}
                  >
                    Dashboard
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{userName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleAuth("customer")}>
                      Login as Customer
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAuth("vendor")}>
                      Login as Vendor
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAuth("admin")}>
                      Login as Admin
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="gradient" onClick={() => handleAuth("customer")}>
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-smooth ${
                    location.pathname === item.href
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {userRole && dashboardLink && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false);
                    navigate(dashboardLink);
                  }}
                >
                  Dashboard
                </Button>
              )}
              {userRole ? (
                <Button
                  variant="gradient"
                  className="w-full mt-2"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <div className="pt-4 border-t border-border space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleAuth("customer")}
                  >
                    Customer Login
                  </Button>
                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={() => handleAuth("vendor")}
                  >
                    Vendor Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
