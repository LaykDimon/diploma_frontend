import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import { getUserSessionData } from '../extra/utils';

function isUserAuthenticated() {
    return localStorage.getItem("isAuthenticated");
}

function logout() {
    localStorage.clear("userSession");
    localStorage.setItem("isAuthenticated", false);
    window.location.reload(false);
}

export default function Header() {

    return (
        <div className='header'>
            <div className='innerHeader'>
                <div className='logo'>
                    <h1><Link className='navLink' to="/analyzer">NASTY<span>TEXTY</span></Link></h1>
                </div>
                <ul className='navbar'>
                    <Link className='navLink' to="/about"><li>Терміни</li></Link>
                    {JSON.parse(isUserAuthenticated()) 
                        ?   <>
                                <Link className='navLink' to='/profile'><li>{getUserSessionData()?.user.username}</li></Link>
                                <Link to = '/analyzer' className='navLink' onClick={logout}><li>Вихід</li></Link>
                            </>
                        :   <>
                                <Link className='navLink' to="/signup"><li>Реєстрація</li></Link>
                                <Link className='navLink' to="/login"><li>Вхід</li></Link>
                            </>     
                    } 
                    
                </ul>
            </div>
        </div>
    );
}