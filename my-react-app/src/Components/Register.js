//import React from 'react';
//import HeaderBar from './HeaderBar';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "./../index.css";
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useSession } from "./SessionContext";


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient');
    const navigate = useNavigate();
    const { setUserRoleType } = useSession();



    const handleSubmit = async (e) => {
        // for later to add db stuff and move to next page
        setUserRoleType('member');
        navigate("/")

    };

    return (
        <Card className="form-card">
            <Card.Body>
                <Card.Title className="form-header">Sign Up</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label className="form-label">Username</Form.Label>
                        <Form.Control type="text" className="form-control" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="form-label">Password</Form.Label>
                        <Form.Control type="password" className="form-control" placeholder="Password" />
                    </Form.Group>

                    <Button className="form-submit-btn" type="submit">
                        Sign Up
                    </Button>
                    <div className="text-center mt-3">
                        Already have an account?
                        <Button className="form-toggle-btn" onClick={() => navigate('/signin')}>
                            Sign In
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

};

export default Register;