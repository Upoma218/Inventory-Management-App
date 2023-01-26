import React from 'react';
import './Navbar.css';
import logo from '../../Assets/logo.png';
import icon from '../../Assets/icon.png';

const Navbar = () => {
    return (
        <div className='navbar'>
            <img src={logo} alt="" />
            <h3>Inventory Management</h3>
            <img src={icon} alt="" className='icon'/>
        </div>
    );
};

export default Navbar;