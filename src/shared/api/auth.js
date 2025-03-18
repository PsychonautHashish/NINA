// /shared/api/auth.js
import axios from 'axios';

const API_URL = 'https://api.telemedicine.com';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const signup = async (email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password, role });
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};
