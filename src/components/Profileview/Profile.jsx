import React from 'react';
import PropTypes from 'prop-types';

export const ProfileView = ({ user }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Welcome, {user.Username}!</p>
      {user.FavoriteMovies.map((movie) => (
        <div key={movie._id}>
          <p>{movie.Title}</p>
          <Button
            onClick={() => removeFromFavorites(movie)}
            variant="danger"
          >
            Remove from Favorites
          </Button>
        </div>
      ))}
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string,
    // Add other user properties here as needed
  }),
};
