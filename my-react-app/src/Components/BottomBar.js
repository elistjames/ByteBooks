import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoHomeOutline, IoPersonOutline, IoBarChartOutline } from 'react-icons/io5';
import './../App.css';

const BottomBar = () => {
    const location = useLocation();
    const { pathname } = location;

    return (
        <div className="bottom-bar">
            <Link to="/profile" className={`nav-item${pathname === '/profile' ? ' active' : ''}`}>
                <IoPersonOutline />
            </Link>
            <Link to="/" className={`nav-item${pathname === '/' ? ' active' : ''}`}>
                <IoHomeOutline />
            </Link>
            <Link to="/admin" className={`nav-item${pathname === '/admin' ? ' active' : ''}`}>
                <IoBarChartOutline />
            </Link>
        </div>
    );
};

export default BottomBar;
