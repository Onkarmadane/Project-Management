import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import Navbar from './components/VerticalNav/VerticalNav'; // Adjust the path to your Navbar component
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardPage from './Pages/DashboardPage';
import BottomNav from './Components/BottomNav/BottomNav';
import VerticalNav from './Components/VerticalNav/VerticalNav';
import ProjectListing from './Pages/ProjectListing';
import CreateProjectPage from './Pages/CreateProjectPage';
import LoginPage from './Pages/LoginPage';

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

function App() {
  return (
    <div className="App" >
      {/* <LoginPage /> */}
      <Router>
        <VerticalNav />
        <BottomNav />
        <Routes>
          <Route path="/" element={<Navigate to="/DashboardPage" replace />} />
          <Route path="/DashboardPage" element={<DashboardPage />} />
          <Route path="/ProjectListing" element={<ProjectListing />} />
          <Route path="/CreateProjectPage" element={<CreateProjectPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
