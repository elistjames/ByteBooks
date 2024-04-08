//import React from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "./../../index.css";
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useSession } from "../SessionContext";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './Authentication.css';
import SignInController from "../../Controllers/SignInController";


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setUserRoleType, setUser, setId } = useSession();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!username || !password) {
            setLoginError('Please fill out all fields.');
            return;
            }
            const { token, permission, id } = await SignInController.signIn({ username, password });
            // localStorage.setItem('token', token);
            if (permission === 'ADMIN') {
                setUserRoleType('admin');
            } 
            if (permission === 'MEMBER') {
                setUserRoleType('member');
            }
            setUser(username);
            setId(id);
            navigate('/');
        } catch (error) {
            setLoginError('Invalid username or password.');
            console.error('Error:', error);
        }
    };
    const togglePasswordVisibility = () => {
            setShowPassword(!showPassword); // Toggle the state of password visibility
    };
    return (
        <Card className="form-card">
            <Card.Body>
                <Card.Title className="form-header"> Sign In</Card.Title>
                <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label className="form-label">Username</Form.Label>
                    <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="password-input">
                    <Form.Label className="form-label">Password</Form.Label>
                    <div className="input-with-icon">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            className="form-control password-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button variant="light" className="password-toggle-btn" onClick={togglePasswordVisibility}>
                            {showPassword ? <FiEye /> : <FiEyeOff />}
                        </Button>
                    </div>
                </Form.Group>
                    {loginError && <div className="error-message alert alert-danger">{loginError}</div>}

                    <Button className="form-submit-btn" type="submit">Sign In</Button>
                    <div className="text-center mt-3">
                        Don't have an account?
                        <Button className="form-toggle-btn" onClick={() => navigate('/register')}>
                            Sign Up
                        </Button>
                    </div>

                </Form>
            </Card.Body>
        </Card >


    );

};

export default SignIn;
