import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1 className="wishlist-title">My Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <Heart size={64} className="empty-icon" />
            <h2>Your wishlist is empty</h2>
            <p>Save items you love and they will show up here.</p>
            <Link to="/catalog" className="continue-shopping-btn">Explore Catalog</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((product) => (
              <div key={product.id} className="product-card wishlist-card">
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="product-image-container">
                    <img src={product.image_url || '/placeholder.jpg'} alt={product.name} className="product-image" />
                    <div className="product-actions" onClick={e => e.preventDefault()}>
                      <button className="icon-btn remove-btn" onClick={() => toggleWishlist(product)}>
                        <Trash2 size={20} />
                      </button>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
