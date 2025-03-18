import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './AppointmentDetails.css';  // Optional: add styles specific to this page

function AppointmentDetails() {
  const { id } = useParams(); // Get appointment ID from URL params
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    // Simulate fetching appointment details (Replace with API call in real app)
    const fetchAppointmentDetails = async () => {
      const mockAppointment = { 
        id: id,
        patientName: 'John Doe',
        date: '2025-03-10',
        reason: 'Routine Checkup',
        details: 'Patient is experiencing mild discomfort in the abdominal area.',
      };
      setAppointment(mockAppointment);
    };

    fetchAppointmentDetails();
  }, [id]);

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="appointment-details">
      <h1>Appointment Details</h1>
      <h2>{appointment.patientName}</h2>
      <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
      <p><strong>Reason:</strong> {appointment.reason}</p>
      <p><strong>Details:</strong> {appointment.details}</p>
      <Link to="/admin/appointments">Back to Appointments</Link>
    </div>
  );
}

export default AppointmentDetails;
