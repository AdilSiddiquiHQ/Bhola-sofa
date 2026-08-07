import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, MapPin, Menu, X, ChevronDown, Edit2 } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pincode, setPincode] = useState('831006');
  const [isEditingPincode, setIsEditingPincode] = useState(false);
  const [tempPincode, setTempPincode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');

  // Validate pincode on load if it's 831006 (default) to show modal? 
  // No, 831006 is valid.
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
          <span>5% Instant Discount with HDFC Bank Credit/Debit Card EMI | 2% Cashback on UPI Payments | Shop Now!</span>
          <span>5% Instant Discount with HDFC Bank Credit/Debit Card EMI | 2% Cashback on UPI Payments | Shop Now!</span>
          <span>5% Instant Discount with HDFC Bank Credit/Debit Card EMI | 2% Cashback on UPI Payments | Shop Now!</span>
          <span>5% Instant Discount with HDFC Bank Credit/Debit Card EMI | 2% Cashback on UPI Payments | Shop Now!</span>
        </div>
      </div>

      {/* 2. Secondary Utility Header */}
      <div className="utility-header">
        <div className="container utility-container">
          <div className="utility-left">
            <MapPin size={14} className="pin-icon" /> 
            <span className="deliver-text">Deliver to -</span> 
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
          <div className="utility-right">
            <Link to="/about">About Us</Link>
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
            <input type="text" placeholder="Enter Keyword or Item" />
            <button className="search-btn"><Search size={18} /></button>
          </div>

          <div className="header-logo">
            <Link to="/">
              <span className="logo-brand">BHOLA SOFA</span>
            </Link>
          </div>

          <div className="header-actions">
            <Link to="#" className="action-item">
              <Heart size={22} />
              <span>WISHLIST</span>
            </Link>
            <Link to="#" className="action-item cart-item">
              <ShoppingCart size={22} />
              <span className="cart-badge">1</span>
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
           <input type="text" placeholder="Search..." />
        </div>
        <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/catalog" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Catalog</Link>
        <Link to="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
        <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
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
