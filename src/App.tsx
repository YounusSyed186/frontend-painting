import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Customer Pages
import BrowseDesigns from "./pages/customer/BrowseDesigns";
import CustomerRegister from "./pages/customer/CustomerRegister";
import CustomerDashboard from "./pages/customer/CustomerDashboard";

// Vendor Pages

// Auth Pages
import CustomerLogin from "./pages/auth/CustomerLogin";
import VendorLogin from "./pages/auth/VendorLogin";
import AdminLogin from "./pages/auth/AdminLogin";

// Admin Pages
import AdminPanel from "./pages/admin/AdminPanel";
import VendorRegister from "./pages/vendor/vendorRegistor";
import UserRequestsPage from "./pages/customer/roomSelection";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AllVendors from "./pages/admin/assiginVendorList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/vendor-login" element={<VendorLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          
          {/* Customer Routes */}
          <Route path="/browse-designs" element={<BrowseDesigns />} />
          <Route path="/customer-register" element={<CustomerRegister />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/room-selection" element={<UserRequestsPage />} />
          
          {/* Vendor Routes */}
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/assign-vendor" element={<AllVendors />} />
          
          {/* Admin Routes */}
          <Route path="/admin-panel" element={<AdminPanel />} />
          {/* vendorroutes */}
          <Route path="/vendor-register" element={<VendorRegister />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />

          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
