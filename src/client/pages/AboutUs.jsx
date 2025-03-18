import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css'; // Add custom styles

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <header className="header">
        <h1 className="animated-title">About Us</h1>
      </header>
      <section className="about-us-content">
        <h2 className="sub-title">Who We Are</h2>
        <p className="animated-text">
          At NINA, we are committed to providing top-notch healthcare services to help you live a healthier life. Our platform connects you with trusted medical professionals who are dedicated to your well-being.
        </p>
        <h2 className="sub-title">Our Mission</h2>
        <p className="animated-text">
          Our mission is to make healthcare more accessible, convenient, and secure for everyone. Through telemedicine, we ensure that you can receive medical advice and treatment from the comfort of your home.
        </p>
        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
