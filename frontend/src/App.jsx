// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register'; 
import About from './About'; 
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes> 
                <Route path="/" element={<Login />} /> 
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
};

export default App;
