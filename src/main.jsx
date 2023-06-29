import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/homepage" element={<HomePage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);