// HomePage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import AppointmentCard from '../components/AppointmentCard';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';
import { FaSearch } from 'react-icons/fa';

// SearchSection component with services page integration
const SearchSection = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="search-section">
      <form className="search-bar-container" onSubmit={handleSearchSubmit}>
        <button type="submit" className="search-btn">
          <FaSearch size={20} color="#fff" />
        </button>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for healthcare services..." 
          className="search-bar" 
        />
      </form>
    </div>
  );
};

// Testimonials Section
const TestimonialsSection = () => (
  <section className="testimonials-section">
    <h2>What Our Clients Say</h2>
    <div className="testimonials">
      <div className="testimonial-card">
        <img src="src/client/assets/testimonial1.jpg" alt="Sarah K." className="testimonial-img" />
        <p>"Nina has revolutionized how I access healthcare. The process is easy, and the consultations are top-notch!"</p>
        <h4>- Sarah K.</h4>
      </div>
      <div className="testimonial-card">
        <img src="src/client/assets/testimonial2.jpg" alt="John D." className="testimonial-img" />
        <p>"I was able to get my prescription quickly, and the pharmacy section was so convenient!"</p>
        <h4>- John D.</h4>
      </div>
    </div>
  </section>
);

function HomePage() {
  const { user } = useAuth();
  const appointments = user ? user.appointments : [];
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();

  const handleVisitPharmacy = () => {
    setIsFading(true);
    setTimeout(() => navigate('/pharmacy'), 500);
  };

  return (
    <div className={`home-page ${isFading ? 'fade-out' : ''}`}>
      <header className="header">
        <div className="left-header">
          <h1 className="nina">NINA</h1>
        </div>
        <div className="right-header">
          <Link to="/" className="nav-btn">Home</Link>
          <Link to="/client/appointments" className="nav-btn">Appointments</Link>
          <Link to="/services" className="nav-btn">Services</Link>
          <Link to="/cart" className="nav-btn cart-btn">
            <i className="fas fa-shopping-cart"></i> Cart
          </Link>
          <Link to="/ClientLogin" className="nav-btn">Login</Link>
          <Link to="ClientSignup" className="nav-btn">Signup</Link>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <div className="text-container">
            <h2>Welcome, {user ? user.name : 'Guest'}</h2>
            <p>Your health is our priority. Take control today.</p>
            <div className="cta-buttons">
              <button className="btn btn-shadow-drop btn-shadow-drop--black">
                Start Your Consultation
              </button>
            </div>
          </div>
          <div className="image-container">
            <img 
              src="src/client/assets/pexels-louis-bauer-79024-249348.jpg" 
              alt="Medical professional" 
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <SearchSection />

      <section className="hero-section pharmacy-hero">
        <div className="hero-content">
          <div className="text-container-2">
            <p>Get your top-notch medical products from our pharmacy section.</p>
            <div className="cta-buttons">
              <button 
                className="btn btn-shadow-drop btn-shadow-drop--black"
                onClick={handleVisitPharmacy}
              >
                Visit Pharmacy
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Nina?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Convenient</h3>
            <p>Access healthcare from anywhere, at any time with our telemedicine platform.</p>
          </div>
          <div className="feature-card">
            <h3>Trusted Professionals</h3>
            <p>Consult with certified medical experts who are dedicated to your well-being.</p>
          </div>
          <div className="feature-card">
            <h3>Secure</h3>
            <p>Your privacy is important to us. All consultations are encrypted and confidential.</p>
          </div>
        </div>
      </section>

      <section className="schedule-section">
        <div className="text-container-2">
          <p>Book your appointments for medical consultations and treatments below.</p>
          <div className="cta-buttons">
            <Link to='/client/AppointmentsPage2' className="btn btn-shadow-drop btn-shadow-drop--black">
              Schedule Appointments
            </Link>
          </div>
        </div>
      </section>

      <div className="appointments-section">
        <h2>Upcoming Appointments</h2>
        {appointments.length > 0 ? (
          <div className="appointments-list">
            {appointments.map((appointment, idx) => (
              <AppointmentCard key={idx} appointment={appointment} />
            ))}
          </div>
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div>

      <TestimonialsSection />

      <footer className="footer">
        <div className="footer-links">
          <Link to="/about" className="footer-btn btn btn-slide-bottom btn-slide-bottom--orange">
            <span>About Us</span>
          </Link>
          <Link to="/contact" className="footer-btn btn btn-slide-bottom btn-slide-bottom--orange">
            <span>Contact Us</span>
          </Link>
        </div>
        <p>© 2025 NINA Company. All rights reserved.</p>
        <div className="social-links">
          <a href="#" className="social-icon" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-icon" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="social-icon" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;