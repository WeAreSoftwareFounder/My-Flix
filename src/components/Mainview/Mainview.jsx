import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate, Route } from 'react-router-dom';
import { LoginView } from '../Loginview/Loginview';
import { MovieView } from '../Movieview/MovieView';
import { MovieCard } from '../Moviecard/Moviecard';
import { SignupView } from '../Signupview/Signupview';
import { NavigationBar } from '../Navigation/Navigationbar,';

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = JSON.parse(localStorage.getItem('token'));

    if (!token || !user) {
      return;
    }

    fetch('https://my-flixs-8361837988f4.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [token, user]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const handleShowSignUp = () => {
    setShowSignUp(true);
  };

  const handleSignUpSuccess = () => {
    setShowSignUp(false);
  };

  // Use the navigate function from useNavigate
  const navigate = useNavigate();

  return (
    <Row>
      <Col>
        <NavigationBar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        {!user && !token ? (
          <>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            <Button onClick={handleShowSignUp}>Sign Up</Button>
            {showSignUp && (
              <SignupView onSignup={handleSignUpSuccess} />
            )}
          </>
        ) : (
          <>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onBackClick={handleBackClick}
              />
            ) : (
              <>
                <Button onClick={handleLogout}>Logout</Button>
                {/* Render your movies list directly */}
                {movies.length === 0 ? (
                  <div>The list is empty!</div>
                ) : (
                  <Row>
                    {movies.map((movie) => (
                      <Col key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          onMovieClick={handleMovieClick}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </>
            )}
          </>
        )}
      </Col>
    </Row>
  );
};
