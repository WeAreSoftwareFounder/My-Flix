import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { MainView } from './components/Mainview/Mainview';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

root.render(<App />);
