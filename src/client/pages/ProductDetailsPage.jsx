// ProductDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  // Fetching product data based on the ID
  useEffect(() => {
    const fetchProduct = async () => {
      const products = JSON.parse(sessionStorage.getItem('products'));
      const product = products.find((p) => p.id === id);
      setProduct(product);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <div className="product-details">
      {product && (
        <>
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <div className="quantity-container">
            <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
            <p>{quantity}</p>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
        </>
      )}
    </div>
  );
};

export default ProductDetailsPage;
