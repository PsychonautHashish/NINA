import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AppointmentsPage2.css';

const MedicCard = ({ medic }) => {
  const navigate = useNavigate();

  return (
    <div className="medic-card" onClick={() => navigate(`/client/medics/${medic.id}`)}>
      <img src={medic.photo} alt={medic.name} className="medic-photo" />
      <div className="medic-info">
        <h3>{medic.name}</h3>
        <p className="specialty">{medic.specialty}</p>
        <p className="location">{medic.location}</p>
        <button className="view-profile-btn">View Profile</button>
      </div>
    </div>
  );
};

const AppointmentsPage2 = () => {
  const [medics, setMedics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/medics.json')
      .then(response => response.json())
      .then(data => {
        setMedics(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1>Available Medical Professionals</h1>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>

      {loading ? (
        <p>Loading medics...</p>
      ) : (
        <div className="medics-grid">
          {medics.map(medic => (
            <MedicCard key={medic.id} medic={medic} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage2;