import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MedicalDetailPage.css'; // Corrected import

const MedicDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medic, setMedic] = useState(null);

  useEffect(() => {
    fetch('/data/medics.json')
      .then(response => response.json())
      .then(data => {
        const foundMedic = data.find(m => m.id === parseInt(id));
        setMedic(foundMedic);
      });
  }, [id]);

  if (!medic) return <div>Loading...</div>;

  return (
    <div className="medic-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to List</button>
      <div className="medic-profile">
        <img src={medic.photo} alt={medic.name} className="profile-photo" />
        <div className="profile-info">
          <h1>{medic.name}</h1>
          <h2>{medic.specialty}</h2>
          <div className="details-section">
            <h3>Contact Information</h3>
            <p>Location: {medic.location}</p>
            <p>Email: {medic.contact}</p>
          </div>
          <div className="details-section">
            <h3>Professional Experience</h3>
            <p>Years of Experience: {medic.experience}</p>
            <p>Languages: {medic.languages.join(', ')}</p>
          </div>
          <div className="bio-section">
            <h3>About</h3>
            <p>{medic.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicDetailPage;
