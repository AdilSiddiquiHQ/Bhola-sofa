import React, { useEffect } from 'react';
import './About.css';

const About = () => {
  useEffect(() => {
    // 1 & 3. SEO-Optimized Title and Meta Description
    document.title = "About Bhola Sofa | Best Furniture Manufacturer in Jamshedpur";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Discover the 45-year legacy of Bhola Sofa, Jamshedpur's premier furniture manufacturer. From Mr. MD Aslam's classic designs to Mr. Anwar's revival of the brand.";

    // 2. LocalBusiness Schema Markup (JSON-LD)
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FurnitureStore",
      "name": "Bhola Sofa",
      "telephone": "+91-9204775927",
      "description": "Premium furniture manufacturer in Jamshedpur with a 45-year legacy.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Islam Nagar, Mahato Para Road, Jugsalai",
        "addressLocality": "Jamshedpur",
        "addressRegion": "Jharkhand",
        "addressCountry": "IN"
      }
    };

    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      document.title = "Bhola Sofa";
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div className="about-page">
      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title animate-fade-in">Our Story</h1>
          <p className="about-subtitle">Crafting comfort for generations.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section story-section">
        <div className="container story-container">
          <div className="story-text">
            <h2 className="section-title" style={{ textAlign: 'left' }}>The Legacy of Bhola Sofa</h2>
            
            <h3 style={{color: 'var(--primary-color)', marginBottom: '10px', fontSize: '1.2rem'}}>The Roots of an Era (1978)</h3>
            <p>
              The story of Bhola Sofa doesn't begin in a modern factory, but in the hardworking heart of Jamshedpur in 1978. It was here that Mr. MD Aslam laid the foundation for what would become a legendary furniture business. Known affectionately across the city as "Bhola" because of his pure heart, innocent nature, and unwavering honesty, he was the true pioneer—the original "OG" of the city's furniture craft. He was famous throughout the region for his masterful beds, plush sofas, and elegant dining tables. For decades, a piece crafted by Bhola was not just furniture; it was a promise of unmatched quality and trust.
            </p>
            
            <h3 style={{color: 'var(--primary-color)', marginBottom: '10px', fontSize: '1.2rem', marginTop: '20px'}}>A Legacy Interrupted</h3>
            <p>
              When the time came for Mr. Aslam to leave this world, he left behind a massive legacy. However, in his absence, the original business was divided among friends. The names were changed, the original identity was diluted, and the distinct "Bhola" touch faded from the storefronts. His sons took different paths within the industry—one mastering wholesale, another navigating retail. The original empire slept, but the fire of its founder had not gone out.
            </p>

            <h3 style={{color: 'var(--primary-color)', marginBottom: '10px', fontSize: '1.2rem', marginTop: '20px'}}>The Rebirth (2026)</h3>
            <p>
              Legends never truly fade. For years, the eldest son, Mr. Anwar, had been working a demanding job in the Gulf. Eventually, feeling the toll of the years and a deep pull towards his roots, he realized his true calling wasn't overseas. Driven by deep respect and a desire to honor his father's memory, Mr. Anwar returned home in 2026 to resurrect <strong>Bhola Sofa</strong>. Today, the business operates with the exact same integrity and pure-hearted dedication that MD Aslam championed back in 1978. When you bring a Bhola Sofa into your home, you are taking home a piece of Jamshedpur's history, crafted by the son who refused to let his father's legacy die.
            </p>
          </div>
          <div className="story-image">
            {/* 4. Localized Image Alt Tag */}
            <img src="/hero.jpg" alt="Bhola Sofa Furniture Manufacturing Workshop in Jamshedpur" className="img-fluid rounded-shadow" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container stats-container">
          <div className="stat-item">
            <h3 className="stat-number">45+</h3>
            <p className="stat-label">Years of Legacy</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">3</h3>
            <p className="stat-label">Generations Served</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">100%</h3>
            <p className="stat-label">Craftsmanship</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">1978</h3>
            <p className="stat-label">Since</p>
          </div>
        </div>
      </section>

      {/* Local Map Embed for SEO */}
      <section className="section map-section">
        <div className="container">
          <h2 className="section-title">Visit Our Workshop</h2>
          <div className="map-container" style={{ borderRadius: '10px', overflow: 'hidden', height: '400px', width: '100%', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <iframe 
              src="https://maps.google.com/maps?q=Mahato%20Para%20Rd,%20near%20Raja%20store,%20Islamnagar,%20Millatnagar,%20Jugsalai,%20Jamshedpur,%20Jharkhand%20831006&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Bhola Sofa Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
