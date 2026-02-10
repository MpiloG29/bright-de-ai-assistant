import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TermsLibrary from './pages/TermsLibrary';
import Courses from './pages/Courses';
import Videos from './pages/Videos';
import Progress from './pages/Progress';
import './styles/App.css';
import './styles/colors.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/terms" element={<TermsLibrary />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/progress" element={<Progress />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;