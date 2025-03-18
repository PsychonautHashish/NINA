import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '/src/shared/context/CartContext.jsx';
import { FaTimes } from 'react-icons/fa';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isExiting, setIsExiting] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  ).toFixed(2);

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(() => navigate('/'), 300);
  };

  return (
    <div className={`cart-page-container ${isExiting ? 'exiting' : ''}`}>
      <div className="cart-content">
        <h1 className="cart-title">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p className="empty-message">Your cart is empty</p>
            <button className="continue-shopping" onClick={handleContinue}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item-card">
                  <div className="item-image-container">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-title">{item.name}</h3>
                    <p className="item-price">${item.price}</p>
                    
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-number">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <p className="item-total">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  <button 
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="total-section">
                <h2>Order Total:</h2>
                <h2 className="total-price">${totalPrice}</h2>
              </div>
              
              <div className="cart-actions">
                <button className="continue-shopping" onClick={handleContinue}>
                  Continue Shopping
                </button>
                <button className="checkout-button">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;