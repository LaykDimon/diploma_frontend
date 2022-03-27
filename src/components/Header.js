import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function logout() {
    localStorage.removeItem("userSession");
}

export default function Header() {
    return (
        <div className='header'>
            <div className='innerHeader'>
                <div className='logo'>
                    <h1><Link className='navLink' to="/analyzer">NASTY<span>TEXTY</span></Link></h1>
                </div>
                <ul className='navbar'>
                    <Link className='navLink' to="/signup"><li>Register</li></Link>
                    <Link className='navLink' to="/login"><li>Login</li></Link>
                    <Link to = '/analyzer' className='navLink' onClick={logout}><li>Logout</li></Link>
                </ul>
            </div>
        </div>
    );
}