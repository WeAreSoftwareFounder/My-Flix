import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const handleMovieClick = (movie) => {
  setSelectedMovie(movie);
};

export const MovieCard = ({ movie, onMovieClick }) => {
  // Check if movie is defined and has the expected properties
  if (
    !movie ||
    !movie.Title ||
    !movie.Description ||
    !movie.ImagePath
  ) {
    return null; // Return null if the movie data is incomplete
  }

  return (
    <Card className="h-100 d-flex flex-column justify-content-between">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
      </Card.Body>
      <Button
        onClick={() => onMovieClick(movie)}
        variant="link"
        className="align-self-end"
      >
        Open
      </Button>

      <Button onClick={() => addToFavorites(movie)} variant="primary">
        Add to Favorites
      </Button>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
  }),
  onMovieClick: PropTypes.func,
  handleAddToFavorites: PropTypes.func.isRequired,  // NEW  PROP  TYPE  REQUIRED  FOR  ADD  TO  FAVORITES
  handleMovieClick: PropTypes.func.isRequired,  // NEW  PROP  TYPE  REQUIRED  FOR  MOVIE  CLICK
};
