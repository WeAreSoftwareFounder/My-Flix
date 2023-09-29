import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
} from 'react-router-dom';
import { LoginView } from '../Loginview/Loginview';
import { SignupView } from '../Signupview/Signupview';
import { ProfileView } from '../Profileview/Profile';
import { MovieView } from '../Movieview/Movieview';
import { NavigationBar } from '../Navigation/Navigationbar,';
import { MovieCard } from '../Moviecard/Moviecard';
import { HomeView } from '../HomeView/Homeview';

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleLogin = (user, token) => {
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      // Fetch movies when the user is authenticated
      fetch('https://my-flixs-8361837988f4.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((moviesData) => {
          setMovies(moviesData);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    };
  }, [token, user]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    isAuthenticateds(false);
    setMovies([]);
  };

  const handleShowSignUp = () => {
    setShowSignUp(true);
  };

  const handleSignUpSuccess = () => {
    setShowSignUp(false);
  };

  return (
    <BrowserRouter>
      <div>
        <NavigationBar
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/signup" element={<SignupView />} />
          <Route
            path="/login"
            element={<LoginView onLoggedIn={handleLogin} />}
          />
          <Route
            path="/movies"
            element={
              isAuthenticated ? (
                <div>
                  {movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))
                  )}
                </div>
              ) : (
                // Redirect or display a message for non-authenticated users
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/movieinfo/:movieId" element={<MovieView />} />
          <Route
            path="/profile"
            element={<ProfileView user={user} />}
          />
          <Route path="/" element={<HomeView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
