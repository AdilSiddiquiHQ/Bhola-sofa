import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ProductPage from './pages/ProductPage';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also force it after a tiny delay to ensure the new page DOM has painted
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    }, 10);
    
    return () => clearTimeout(timeout);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop />
          <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </WishlistProvider>
    </CartProvider>
  );
}

export default App;
