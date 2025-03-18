import React from 'react';
import './AdminSupport.css';  // Optional: add styles specific to this page

function AdminSupport() {
  return (
    <div className="admin-support">
      <h1>Support</h1>
      <p>If you need any help, feel free to contact us!</p>
      <Link to="/admin/dashboard">Back to Dashboard</Link>
    </div>
  );
}

export default AdminSupport;
