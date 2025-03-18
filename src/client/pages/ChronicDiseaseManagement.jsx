// ChronicDiseaseManagement.jsx
import React from 'react';
import { FaPills } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Services.css';

const ChronicDiseaseManagement = () => (
  <div className="service-detail-page">
    <section className="services-hero chronic-hero">
      <div className="hero-content">
        <h1>Chronic Disease Management</h1>
        <p>Personalized care plans for long-term health conditions</p>
      </div>
    </section>

    <section className="service-details">
      <div className="detail-content">
        <div className="detail-text">
          <h2><FaPills /> Comprehensive Care Management</h2>
          <p>Our team provides continuous monitoring and customized treatment plans for:</p>
          <ul className="condition-list">
            <li>Diabetes (Type 1 & 2)</li>
            <li>Hypertension</li>
            <li>Chronic Kidney Disease</li>
            <li>COPD</li>
            <li>Autoimmune Disorders</li>
          </ul>
          
          <h3>Program Features</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <h4>Remote Monitoring</h4>
              <p>Weekly check-ins and biometric tracking through our secure platform</p>
            </div>
            <div className="feature-card">
              <h4>Medication Management</h4>
              <p>Expert review and adjustment of treatment regimens</p>
            </div>
          </div>
        </div>
        
        <div className="booking-card">
          <h3>Get Started</h3>
          <p className="duration">Includes weekly checkups</p>
          <Link to="/book/chronic" className="cta-btn">
            Start Management Plan
          </Link>
        </div>
      </div>
    </section>

    {/* New contact section added here */}
    <section className="contact-promo">
      <div className="contact-promo-content">
        <h3>Need Personalized Advice?</h3>
        <p>Our specialists are ready to help you manage your health journey.</p>
        <Link to="/contact" className="cta-btn">
          Contact Our Team
        </Link>
      </div>
    </section>
  </div>
);

export default ChronicDiseaseManagement;