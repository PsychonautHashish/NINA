import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminAppointments.css';  // Optional: add styles specific to this page

// Assuming the JSON file is in the src directory
import patientsData from '/src/client/data/patients.json';  // Adjust the path to where your file is located

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    patient: '',
    date: '',
    reason: '',
  });
  const [filteredPatients, setFilteredPatients] = useState([]); // Added filteredPatients state

  // Load appointments from localStorage when the component mounts
  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments'));
    if (savedAppointments) {
      setAppointments(savedAppointments);  // Set state to saved appointments
    }
  }, []);

  // Handle search query change and filter patients
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = patientsData.filter(patient =>
        patient.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPatients(filtered); // Update filteredPatients
    } else {
      setFilteredPatients([]); // Reset filtered patients when query is empty
    }
  };

  // Handle selecting a patient from the search results
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery(patient.name); // Set search query to the selected patient's name
    setFilteredPatients([]); // Clear filtered list to close the dropdown
  };

  // Handle appointment scheduling
  const handleScheduleAppointment = () => {
    // Validate form inputs
    let hasError = false;
    const errors = { patient: '', date: '', reason: '' };

    if (!selectedPatient) {
      errors.patient = 'Please select a patient.';
      hasError = true;
    }
    if (!appointmentDate) {
      errors.date = 'Please select a date for the appointment.';
      hasError = true;
    }
    if (!appointmentReason) {
      errors.reason = 'Please provide a reason for the appointment.';
      hasError = true;
    }

    setErrorMessage(errors);

    if (hasError) return;

    // If all fields are valid, add the appointment
    const newAppointment = {
      id: appointments.length + 1,
      patientName: selectedPatient.name,
      date: appointmentDate,
      reason: appointmentReason,
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);

    // Save the appointments to localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    // Clear the form after scheduling
    setSelectedPatient(null);
    setAppointmentDate('');
    setAppointmentReason('');
    setErrorMessage({ patient: '', date: '', reason: '' });
  };

  // Remove an appointment
  const handleRemoveAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);

    // Save the updated appointments to localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  return (
    <div className="admin-appointments">
      <h1>Upcoming Appointments</h1>

      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            <h3>{appointment.patientName}</h3>
            <p>{new Date(appointment.date).toLocaleDateString()}</p>
            <p>{appointment.reason}</p>
            <button onClick={() => handleRemoveAppointment(appointment.id)}>Delete Appointment</button>
            <Link to={`/admin/appointments/${appointment.id}`}>View Details</Link>
          </li>
        ))}
      </ul>

      {/* Search bar with dropdown for filtering patients */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a patient..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && filteredPatients.length > 0 && (
          <div className="dropdown">
            <ul>
              {filteredPatients.map(patient => (
                <li key={patient.id} onClick={() => handlePatientSelect(patient)}>
                  {patient.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {searchQuery && filteredPatients.length === 0 && !selectedPatient && (
          <div className="no-results">No results found</div>
        )}
      </div>

      {/* Display selected patient info */}
      {selectedPatient && (
        <div className="appointment-form">
          <h2>Schedule Appointment for {selectedPatient.name}</h2>

          {/* Date input field with error message */}
          <label>
            Date:
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
            {errorMessage.date && <div className="error-message">{errorMessage.date}</div>}
          </label>

          {/* Reason input field with error message */}
          <label>
            Reason:
            <input
              type="text"
              value={appointmentReason}
              onChange={(e) => setAppointmentReason(e.target.value)}
            />
            {errorMessage.reason && <div className="error-message">{errorMessage.reason}</div>}
          </label>

          <button onClick={handleScheduleAppointment}>Schedule Appointment</button>
        </div>
      )}

      <Link to="/admin/dashboard">Back to Dashboard</Link>
    </div>
  );
}

export default AdminAppointments;
