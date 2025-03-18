import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './shared/context/AuthContext';
import { CartProvider } from './shared/context/CartContext';


// Client Routes
import HomePage from './client/pages/HomePage';
import ClientLogin from './client/pages/ClientLogin';
import ClientSignup from './client/pages/ClientSignup';
import AppointmentsPage from './client/pages/AppointmentsPage';
import CartPage from './client/pages/Cart';
import ServicesPage from './client/pages/Services';
import PharmacyPage from './client/pages/PharmacyPage';
import ProductDetailsPage from './client/pages/ProductDetailsPage';
import AboutUs from './client/pages/AboutUs';
import ContactUs from './client/pages/ContactUs';
import MedicDetailPage from './client/pages/MedicalDetailPage';
import AppointmentsPage2 from './client/pages/AppointmentsPage2';
import ChronicDiseaseManagement from './client/pages/ChronicDiseaseManagement';
import CardiologyConsultations from './client/pages/CardiologyConsultations';

// Medic Routes
import MedicLogin from './admin/pages/MedicLogin';  // Add MedicLogin import
import MedicSignup from './admin/pages/MedicSignup'; // Add MedicSignup import
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminQueue from './admin/pages/AdminQueue';
import AdminAppointments from './admin/pages/AdminAppointments';
import AppointmentDetails from './admin/pages/AppointmentDetails';
import AdminSupport from './admin/pages/AdminSupport';
import PrivacyPolicy from './admin/pages/PrivacyPolicy';

import 'font-awesome/css/font-awesome.min.css';
import './styles/global.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            {/* Client Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/client/appointments" element={<AppointmentsPage />} />
            <Route path="/client/appointmentspage2" element={<AppointmentsPage2 />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/ClientLogin" element={<ClientLogin />} />
            <Route path="/ClientSignup" element={<ClientSignup />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/pharmacy" element={<PharmacyPage />} />
            <Route path="/client/medics/:id" element={<MedicDetailPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/chronic-disease-management" element={<ChronicDiseaseManagement />} />
            <Route path="/cardiology-consultations" element={<CardiologyConsultations />} />

            {/* Medic Routes */}
            <Route path="/medic/login" element={<MedicLogin />} /> {/* Medic Login */}
            <Route path="/medic/signup" element={<MedicSignup />} /> {/* Medic Signup */}
            <Route path="/admin/queue" element={<AdminQueue />} />
            <Route path="/admin/appointments" element={<AdminAppointments />} />
            <Route path="/admin/appointments/:id" element={<AppointmentDetails />} />
            <Route path="/admin/support" element={<AdminSupport />} />
            <Route path="/admin/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
