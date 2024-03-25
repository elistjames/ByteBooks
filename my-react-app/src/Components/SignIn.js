//import React from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "./../index.css";
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';



const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        // for later to add db stuff and move to next page
    };

    return (
        <Card className="form-card">
            <Card.Body>
                <Card.Title className="form-header"> Sign In</Card.Title>
                {loginError && <div className="error-message">{loginError}</div>}
                <Form>
                    <Form.Group>
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control type="email" className="form-control" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="form-label">Password</Form.Label>
                        <Form.Control type="password" className="form-control" placeholder="Password" />
                    </Form.Group>

                    <Button className="form-submit-btn" type="submit">Sign In</Button>
                    <div className="text-center mt-3">
                        Don't have an account?
                        <Button className="form-toggle-btn" onClick={() => navigate('/register')}>
                            Register Here
                        </Button>
                    </div>

                </Form>
            </Card.Body>
        </Card >


    );

};

export default SignIn;
