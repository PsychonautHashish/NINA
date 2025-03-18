// /client/components/AppointmentCard.jsx
import React from 'react';

function AppointmentCard({ appointment }) {
  return (
    <div className="appointment-card">
      <h3>{appointment.doctorName}</h3>
      <p>{appointment.date} - {appointment.time}</p>
    </div>
  );
}

export default AppointmentCard;
