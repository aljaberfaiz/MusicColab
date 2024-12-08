// src/components/HomePage.js
import React from 'react';
import {Container, Row, Col, Button, Card} from 'react-bootstrap'; // Using Bootstrap for layout and styling
import './HomePage.css'; // Add a CSS file for additional styles

const HomePage = () => {
    return (
        <Container fluid className="text-center my-5">
            <Row className="hero">
                <Col>
                    <h1 className="display-4">Welcome to MelodicMatch</h1>
                    <p className="lead">Connect with musicians and composers for collaborative projects.</p>
                    <Button variant="light" href="/register" size="lg" className="me-2">
                        Sign Up
                    </Button>
                    <Button variant="dark" href="/login" size="lg">
                        Log In
                    </Button>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h2>How It Works</h2>
                    <p>Find collaborators, create music, and grow your network.</p>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col xs={12} md={4}>
                    <Card className="feature-card">
                        <Card.Body>
                            <Card.Title>Collaborate</Card.Title>
                            <Card.Text>
                                Work together with musicians and composers to bring your music ideas to life.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className="feature-card">
                        <Card.Body>
                            <Card.Title>Connect</Card.Title>
                            <Card.Text>
                                Build lasting relationships with fellow artists in the music industry.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className="feature-card">
                        <Card.Body>
                            <Card.Title>Create</Card.Title>
                            <Card.Text>
                                Let your creativity shine and produce amazing music together.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
