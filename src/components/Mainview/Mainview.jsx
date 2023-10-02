import React, {useState, useEffect} from 'react';
import {Col} from 'react-bootstrap';
import {
  Route,
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import {LoginView} from '../Loginview/Loginview';
import {SignupView} from '../Signupview/Signupview';
import {ProfileView} from '../Profileview/Profile';
import {MovieView} from '../Movieview/Movieview';
import {NavigationBar} from '../Navigation/Navigationbar,';
import {MovieCard} from '../Moviecard/Moviecard';
import {HomeView} from '../HomeView/Homeview';

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated before fetching movies
    if (isAuthenticated) {
      fetch('https://my-flixs-8361837988f4.herokuapp.com/movies', {
        headers: {Authorization: `Bearer ${token}`},
      })
          .then((response) => {
            if (response.status === 401) {
            // Handle the Unauthorized (401) error here
            // You can display an error message or take any other appropriate action
              throw new Error('Unauthorized');
            }
            return response.json();
          })
          .then((moviesData) => {
            setMovies(moviesData);
          })
          .catch((error) => {
            if (error.message === 'Unauthorized') {
            // Handle the Unauthorized error here (e.g., show an error message)
              console.error('Unauthorized error:', error);
            } else {
              console.error('Fetch error:', error);
            }
          });
    }
  }, [token, user, isAuthenticated]);

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    isAuthenticated(false);
    setMovies(null);
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
              <div>
                {movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  movies.map((movie) => (
                    <Col className="mb-4" key={movie._id} md={3}>
                      <MovieCard
                        movie={movie}
                        handleMovieClick={selectedMovie}
                      />
                    </Col>
                  ))
                )}
              </div>
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
