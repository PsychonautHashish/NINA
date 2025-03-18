// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import './Header.css';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="brand">
          <span className="brand-primary">NINA</span>
          <span className="brand-sub">Telehealth</span>
        </Link>
        
        <nav className="main-nav">
          <NavLink to="/client/appointments">Appointments</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/pharmacy">Pharmacy</NavLink>
          {user && <NavLink to="/cart" className="cart-link">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">{user.cartItems?.length || 0}</span>
          </NavLink>}
        </nav>

        <div className="auth-section">
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <>
              <Link to="/ClientLogin" className="auth-link">Login</Link>
              <Link to="/ClientSignup" className="auth-button">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, children, ...props }) => (
  <Link 
    to={to} 
    className="nav-link"
    activeclassname="active"
    {...props}
  >
    {children}
  </Link>
);

const UserDropdown = ({ user }) => (
  <div className="user-dropdown">
    <button className="user-trigger">
      <Avatar user={user} />
      <span className="user-name">{user.firstName}</span>
      <i className="fas fa-chevron-down"></i>
    </button>
    <div className="dropdown-menu">
      <Link to="/profile" className="dropdown-item">Profile</Link>
      <Link to="/settings" className="dropdown-item">Settings</Link>
      <Link to="/logout" className="dropdown-item">Log Out</Link>
    </div>
  </div>
);

const Avatar = ({ user }) => (
  <div className="user-avatar">
    {user.avatarUrl ? (
      <img src={user.avatarUrl} alt={`${user.name}'s avatar`} />
    ) : (
      <span>{user.initials}</span>
    )}
  </div>
);

export default Header;