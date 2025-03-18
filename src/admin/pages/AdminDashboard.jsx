import React, { useState, useEffect } from 'react';
import { useAuth } from '/src/shared/context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { LineChart, PieChart, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './AdminDashboard.css';
import { FaUserShield, FaClipboardList, FaChartLine, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

// Security Component for NINA Number
const NinaSecurity = ({ ninaNumber }) => {
  const [showNina, setShowNina] = useState(false);
  const [requiresVerification, setRequiresVerification] = useState(true);

  const handleReveal = () => {
    const password = prompt('Please enter your admin password to reveal NINA number:');
    // Here you would typically verify the password with your backend
    if (password) {
      setRequiresVerification(false);
      setShowNina(true);
      setTimeout(() => setShowNina(false), 5000); // Hide after 5 seconds
    }
  };

  return (
    <div className="nina-security">
      <h3>Your NINA Number</h3>
      <div className="nina-display">
        {showNina && !requiresVerification ? (
          <span className="nina-number">{ninaNumber}</span>
        ) : (
          <span className="nina-masked">••••-••••-{ninaNumber?.slice(-4)}</span>
        )}
        <button onClick={handleReveal} className="nina-reveal-btn">
          {showNina ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </div>
      <p className="security-warning">
        <FaUserShield /> Never share your NINA number with anyone
      </p>
    </div>
  );
};

// Analytics Section
const AnalyticsSection = ({ data }) => (
  <section className="analytics-section">
    <h2><FaChartLine /> Practice Analytics</h2>
    <div className="analytics-grid">
      <div className="chart-container">
        <h3>Monthly Consultations</h3>
        <LineChart width={500} height={300} data={data.consultations}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="consultations" stroke="#8884d8" />
        </LineChart>
      </div>
      <div className="chart-container">
        <h3>Patient Demographics</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={data.demographics}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#82ca9d"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  </section>
);

function AdminDashboard() {
  const { user, logout, loading } = useAuth(); // Destructure loading state
  const [analyticsData, setAnalyticsData] = useState({
    consultations: [],
    demographics: []
  });
  const [patientQueue, setPatientQueue] = useState([]);

  useEffect(() => {
    // Fetch analytics data (mock data for example)
    const fetchData = async () => {
      // In real app, replace with API call
      const mockConsultations = [
        { month: 'Jan', consultations: 65 },
        { month: 'Feb', consultations: 85 },
        // ... more data
      ];

      const mockDemographics = [
        { name: '18-30', value: 45 },
        { name: '31-45', value: 30 },
        // ... more data
      ];

      setAnalyticsData({
        consultations: mockConsultations,
        demographics: mockDemographics
      });
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;  // Display loading indicator while data is being fetched

  // Instead of redirecting if the user is null, we will now render a fallback if the user is not authenticated
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-left">
          <h1 className="nina">NINA <span>Medic Portal</span></h1>
        </div>
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="nav-btn"><FaClipboardList /> Dashboard</Link>
          <Link to="/admin/queue" className="nav-btn">Patient Queue</Link>
          <Link to="/admin/appointments" className="nav-btn">Appointments</Link>
          <button onClick={logout} className="nav-btn logout-btn">Logout</button>
        </nav>
      </header>

      <section className="admin-hero">
        <div className="hero-content">
          <div className="welcome-section">
            {user ? (
              <h2>Welcome, Dr. {user?.lastName}</h2>
            ) : (
              <h2>Welcome, Guest</h2>
            )}
            <div className="quick-stats">
              <div className="stat-card">
                <h3>Today's Appointments</h3>
                <p>12</p>
              </div>
              <div className="stat-card">
                <h3>Patients Waiting</h3>
                <p>3</p>
              </div>
              <div className="stat-card">
                <h3>Monthly Consultations</h3>
                <p>85</p>
              </div>
            </div>
          </div>
          {user && <NinaSecurity ninaNumber={user.ninaNumber} />}
        </div>
      </section>

      <AnalyticsSection data={analyticsData} />

      <section className="patient-queue">
        <h2>Current Patient Queue</h2>
        <div className="queue-list">
          {patientQueue.map((patient, index) => (
            <div key={patient.id} className="queue-item">
              <span className="queue-position">#{index + 1}</span>
              <div className="patient-info">
                <h4>{patient.name}</h4>
                <p>{patient.reason}</p>
              </div>
              <button className="start-consultation-btn">Start Consultation</button>
            </div>
          ))}
          {patientQueue.length === 0 && <p>No patients in queue</p>}
        </div>
      </section>

      <section className="recent-appointments">
        <h2>Upcoming Appointments</h2>
        <div className="appointments-grid">
          {user?.appointments?.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <h4>{appointment.patientName}</h4>
              <p>{new Date(appointment.date).toLocaleDateString()}</p>
              <p>{appointment.reason}</p>
              <div className="appointment-actions">
                <button className="btn-details">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="admin-footer">
        <p>© 2025 NINA Medical Portal. Secure HIPAA-compliant platform.</p>
        <div className="footer-links">
          <Link to="/admin/support">Support</Link>
          <Link to="/admin/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}

export default AdminDashboard;
