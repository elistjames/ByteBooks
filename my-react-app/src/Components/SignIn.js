//import React from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "./../index.css";



const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate(); // useNavigate instead of useHistory

    const navigateToRegister = () => {
        navigate('/register');
    };
    const handleSubmit = async (e) => {
        // for later to add db stuff and move to next page
    };

    return (
        <div>
            <h2>Sign In</h2>
            {loginError && <div className="error-message">{loginError}</div>}
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
                <button type="submit">Login</button>
            </form>
            <div className="register-login-link">
                Don't have an account? <button onClick={navigateToRegister}>Register Here</button>
            </div>
        </div>
    );

};

export default SignIn;
