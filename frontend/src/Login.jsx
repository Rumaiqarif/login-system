import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const Login = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (password) => /^[A-Z].{6,}$/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            setMessage("Phone number must be 10 digits.");
            return;
        }

        if (!validatePassword(password)) {
            setMessage("Password must start with an uppercase letter and be at least 7 characters long.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, password }),
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            if (data.message === 'Login successful') {
                setMessage(data.message);
                navigate('/About');
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
            <h2>Login Here</h2>

            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            
            <div>
                <label>Password:</label>
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
        
                    />
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
            </div>

            <button type="submit">Login</button>

            {message && <p className='invalid-msg'>{message}</p>}

            {/* Link to Register page */}
            <p className="register-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </form>
    );
};

export default Login;
