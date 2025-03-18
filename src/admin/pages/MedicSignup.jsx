import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/client/pages/Signup.css';

const MedicSignup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        gender: '',
        email: '',
        contact: '',
        medicalField: '', // Medical field of expertise
        yearsOfExperience: '', // Years of experience
        qualifications: '', // Qualifications
        password: '',
        confirmQuestion: '',
        confirmAnswer: '',
        licenseNumber: '', // Medical license number
    });

    const [isFading, setIsFading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Generate a unique NINA number
    const generateNinaNumber = () => {
        // Combine parts of the user's details and generate a unique ID
        const randomPart = Math.floor(Math.random() * 1000000); // Random 6-digit number
        const { firstName, lastName, email } = formData;
        const uniqueNina = `${firstName.substring(0, 3).toUpperCase()}-${lastName.substring(0, 3).toUpperCase()}-${randomPart}`;
        return uniqueNina;
    };

    // Generate a passkey for verification
    const generatePasskey = () => {
        // This passkey can be a combination of user data or just a random token
        const passkey = Math.random().toString(36).substr(2, 8); // Random 8 character passkey
        return passkey;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate NINA and passkey
        const ninaNumber = generateNinaNumber();
        const passkey = generatePasskey();

        // Add NINA and passkey to formData
        const userData = {
            ...formData,
            ninaNumber, // Store NINA number
            passkey, // Store passkey for further authentication
            role: 'medic' // Role of the user
        };

        // Save user data to localStorage (you can use a database if needed)
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        allUsers.push(userData);
        localStorage.setItem('users', JSON.stringify(allUsers));

        // Redirect to medic login page
        navigate('/medic/login');
    };

    const handleBackToHomepage = () => {
        setIsFading(true);
        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    return (
        <form onSubmit={handleSubmit} className={isFading ? 'fade-out' : ''}>
            <h2>Medic Sign Up</h2>

            {/* Personal Details */}
            <label>
                First Name:
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </label>
            <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </label>
            <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </label>
            <label>
                Gender:
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </label>

            {/* Contact Details */}
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
                Contact:
                <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
            </label>

            {/* Medical Information */}
            <label>
                Medical Field:
                <input type="text" name="medicalField" value={formData.medicalField} onChange={handleChange} required />
            </label>
            <label>
                Years of Experience:
                <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} required />
            </label>
            <label>
                Qualifications:
                <textarea name="qualifications" value={formData.qualifications} onChange={handleChange} required />
            </label>
            <label>
                Medical License Number:
                <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required />
            </label>

            {/* Security Information */}
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <label>
                Confirm Question (e.g., Favorite Medical Book):
                <input type="text" name="confirmQuestion" value={formData.confirmQuestion} onChange={handleChange} required />
            </label>
            <label>
                Confirm Answer:
                <input type="text" name="confirmAnswer" value={formData.confirmAnswer} onChange={handleChange} required />
            </label>

            <button type="submit">Sign Up</button>
            <button type="button" onClick={handleBackToHomepage}>Back to Homepage</button>
        </form>
    );
};

export default MedicSignup;
