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
  const [pincode, setPincode] = useState(() => localStorage.getItem('bhola_pincode') || '831006');
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [tempPincode, setTempPincode] = useState(pincode);
  const [deliveryStatus, setDeliveryStatus] = useState(null); // 'free', 'paid', 'outside'
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
    if (!tempPincode || tempPincode.length !== 6) return;

    if (tempPincode.match(/^83[12]\d{3}$/)) {
      setDeliveryStatus('free');
    } else if (tempPincode.match(/^[8][123]\d{4}$/)) {
      setDeliveryStatus('paid');
    } else {
      setDeliveryStatus('outside');
    }
  };

  const confirmPincode = () => {
    setPincode(tempPincode);
    localStorage.setItem('bhola_pincode', tempPincode);
    setShowPincodeModal(false);
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
              <div 
                className="pincode-display" 
                onClick={() => {
                  setTempPincode(pincode);
                  setDeliveryStatus(null);
                  setShowPincodeModal(true);
                }}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '4px' }}
              >
                <span className="pincode-text" style={{ fontWeight: '600', textDecoration: 'underline' }}>{pincode}</span>
                <ChevronDown size={14} />
              </div>
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

      {/* Dynamic Pincode Modal */}
      {showPincodeModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <button className="modal-close" onClick={() => setShowPincodeModal(false)}><X size={20} /></button>
            <h3 style={{ marginBottom: '15px' }}>Check Delivery Availability</h3>
            <form onSubmit={handlePincodeSubmit} className="modal-form" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input 
                type="text" 
                maxLength="6"
                placeholder="Enter 6-digit Pincode" 
                value={tempPincode}
                onChange={(e) => {
                  setTempPincode(e.target.value.replace(/\\D/g, ''));
                  setDeliveryStatus(null);
                }}
                style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <button type="submit" style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Check</button>
            </form>

            {deliveryStatus === 'free' && (
              <div style={{ padding: '15px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '8px', marginBottom: '20px' }}>
                <strong style={{ display: 'block', marginBottom: '5px' }}>✅ Free Delivery Available!</strong>
                Your pincode is within our free delivery zone.
              </div>
            )}

            {deliveryStatus === 'paid' && (
              <div style={{ padding: '15px', background: '#fff3e0', color: '#e65100', borderRadius: '8px', marginBottom: '20px' }}>
                <strong style={{ display: 'block', marginBottom: '5px' }}>⚠️ Standard Delivery Available</strong>
                We deliver to your area in Jharkhand! Standard freight charges will apply based on distance.
              </div>
            )}

            {deliveryStatus === 'outside' && (
              <div style={{ padding: '15px', background: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '20px' }}>
                <strong style={{ display: 'block', marginBottom: '5px' }}>❌ Out of Service Area</strong>
                Sorry, our factory currently only services the state of Jharkhand.
              </div>
            )}

            {(deliveryStatus === 'free' || deliveryStatus === 'paid') && (
              <button 
                onClick={confirmPincode}
                style={{ width: '100%', padding: '12px', background: '#c19a6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Confirm Pincode
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
