import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, MapPin, Menu, X, ChevronDown, Edit2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pincode, setPincode] = useState('831006');
  const [isEditingPincode, setIsEditingPincode] = useState(false);
  const [tempPincode, setTempPincode] = useState('831006');
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    if (tempPincode.match(/^83[12]\d{3}$/)) {
      setPincode(tempPincode);
      setIsEditingPincode(false);
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you! We will notify ${email} when we deliver to ${tempPincode}.`);
    setShowModal(false);
    setIsEditingPincode(false);
    setEmail('');
  };

  return (
    <header className="navbar-wrapper">
      {/* 1. Top Announcement Marquee Bar */}
      <div className="marquee-bar">
        <div className="marquee-content">
          <span>⚡ 5% Instant Discount with HDFC Bank EMI</span>
          <span>⚡ 2% Cashback on UPI Payments</span>
          <span>⚡ Shop Now!</span>
          <span>⚡ 5% Instant Discount with HDFC Bank EMI</span>
          <span>⚡ 2% Cashback on UPI Payments</span>
          <span>⚡ Shop Now!</span>
          <span>⚡ 5% Instant Discount with HDFC Bank EMI</span>
          <span>⚡ 2% Cashback on UPI Payments</span>
          <span>⚡ Shop Now!</span>
          <span>⚡ 5% Instant Discount with HDFC Bank EMI</span>
          <span>⚡ 2% Cashback on UPI Payments</span>
          <span>⚡ Shop Now!</span>
        </div>
      </div>

      {/* 2. Secondary Utility Header */}
      <div className="utility-header">
        <div className="container utility-container">
          <div className="utility-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} className="pin-icon" /> 
              <span className="deliver-text">Deliver to</span> 
              {isEditingPincode ? (
                <form onSubmit={handlePincodeSubmit} className="pincode-form">
                  <input 
                    type="text" 
                    value={tempPincode} 
                    onChange={(e) => setTempPincode(e.target.value)}
                    maxLength={6}
                    placeholder="Enter Pincode"
                    autoFocus
                  />
                  <button type="submit">Check</button>
                  <button type="button" onClick={() => setIsEditingPincode(false)}><X size={12} /></button>
                </form>
              ) : (
                <>
                  <span className="pincode-text">{pincode}</span>
                  <Edit2 size={12} className="edit-icon" onClick={() => {
                    setTempPincode(pincode);
                    setIsEditingPincode(true);
                  }} />
                </>
              )}
            </div>
            
            {/* Mobile Only Cart and Wishlist next to pincode */}
            <div className="mobile-utility-actions">
              <Link to="/wishlist" className="mobile-action-icon">
                <Heart size={16} />
                {wishlistItems.length > 0 && <span className="mobile-badge">{wishlistItems.length}</span>}
              </Link>
              <Link to="/cart" className="mobile-action-icon">
                <ShoppingCart size={16} />
                {cartItems.length > 0 && <span className="mobile-badge">{cartItems.length}</span>}
              </Link>
            </div>
          </div>
          <div className="utility-right">
            <Link to="/about">About Us</Link>
            <Link to="/blog">Blog</Link>
            <span className="pipe">|</span>
            <Link to="/contact">Customer Support</Link>
            <span className="pipe">|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Currently not hiring. Coming soon!"); }}>Careers</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container header-container">
          
          <div className="header-search">
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%' }}>
              <input 
                type="text" 
                placeholder="Search for furniture..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn"><Search size={20} /></button>
            </form>
          </div>

          <div className="header-logo">
            <Link to="/">
              <span className="logo-brand">BHOLA SOFA</span>
            </Link>
          </div>

          <div className="header-actions">
            <Link to="/wishlist" className="action-item cart-item">
              <Heart size={22} />
              {wishlistItems.length > 0 && <span className="cart-badge">{wishlistItems.length}</span>}
              <span>WISHLIST</span>
            </Link>
            <Link to="/cart" className="action-item cart-item">
              <ShoppingCart size={22} />
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
              <span>CART</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Category Navigation removed as requested */}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-search">
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" style={{ position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none' }}><Search size={20} color="#666" /></button>
          </form>
        </div>
        <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/catalog" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Catalog</Link>
        <Link to="/blog" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
        <Link to="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
        <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        <Link to="/wishlist" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
          Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
        </Link>
        <Link to="/cart" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
          Cart {cartItems.length > 0 && `(${cartItems.length})`}
        </Link>
      </div>

      {/* Out of Area Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            <h3>Coming Soon!</h3>
            <p>We are currently not delivering to <strong>{tempPincode}</strong> (Outside our 20km Jamshedpur radius).</p>
            <p>Enter your email below and we'll notify you when we expand to your area.</p>
            <form onSubmit={handleEmailSubmit} className="modal-form">
              <input 
                type="email" 
                required 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Notify Me</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
