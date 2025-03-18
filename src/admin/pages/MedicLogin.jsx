import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/client/pages/Login.css';

const MedicLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFading, setIsFading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const medic = users.find((user) => user.username === username && user.password === password && user.role === 'medic');

        if (medic) {
            localStorage.setItem('currentUser', JSON.stringify(medic));
            navigate('/admin/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    const handleBackToHomepage = () => {
        setIsFading(true);
        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    return (
        <form onSubmit={handleSubmit} className={isFading ? 'fading' : ''}>
            <h2>Medic Login</h2>
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

export default MedicLogin;
