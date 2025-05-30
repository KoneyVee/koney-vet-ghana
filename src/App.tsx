
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/layout/PageTransition";
import TawkToChat from "./components/common/TawkToChat";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
// Using relative paths for Blog and BlogPost components
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Media from "./pages/Media";

const queryClient = new QueryClient();

import { CartProvider } from "@/context/CartContext";

// Wrapper component to access location for AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Index />
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <About />
          </PageTransition>
        } />
        <Route path="/services" element={
          <PageTransition>
            <Services />
          </PageTransition>
        } />
        <Route path="/services/:id" element={
          <PageTransition>
            <ServiceDetail />
          </PageTransition>
        } />
        <Route path="/shop" element={
          <PageTransition>
            <Shop />
          </PageTransition>
        } />
        <Route path="/shop/cart" element={
          <PageTransition>
            <Cart />
          </PageTransition>
        } />
        <Route path="/shop/checkout" element={
          <PageTransition>
            <Checkout />
          </PageTransition>
        } />
        <Route path="/shop/product/:id" element={
          <PageTransition>
            <ProductDetail />
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition>
            <Contact />
          </PageTransition>
        } />
        {/* Blog routes */}
        <Route path="/blog" element={
          <PageTransition>
            <Blog />
          </PageTransition>
        } />
        <Route path="/blog/:slug" element={
          <PageTransition>
            <BlogPost />
          </PageTransition>
        } />
        <Route path="/media" element={
          <PageTransition>
            <Media />
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <AnimatedRoutes />
          {/* Tawk.to chat widget - Replace with your actual Property ID and Widget ID */}
          <TawkToChat 
            propertyId="YOUR_TAWK_TO_PROPERTY_ID"
            widgetId="YOUR_TAWK_TO_WIDGET_ID"
          />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
