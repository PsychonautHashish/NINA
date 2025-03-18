import React from 'react';
import './PrivacyPolicy.css';  // Optional: add styles specific to this page

function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <h1>Privacy Policy</h1>
      <p>Our privacy policy is available here...</p>
      <Link to="/admin/dashboard">Back to Dashboard</Link>
    </div>
  );
}

export default PrivacyPolicy;
