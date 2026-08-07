import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, Bot, Heart, Star, Play, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ChatAssistant from '../components/ChatAssistant';
import './Home.css';

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.086 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [activeFaq, setActiveFaq] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8);
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // 1 & 2. Homepage SEO Title, Meta, and JSON-LD
    document.title = "Bhola Sofa | Premium Furniture Manufacturer in Jamshedpur";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Bhola Sofa - Jamshedpur's premier furniture manufacturer since 1978. Buy high-quality sofas, dining tables, and beds at unbeatable prices.";

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FurnitureStore",
      "name": "Bhola Sofa",
      "telephone": "+91-9204775927",
      "description": "Premium furniture manufacturer in Jamshedpur since 1978.",
      "url": "http://localhost:5173",
      "hasMap": "https://maps.app.goo.gl/iudo2jQm55maPJ8o9",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Mahato Para Rd, near Raja store, Islamnagar, Millatnagar, Jugsalai",
        "addressLocality": "Jamshedpur",
        "addressRegion": "Jharkhand",
        "postalCode": "831006",
        "addressCountry": "IN"
      }
    };

    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { question: "Do you offer free delivery?", answer: "Yes, we offer free delivery across all major cities for orders above ₹5,000. Our logistics partners ensure safe and timely transit of your premium furniture." },
    { question: "What is your return policy?", answer: "We provide a 7-day hassle-free return policy against any manufacturing defects or damages incurred during transit. Your satisfaction is our priority." },
    { question: "Can I customize the furniture dimensions?", answer: "Our international collection is precisely engineered for optimal ergonomics and structural integrity, so we currently do not offer bespoke dimensional customization." },
    { question: "How long does shipping typically take?", answer: "Most standard orders are processed and delivered within 5-7 business days depending on your specific pin code and the item's availability." }
  ];

  const testimonialsData = [
    { name: "Rahul Sharma", city: "Mango", review: "The recliner sofa I bought is incredibly comfortable and the delivery was prompt right to my doorstep.", image: "/rahul_testimonial.jpg" },
    { name: "Mohammed Tariq", city: "Jugsalai", review: "I had an amazing experience with Bhola Sofa. The furniture quality is great and looks premium.", image: "/mohammed_testimonial.jpg" },
    { name: "Gurpreet Singh", city: "Sakchi", review: "Very satisfied with the dining table set. It perfectly fits our space and the finish is excellent.", image: "/gurpreet_testimonial.jpg" },
    { name: "Rajesh Verma", city: "Bistupur", review: "Best place for home decor! The customer service was exceptional and the prices are unbeatable.", image: "/rajesh_testimonial.jpg" }
  ];

  useEffect(() => {
    const cycleTime = 3 * 60 * 60 * 1000;
    const updateTimer = () => {
      const now = new Date().getTime();
      const timePassed = now % cycleTime;
      const remainingTime = cycleTime - timePassed;
      
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);
  const heroBanners = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg'
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroBanners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1));
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="home-page">
      {/* Hidden H1 for SEO */}
      <h1 className="visually-hidden">Bhola Sofa - Premium Furniture Manufacturer in Jamshedpur</h1>

      {/* 1. Hero Slider */}
      <section className="hero-slider">
        <button className="slider-btn left" onClick={prevSlide}><ChevronLeft size={24} /></button>
        
        <div className="slides-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {heroBanners.map((banner, index) => (
            <div key={index} className="slide">
              <img 
                src={banner} 
                alt={`Hero Banner ${index + 1}`} 
                className="hero-banner-img"
                onError={(e) => {
                  // Fallback if the user hasn't named them correctly yet
                  e.target.onerror = null; 
                  e.target.src = '/hero.jpg';
                }}
              />
            </div>
          ))}
        </div>
        
        <button className="slider-btn right" onClick={nextSlide}><ChevronRight size={24} /></button>
        
        <div className="slider-dots">
          {heroBanners.map((_, index) => (
            <button 
              key={index} 
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* 2. Timer & Bank Offers Strip */}
      {/* 2. Timer & Bank Offers Strip */}
      <section className="offers-strip-custom">
        <div className="strip-container-custom">
          
          {/* Left Section: Countdown Timer */}
          <div className="strip-left-custom">
            <span className="deal-title-custom">LIMITED TIME DEAL:</span>
            <div className="timer-boxes-custom">
              <div className="time-box-custom"><strong>{String(timeLeft.hours).padStart(2, '0')}</strong><span>Hrs</span></div>
              <div className="time-box-custom"><strong>{String(timeLeft.minutes).padStart(2, '0')}</strong><span>Mins</span></div>
              <div className="time-box-custom"><strong>{String(timeLeft.seconds).padStart(2, '0')}</strong><span>Secs</span></div>
            </div>
          </div>

          <div className="strip-divider-custom"></div>

          {/* Middle-Left Section: Sale Badge & Offer */}
          <div className="strip-middle-left-custom">
            <div className="badge-custom">ROYAL FESTIVE SALE</div>
            <div className="discount-text-custom">Upto 70% OFF</div>
          </div>

          {/* Middle-Right Section: Discount Offer */}
          <div className="strip-middle-right-custom">
            <div className="discount-line1">5% Instant Discount</div>
            <div className="discount-line2">HDFC Bank Credit/Debit Card EMI</div>
            <div className="discount-line3"><strong>2% Cashback</strong> on UPI Payments</div>
          </div>

          {/* Right Section: Bank Logos & Terms */}
          <div className="strip-right-custom">
            <div className="bank-logos-container-custom">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg" alt="HDFC Bank" className="bank-logo-svg" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg" alt="SBI" className="bank-logo-svg" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg" alt="ICICI Bank" className="bank-logo-svg" />
              <span className="more-banks-custom">+More</span>
            </div>
            <div className="tc-text-custom">^T&C Min Purchase Of ₹5,000</div>
          </div>

        </div>
      </section>

      {/* 3. Features Strip */}
      <section className="features-strip">
        <div className="container features-container">
          <div className="feature-item">
            <img src="/feature-2.png" alt="10M+ customer" className="feature-img-icon" />
            <span>10M+ customer</span>
          </div>
          <div className="feature-item">
            <img src="/feature-international.png" alt="International Furniture" className="feature-img-icon" />
            <span>International Furniture</span>
          </div>
          <div className="feature-item">
            <img src="/feature-price-new.png" alt="Unbeatable Price" className="feature-img-icon" />
            <span>Unbeatable Price</span>
          </div>
          <div className="feature-item">
            <img src="/feature-1.png" alt="100% Secure Payment" className="feature-img-icon" />
            <span>100% Secure Payment</span>
          </div>
          <div className="feature-item">
            <img src="/feature-5.png" alt="No Cost EMI" className="feature-img-icon" />
            <span>No Cost EMI</span>
          </div>
        </div>
      </section>

      {/* 4. Promotional Banner */}
      <section className="promo-banner-section" style={{ paddingBottom: '4rem' }}>
        <div className="promo-banner" style={{ borderRadius: 0 }}>
          <img src="/promo-banner2.png" alt="Make Your Home Monsoon-Ready" className="promo-banner-img" style={{width: '100%', height: 'auto', display: 'block'}} />
        </div>
      </section>

      {/* 5. Latest Catalogue (Combined Best Sellers & Deals) */}
      <section className="product-section section bg-light-accent">
        <div className="container">
          <div className="section-header-custom text-center mb-40">
            <h2 className="section-title">Latest Catalogue</h2>
            <p className="section-subtitle">Discover our newest arrivals, top-rated best sellers, and exclusive limited time deals all in one place.</p>
          </div>
          <div className="product-grid">
            {products.length === 0 ? (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem' }}>No products found.</div>
            ) : (
              products.map((product) => (
                <div key={product.id} className="product-card">
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {product.discount_price && (
                      <div className="badge-discount">
                        {Math.round(((product.price - product.discount_price) / product.price) * 100)}% off
                      </div>
                    )}
                    <button className="wishlist-btn" onClick={(e) => e.preventDefault()}><Heart size={18} /></button>
                    <div className="product-img-wrap">
                      <img src={product.image_url || '/placeholder.jpg'} alt={product.name} />
                    </div>
                    <div className="product-details">
                      <span className="badge-bestseller">Trending</span>
                      <h3 className="product-title">{product.name}</h3>
                      <div className="product-pricing">
                        {product.discount_price ? (
                          <>
                            <span className="price-new">₹{product.discount_price}</span>
                            <span className="price-old">₹{product.price}</span>
                          </>
                        ) : (
                          <span className="price-new">₹{product.price}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
          <div className="view-more-container text-center mt-40">
            <Link to="/catalog" className="btn-view-more">View All Products</Link>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="testimonials-section section">
        <div className="container">
          <h2 className="section-title">What Customers Say About Bhola Sofa</h2>
          <div className="testimonials-grid">
            {testimonialsData.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="video-thumbnail">
                  <img src={testimonial.image} alt="Customer Video" />
                </div>
                <div className="testimonial-content">
                  <p>"{testimonial.review}"</p>
                  <div className="stars">
                    <Star size={16} fill="#c19a6b" color="#c19a6b" />
                    <Star size={16} fill="#c19a6b" color="#c19a6b" />
                    <Star size={16} fill="#c19a6b" color="#c19a6b" />
                    <Star size={16} fill="#c19a6b" color="#c19a6b" />
                    <Star size={16} fill="#c19a6b" color="#c19a6b" />
                  </div>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SEO Description Block */}
      <section className="seo-section section bg-white">
        <div className="container seo-container">
          <div className="seo-content">
            <h2>Experience Premium International Furniture at Unbeatable Prices</h2>
            <p>
              Transform your living spaces with Bhola Sofa's exclusive collection of modern, classic, and contemporary furniture. 
              Sourced globally, our meticulously crafted pieces offer a perfect blend of unparalleled comfort and top-tier aesthetic appeal. 
              Whether you are looking to revitalize your bedroom, upgrade your living room seating, or create a productive home office, 
              we provide high-quality solutions that fit every style and budget. With 100% secure payments, no-cost EMI options, 
              and a seamless delivery network covering over 10 million happy customers, Bhola Sofa stands as your ultimate destination for home decor.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="faq-section section">
        <div className="container">
          <h2 className="section-title text-center mb-30">Frequently Asked Questions</h2>
          <div className="faq-wrapper">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">
                    {activeFaq === index ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fab-container">
        <a href="tel:+919204775927" className="fab fab-phone"><Phone size={24} /></a>
        <a href="https://wa.me/919204775927" target="_blank" rel="noopener noreferrer" className="fab fab-whatsapp"><WhatsAppIcon /></a>
        <button onClick={() => setIsChatOpen(true)} className="fab fab-chat"><Bot size={24} /></button>
      </div>

      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Home;
