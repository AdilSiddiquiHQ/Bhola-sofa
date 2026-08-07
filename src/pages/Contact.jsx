import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <h1 className="contact-title animate-fade-in">Get in Touch</h1>
          <p className="contact-subtitle">We would love to hear from you. Reach out for inquiries, custom orders, or support.</p>
        </div>
      </div>

      <section className="section">
        <div className="container contact-container">
          <div className="contact-info">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Contact Information</h2>
            
            <div className="info-item">
              <div className="info-icon">
                <MapPin size={24} />
              </div>
              <div className="info-text">
                <h3>Our Showroom</h3>
                <p>Mahato Para Rd, near Raja store<br />Islamnagar, Millatnagar, Jugsalai<br />Jamshedpur, Jharkhand 831006</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <Phone size={24} />
              </div>
              <div className="info-text">
                <h3>Phone</h3>
                <p>
                  <a href="tel:+919204775927" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-underline">+91 9204775927</a><br />
                  Mon-Sat: 9am - 8pm
                </p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <Mail size={24} />
              </div>
              <div className="info-text">
                <h3>Email</h3>
                <p>
                  <a href="mailto:hello@bholasofa.com" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-underline">hello@bholasofa.com</a><br />
                  <a href="mailto:support@bholasofa.com" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-underline">support@bholasofa.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-container glass">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Send a Message</h2>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="How can we help?" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Write your message here..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
