import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

const Register = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Helper function to validate phone number
    const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

    // Helper function to validate password
    const validatePassword = (password) => /^[A-Z].{6,}$/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Phone number and password validation
        if (!validatePhone(phone)) {
            setMessage("Phone number must be 10 digits.");
            return;
        }

        if (!validatePassword(password)) {
            setMessage("Password must start with an uppercase letter and be at least 7 characters long.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, password }),
            });
            const data = await response.json();

            if (data.message === 'Registration successful') {
                setMessage(data.message);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            setMessage('Error connecting to server');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register Here</h2>
            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="Enter 10-digit  phone number"
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password (e.g., Secure@123)"
                />
            </div>
            <button type="submit">Register</button>
            {message && <p className="invalid-msg">{message}</p>}

            <p className="login-link">
                Already have an account? <Link to="/">Go to Login</Link>
            </p>
        </form>
    );
};

export default Register;
