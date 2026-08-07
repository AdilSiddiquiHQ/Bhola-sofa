import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { ChevronLeft, MessageCircle, Truck, ShieldCheck, Check } from 'lucide-react';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="product-loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="product-not-found">Product not found. <Link to="/catalog">Go back to catalog</Link></div>;
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappMessage = encodeURIComponent(`I'm interested in ${product.name} (${currentUrl})`);

  return (
    <div className="product-page-container">
      <div className="container">
        <Link to="/catalog" className="back-link"><ChevronLeft size={16} /> Back to Catalog</Link>
        
        <div className="product-grid">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image-container">
              <img src={product.image_url || '/placeholder.jpg'} alt={product.name} className="main-image" />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="product-details">
            <div className="product-category">{product.category}</div>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-price-section">
              {product.discount_price ? (
                <>
                  <span className="current-price">₹{product.discount_price}</span>
                  <span className="original-price">₹{product.price}</span>
                  <span className="discount-badge">Sale</span>
                </>
              ) : (
                <span className="current-price">₹{product.price}</span>
              )}
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description || 'Premium quality furniture made with authentic materials. Built to last.'}</p>
            </div>
            
            <div className="product-features-list">
              <div className="feature-row"><Check size={18} className="text-green"/> Premium Quality Materials</div>
              <div className="feature-row"><Check size={18} className="text-green"/> 5-Year Warranty on Frame</div>
              <div className="feature-row"><Check size={18} className="text-green"/> Customization Available</div>
            </div>

            <div className="product-trust-badges">
              <div className="trust-badge">
                <Truck size={24} />
                <span>Free Delivery in Jugsalai</span>
              </div>
              <div className="trust-badge">
                <ShieldCheck size={24} />
                <span>Secure Payment on Delivery</span>
              </div>
            </div>

            <div className="product-page-actions" style={{ marginTop: '2rem' }}>
              <a href={`https://wa.me/919204775927?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="btn-buy-now">
                <MessageCircle size={20} /> Buy via WhatsApp
              </a>
              <p className="action-hint">Clicking this will open WhatsApp to confirm your order.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
