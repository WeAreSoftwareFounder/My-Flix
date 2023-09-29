import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export const SignupView = ({ onSignup }) => {
  const [userData, setUserData] = useState({
    Username: '',
    Password: '', // Corrected field name to match the server
    Email: '',
    birthday: '',
  });
  const [submittedData, setSubmittedData] = useState(null); // Store submitted data
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    if (
      userData.Username.trim() === '' ||
      userData.Password.trim() === '' ||
      userData.Email.trim() === ''
    ) {
      setError('Please fill in all required fields.');
      return; // Exit early if validation fails
    }

    // Additional client-side validation (minimum length)
    if (userData.Username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    if (userData.Email.length < 3) {
      setError('Email must be at least 3 characters long.');
      return;
    }

    try {
      const response = await fetch(
        'https://my-flixs-8361837988f4.herokuapp.com/users',
        {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log('Signup successful');
        onSignup();
        // Note: Avoid storing passwords in client-side state for security reasons.
        // Instead, you should only store non-sensitive data like username, email, etc.
        // You should not include "Password" in the submittedData object.
        const { Username, Email, birthday } = userData;
        setSubmittedData({ Username, Email, birthday });
      } else {
        setError('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while signing up');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col xs={12} md={6}>
          <div>
            <h2>Signup</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  value={userData.Username}
                  onChange={handleChange}
                  required
                  minLength="3"
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password" // Corrected to "password"
                  name="Password" // Corrected field name to match the server
                  value={userData.Password} // Corrected field name to match the server
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  value={userData.Email}
                  onChange={handleChange}
                  required
                  minLength="3"
                />
              </Form.Group>
              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  name="birthday"
                  value={userData.birthday}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            {submittedData && (
              <div>
                <h3>Submitted Data:</h3>
                <p>Username: {submittedData.Username}</p>
                <p>Email: {submittedData.Email}</p>
                <p>Birthday: {submittedData.birthday}</p>
              </div>
            )}
            {error && <p>{error}</p>}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

SignupView.propTypes = {
  onSignup: PropTypes.func,
};
