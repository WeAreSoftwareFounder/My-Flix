import React from 'react';
import PropTypes from 'prop-types';

export const ProfileView = ({ user }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Welcome, {user.Username}!</p>
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    // Add other user properties here as needed
  }),
};
