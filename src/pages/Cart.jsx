import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, MessageCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatCurrency';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discount_price || item.price;
      const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/,/g, '')) : price;
      return total + (isNaN(numericPrice) ? 0 : numericPrice);
    }, 0);
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    
    let message = "Hello! I'd like to order the following items:\n\n";
    cartItems.forEach((item, index) => {
      const price = item.discount_price || item.price;
      message += `${index + 1}. ${item.name} - ₹${formatPrice(price)}\n`;
    });
    
    const pincode = localStorage.getItem('bhola_pincode') || '831006';
    const isFreeZone = !!pincode.match(/^83[12]\d{3}$/);

    message += `\n*Sub-total: ₹${formatPrice(calculateTotal())}*`;
    message += `\n*Delivery Pincode: ${pincode}*`;
    
    if (isFreeZone) {
      message += "\n\nPlease let me know the next steps for payment (Free Delivery Area).";
    } else {
      message += "\n\nCan you please tell me the exact freight/transport charge to my pincode?";
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919204775927?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">My Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={64} className="empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any furniture yet.</p>
            <Link to="/catalog" className="continue-shopping-btn">Explore Catalog</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((product) => (
                <div key={product.id} className="cart-item-card">
                  <Link to={`/product/${product.id}`} className="cart-item-img-link">
                    <img src={product.image_url || '/placeholder.jpg'} alt={product.name} />
                  </Link>
                  <div className="cart-item-details">
                    <span className="cart-item-category">{product.category}</span>
                    <Link to={`/product/${product.id}`} className="cart-item-name">{product.name}</Link>
                    <div className="cart-item-price">
                      ₹{formatPrice(product.discount_price || product.price)}
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(product.id)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Sub-total ({cartItems.length} items)</span>
                <span>₹{formatPrice(calculateTotal())}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                {localStorage.getItem('bhola_pincode') && !localStorage.getItem('bhola_pincode').match(/^83[12]\d{3}$/) ? (
                  <span className="text-orange" style={{ color: '#e65100', fontSize: '0.9rem' }}>Freight applies at checkout</span>
                ) : (
                  <span className="text-green" style={{ color: '#2e7d32' }}>Free (Local)</span>
                )}
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{formatPrice(calculateTotal())}</span>
              </div>
              
              <button className="btn-whatsapp-checkout" onClick={handleWhatsAppCheckout}>
                <MessageCircle size={20} /> Checkout via WhatsApp
              </button>
              <p className="checkout-hint">You will be redirected to WhatsApp to confirm your order.</p>
              
              <Link to="/catalog" className="btn-continue">
                Continue Shopping <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
