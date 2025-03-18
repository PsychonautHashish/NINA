// CardiologyConsultations.jsx
import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Services.css';

const CardiologyConsultations = () => (
  <div className="service-detail-page">
    <section className="services-hero cardio-hero">
      <div className="hero-content">
        <h1>Cardiology Consultations</h1>
        <p>Expert heart health assessments and preventive care</p>
      </div>
    </section>

    <section className="service-details">
      <div className="detail-content">
        <div className="detail-text">
          <h2><FaHeartbeat /> Cardiac Care Services</h2>
          <p>Comprehensive cardiovascular evaluations including:</p>
          <ul className="service-list">
            <li>Risk factor analysis</li>
            <li>Hypertension management</li>
            <li>Arrhythmia evaluation</li>
            <li>Heart failure management</li>
            <li>Post-operative cardiac care</li>
          </ul>

          <h3>Diagnostic Services</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <h4>EKG Interpretation</h4>
              <p>Remote analysis of cardiac rhythm recordings</p>
            </div>
            <div className="feature-card">
              <h4>Holter Monitoring</h4>
              <p>24-48 hour continuous heart monitoring</p>
            </div>
          </div>
        </div>

        <div className="booking-card">
          <h3>Schedule Consultation</h3>
          <p className="price">$199 initial consult</p>
          <p className="duration">60 minute comprehensive evaluation</p>
          <Link to="/book/cardiology" className="cta-btn">
            Book Cardiologist
          </Link>
        </div>
      </div>
    </section>

    {/* New contact section added here */}
    <section className="contact-promo">
      <div className="contact-promo-content">
        <h3>Have Cardiac Concerns?</h3>
        <p>Our cardiology team is available to discuss your heart health needs.</p>
        <Link to="/contact" className="cta-btn">
          Contact Cardiac Specialists
        </Link>
      </div>
    </section>
  </div>
);

export default CardiologyConsultations;