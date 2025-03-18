// /client/components/AppointmentCard.jsx
import React from 'react';

function AppointmentCard({ date, time, doctorName }) {
  return (
    <div className="appointment-card">
      <h3>{doctorName}</h3>
      <p>{date} - {time}</p>
    </div>
  );
}

export default AppointmentCard;
