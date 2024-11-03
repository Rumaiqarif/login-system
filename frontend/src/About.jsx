import React from 'react';
import './App.css'
// import { useNavigate } from 'react-router-dom';

const About = () => {
    // const navigate = useNavigate();

    // const handleRoleSelect = (role) => {
    //     // Redirect based on role selected
    //     if (role === 'seller') {
    //         navigate('/seller-verification');
    //     } else {
    //         navigate('/buyer-services');
    //     }
    // };

    return (
        <div>
            
            <h2 className='role'>Select Your Role</h2>
            <button  className='i-seller'/*onClick={() => handleRoleSelect('seller')}*/>I am   Seller</button>
            <button  className='i-buyer'/*onClick={() => handleRoleSelect('buyer')}*/>I am  Buyer</button>
        </div>
    );
};

export default About;
