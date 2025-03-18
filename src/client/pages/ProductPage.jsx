import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '/src/shared/context/CartContext.jsx';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch('/products.json');
      const products = await response.json();
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-page-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back to Products
      </button>
      
      <div className="product-detail-container">
        <div className="product-image-container">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="product-main-image"
          />
        </div>
        
        <div className="product-info-container">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price-large">${product.price}</p>
          <p className="product-description">{product.description}</p>
          
          <button 
            className={`add-to-cart-main ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
          >
            {isAdding ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;