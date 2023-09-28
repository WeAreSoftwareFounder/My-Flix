import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { MainView } from './components/Mainview/Mainview';
import { LoginView } from './components/Loginview/Loginview';
import { SignupView } from './components/Signupview/Signupview';
import { ProfileView } from './components/Profileview/Profile';
import { MovieCard } from './components/Moviecard/Moviecard';
import { MovieView } from './components/Movieview/MovieView';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/movies" element={<MovieCard />} />
          <Route path="/movieinfo" element={<MovieView />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

root.render(<App />);
