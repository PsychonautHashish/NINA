import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        surname: '',
        username: '',
        gender: '',
        day: '',
        month: '',
        year: '',
        country: '',
        city: '',
        location: '',
        postalCode: '',
        occupation: '',
        email: '',
        personalContact: '',
        nextOfKinName: '',
        nextOfKinContact: '',
        bloodGroup: '',
        allergies: '',
        chronicDiseases: '',
        vaccinationHistory: '',
        password: '',
        confirmQuestion: '',
        confirmAnswer: '',
        idNumber: ''
    });

    const [isFading, setIsFading] = useState(false); // State to trigger fade transition
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem('users')) || [];
        userData.push(formData);
        localStorage.setItem('users', JSON.stringify(userData));
        navigate('/login');
    };

    const handleBackToHomepage = () => {
        setIsFading(true); // Trigger fade effect
        setTimeout(() => {
            navigate('/'); // Navigate after fade effect
        }, 500); // Match the duration of the fade-out animation
    };

    return (
        <form onSubmit={handleSubmit} className={isFading ? 'fade-out' : ''}>
            <h2>Sign Up</h2>
            
            {/* Part One */}
            <label>
                First Name:
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </label>
            <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </label>
            <label>
                Surname:
                <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
            </label>
            <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </label>

            {/* Gender */}
            <label>
                Gender:
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </label>

            {/* Date of Birth - With Dropdowns */}
            <label>
                Date of Birth:
                <select name="day" value={formData.day} onChange={handleChange} required>
                    <option value="">Day</option>
                    {/* Options for Day (1-31) */}
                    {[...Array(31)].map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                    ))}
                </select>
                <select name="month" value={formData.month} onChange={handleChange} required>
                    <option value="">Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                <select name="year" value={formData.year} onChange={handleChange} required>
                    <option value="">Year</option>
                    {/* Options for Year (2000-2025) */}
                    {[...Array(26)].map((_, i) => (
                        <option key={i+2000} value={i+2000}>{i+2000}</option>
                    ))}
                </select>
            </label>

            {/* Residence */}
            <label>
                Country:
                <input type="text" name="country" value={formData.country} onChange={handleChange} required />
            </label>
            <label>
                City:
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </label>
            <label>
                Location:
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </label>
            <label>
                Postal Code:
                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
            </label>

            {/* Occupation */}
            <label>
                Occupation:
                <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
            </label>

            {/* Contact Details */}
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
                Personal Contact:
                <input type="tel" name="personalContact" value={formData.personalContact} onChange={handleChange} required />
            </label>

            {/* Part Two - Next of Kin */}
            <label>
                Next of Kin Name:
                <input type="text" name="nextOfKinName" value={formData.nextOfKinName} onChange={handleChange} required />
            </label>
            <label>
                Next of Kin Contact:
                <input type="tel" name="nextOfKinContact" value={formData.nextOfKinContact} onChange={handleChange} required />
            </label>

            {/* Part Three - Medical Info */}
            <label>
                Blood Group:
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                    <option value="">Select Blood Group</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                </select>
            </label>
            <label>
                Allergies:
                <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} />
            </label>
            <label>
                Chronic Diseases:
                <input type="text" name="chronicDiseases" value={formData.chronicDiseases} onChange={handleChange} />
            </label>
            <label>
                Vaccination History:
                <input type="text" name="vaccinationHistory" value={formData.vaccinationHistory} onChange={handleChange} />
            </label>

            {/* Part Four - Security Info */}
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <label>
                Confirm Question (Favorite Food, Best Month, Favorite App):
                <input type="text" name="confirmQuestion" value={formData.confirmQuestion} onChange={handleChange} required />
            </label>
            <label>
                Confirm Answer:
                <input type="text" name="confirmAnswer" value={formData.confirmAnswer} onChange={handleChange} required />
            </label>
            <label>
                ID Number:
                <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
            </label>

            <button type="submit">Sign Up</button>
            <button type="button" onClick={handleBackToHomepage}>Back to Homepage</button>
        </form>
    );
};

export default Signup;
