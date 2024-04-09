import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "./../../index.css";
import { Button, Card, Form } from 'react-bootstrap';
import { useSession } from "../SessionContext";
import RegisterController from '../../Controllers/RegisterController';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './Authentication.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

    const navigate = useNavigate();
    const { setUserRoleType, setUser, setId } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !confirmPassword) {
            setRegisterError('Please fill out all fields.');
            return;
        }
        if (username.length < 3) {
            setRegisterError('Username must be at least 3 characters long.');
            return;
        }
        if (password.length < 5) {
            setRegisterError('Password must be at least 5 characters long.');
            return;
        }
        if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            setRegisterError('Password must contain at least one letter and one digit.');
            return;
        }
        if (password !== confirmPassword) {
            setRegisterError('Passwords do not match.');
            return;
        }
        try {
            const userExists = await RegisterController.CheckUserExists(username);
            if (userExists) {
                setRegisterError('Username is already taken.');
                return;
            }
            const { token, id } = await RegisterController.Register({ username, password });
            setUserRoleType('member');
            setUser(username);
            setId(id);
            navigate('/');
        } catch (error) {
            setRegisterError(error.message);
        }
    };
    return (
        <Card className="form-card">
            <Card.Body>
                <Card.Title className="form-header">Sign Up</Card.Title>
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
                                type={passwordShown ? "text" : "password"}
                                className="form-control password-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="light" className="password-toggle-btn" onClick={() => setPasswordShown(!passwordShown)}>
                                {passwordShown ? <FiEye /> : <FiEyeOff />}
                            </Button>
                        </div>
                    </Form.Group>
                    <Form.Group className="password-input">
                        <Form.Label className="form-label">Confirm Password</Form.Label>
                        <div className="input-with-icon">
                            <Form.Control
                                type={confirmPasswordShown ? "text" : "password"}
                                className="form-control password-input"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button variant="light" className="password-toggle-btn" onClick={() => setConfirmPasswordShown(!confirmPasswordShown)}>
                                {confirmPasswordShown ? <FiEye /> : <FiEyeOff />}
                            </Button>
                        </div>
                    </Form.Group>
                    {registerError && <div className="error-message alert alert-danger">{registerError}</div>}
                    <Button className="form-submit-btn" type="submit">Sign Up</Button>
                    <div className="text-center mt-3">
                        Already have an account?
                        <Button className="form-toggle-btn" onClick={() => navigate('/signin')}>Sign In</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Register;
