import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="header">
            <button onClick={handleLoginClick}>Login</button>
        </div>
    );
}

export default Header;