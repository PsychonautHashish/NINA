import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '/src/shared/context/CartContext.jsx';
import './PharmacyPage.css';

const PharmacyPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (criteria) => {
    const sorted = [...filteredProducts].sort((a, b) =>
      criteria === 'price' ? a.price - b.price : a.name.localeCompare(b.name)
    );
    setFilteredProducts(sorted);
  };

  return (
    <div className="pharmacy-container">
      <header className="pharmacy-header">
        <h1 className="pharmacy-title">Pharmacy Store</h1>
        
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medications..."
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-button" onClick={handleSearch}>
              <FaSearch className="search-icon" />
            </button>
          </div>
          
          <Link to="/cart" className="cart-link">
            <FaShoppingCart className="cart-icon" />
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </Link>
        </div>

        <div className="sort-controls">
          <button 
            className="sort-btn"
            onClick={() => handleSort('price')}
          >
            Price ⇅
          </button>
          <button 
            className="sort-btn"
            onClick={() => handleSort('name')}
          >
            A-Z ⇅
          </button>
        </div>
      </header>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="card-image-container">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="product-image"
              />
            </div>
            
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <p className="product-price">${product.price}</p>
                <div className="product-actions">
                  <Link 
                    to={`/product/${product.id}`}
                    className="details-button"
                  >
                    Details
                  </Link>
                  <button 
                    className="add-to-cart-button"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyPage;