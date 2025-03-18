// ServicesPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaStethoscope, FaPills, FaHeartbeat } from 'react-icons/fa';
import './Services.css'; // We'll create this CSS file

const servicesData = [
  {
    id: 1,
    title: 'General Consultation',
    description: '24/7 access to general practitioners for non-emergency medical advice',
    category: 'general',
    price: '$49',
    duration: '15-30 mins',
    image: 'src/client/assets/service-general.jpg'
  },
  {
    id: 2,
    title: 'Mental Health',
    description: 'Confidential sessions with licensed psychologists and psychiatrists',
    category: 'specialist',
    price: '$99',
    duration: '45-60 mins',
    image: 'src/client/assets/service-mental.jpg'
  },
  // Add more services as needed
];

function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    filterServices();
  }, [searchQuery, selectedCategory]);

  const filterServices = () => {
    let results = servicesData.filter(service => 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory !== 'all') {
      results = results.filter(service => service.category === selectedCategory);
    }

    setFilteredServices(results);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchParams({ q: e.target.value });
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content">
          <h1>Our Medical Services</h1>
          <p>Access specialized care from the comfort of your home</p>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search services..."
              className="service-search"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters">
          <button 
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <FaFilter /> All
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'general' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('general')}
          >
            <FaStethoscope /> General
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'specialist' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('specialist')}
          >
            <FaHeartbeat /> Specialists
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <section className="services-grid">
        {filteredServices.length > 0 ? (
          filteredServices.map(service => (
            <div key={service.id} className="service-card">
              <div className="card-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="card-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-meta">
                  <span className="price">{service.price}</span>
                  <span className="duration">{service.duration}</span>
                </div>
                <Link to={`/book/${service.id}`} className="cta-btn">
                  Book Now
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No services found matching your criteria</h3>
            <button 
              className="clear-filters"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Specialty Section */}
      <section className="specialty-section">
        <h2>Specialized Care</h2>
        <div className="specialty-grid">
          <Link to="/chronic-disease-management" className="specialty-card">
            <FaPills className="specialty-icon" />
            <h3>Chronic Disease Management</h3>
            <p>Personalized care plans for diabetes, hypertension, and more</p>
          </Link>
          <Link to="/cardiology-consultations" className="specialty-card">
            <FaHeartbeat className="specialty-icon" />
            <h3>Cardiology Consultations</h3>
            <p>Expert heart health assessments and monitoring</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;