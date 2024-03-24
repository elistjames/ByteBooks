//import React from 'react';
//import HeaderBar from './HeaderBar';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "./../index.css";


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient');
    const navigate = useNavigate(); // useNavigate instead of useHistory


    const navigateToSignIn = () => {
        navigate('/signin');
    };
    const handleSubmit = async (e) => {
        // for later to add db stuff and move to next page

    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>

                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            <div className="register-login-link">
                Already have an account?  <button onClick={navigateToSignIn}>Sign In</button>
            </div>
        </div>
    );

};

export default Register;