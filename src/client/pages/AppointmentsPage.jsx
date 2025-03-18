// /client/pages/AppointmentsPage.jsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../../shared/context/AuthContext';
import { formatDate } from '../../shared/utils/formatDate';
import './AppointmentsPage.css'; // External CSS for clean styling

function AppointmentsPage() {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState(user ? user.appointments : []);

  const tileClassName = ({ date, view }) => {
    const appointment = appointments.find(
      (appointment) => appointment.date === formatDate(date)
    );
    return appointment ? 'appointment' : '';
  };

  useEffect(() => {
    setAppointments(user ? user.appointments : []);
  }, [user]);

  return (
    <div className="appointments-page">
      <h1>Your Appointments</h1>
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={tileClassName}
        />
      </div>
      <p className="appointment-count">
        {appointments.length > 0
          ? `You have ${appointments.length} upcoming appointments.`
          : 'You have no upcoming appointments.'}
      </p>
    </div>
  );
}

export default AppointmentsPage;
