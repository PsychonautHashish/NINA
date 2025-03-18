import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate in react-router-dom v6
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFading, setIsFading] = useState(false); // State to trigger fade transition
    const navigate = useNavigate();  // Replace history with navigate

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            navigate('/home');  // Use navigate instead of history.push
        } else {
            alert('Invalid credentials');
        }
    };

    const handleBackToHomepage = () => {
        setIsFading(true); // Trigger fade effect
        setTimeout(() => {
            navigate('/'); // Navigate after fade effect
        }, 500); // Match the duration of the fade-out animation
    };

    return (
        <form onSubmit={handleSubmit} className={isFading ? 'fading' : ''}>
            <h2>Login</h2>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Login</button>
            <button type="button" onClick={handleBackToHomepage}>Back to Home</button>
        </form>
    );
};

export default Login;
