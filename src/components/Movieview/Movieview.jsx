import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Image,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col xs={12} md={6}>
          <Card>
            <Card.Img
              src={`${movie.ImagePath}`}
              alt={`${movie.Title} poster`}
            />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>
                <strong>Directed By:</strong> {movie.Director.Name}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {movie.Description}
              </Card.Text>
              <Card.Text>
                <strong>Genre:</strong> {movie.Genre.Name}
              </Card.Text>
              <Button onClick={onBackClick} variant="primary">
                Back
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }),
  onBackClick: PropTypes.func,
};
