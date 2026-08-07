import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Loader } from 'lucide-react';
import './Catalog.css';

import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

const Catalog = () => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title animate-fade-in">Our Collection</h1>
          <p className="catalog-subtitle">Explore our wide range of premium furniture designed for your comfort.</p>
        </div>
      </div>
      
      <div className="container section">
        <div className="catalog-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Sofas</button>
          <button className="filter-btn">Armchairs</button>
          <button className="filter-btn">Tables</button>
        </div>

        <div className="product-grid">
          {loading ? (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '5rem' }}><Loader className="spinner" /> Loading products...</div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '5rem' }}>No products found.</div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="product-image-container">
                    <img src={product.image_url || '/placeholder.jpg'} alt={product.name} className="product-image" />
                    <div className="product-actions" onClick={e => e.preventDefault()}>
                      <button className="icon-btn" onClick={() => toggleWishlist(product)}>
                        <Heart size={20} fill={isInWishlist(product.id) ? "red" : "none"} color={isInWishlist(product.id) ? "red" : "currentColor"} />
                      </button>
                      <button className="icon-btn"><ShoppingCart size={20} /></button>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-prices">
                      {product.discount_price ? (
                        <>
                          <span className="product-price">₹{product.discount_price}</span>
                          <span className="product-price-old" style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.8rem', marginLeft: '8px' }}>₹{product.price}</span>
                        </>
                      ) : (
                        <span className="product-price">₹{product.price}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
