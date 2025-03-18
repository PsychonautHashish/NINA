import React from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css'; // Add custom styles

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <header className="header">
        <h1 className="animated-title">Contact Us</h1>
      </header>
      <section className="contact-us-content">
        <h2 className="sub-title">Get in Touch</h2>
        <p className="animated-text">
          We would love to hear from you! If you have any questions or concerns, feel free to reach out to us.
        </p>
        <div className="contact-details">
          <h3 className="contact-info">Email:</h3>
          <p className="animated-text">support@ninahealth.com</p>
          <h3 className="contact-info">Phone:</h3>
          <p className="animated-text">+1 (800) 123-4567</p>
        </div>
        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </section>
    </div>
  );
};

export default ContactUs;
