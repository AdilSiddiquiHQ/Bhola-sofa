import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Armchair } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <Armchair className="logo-icon" size={32} />
            <span>Bhola Sofa</span>
          </Link>
          <p className="footer-desc">
            Crafting comfort and luxury for your living spaces since 1978. Premium quality, modern design, and unmatched durability.
          </p>
        </div>

        <div className="footer-links">
          <h4 className="footer-title">Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalog">Our Collection</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4 className="footer-title">Contact Info</h4>
          <ul>
            <li>
              <MapPin size={18} style={{ flexShrink: 0, marginTop: '4px' }} /> 
              <a href="https://maps.app.goo.gl/iudo2jQm55maPJ8o9" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-underline">
                Mahato Para Rd, near Raja store, Islamnagar, Millatnagar, Jugsalai, Jamshedpur, Jharkhand 831006
              </a>
            </li>
            <li>
              <Phone size={18} style={{ flexShrink: 0, marginTop: '4px' }} /> 
              <a href="tel:+919204775927" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-underline">+91 9204775927</a>
            </li>
            <li>
              <Mail size={18} style={{ flexShrink: 0, marginTop: '4px' }} /> 
              <a href="mailto:hello@bholasofa.com" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-underline">hello@bholasofa.com</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Bhola Sofa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
