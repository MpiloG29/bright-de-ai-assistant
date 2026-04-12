import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TermsLibrary from './pages/TermsLibrary';
import Courses from './pages/Courses';
import Videos from './pages/Videos';
import Progress from './pages/Progress';
import Scenarios from './pages/Scenarios';
import ConceptMap from './pages/ConceptMap';
import CaseStudies from './pages/CaseStudies';
import CodePlayground from './pages/CodePlayground';
import CareerTracker from './pages/CareerTracker';
import Community from './pages/Community';
import './styles/App.css';
import './styles/colors.css';
import './styles/features.css';

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
              <Route path="/scenarios" element={<Scenarios />} />
              <Route path="/concept-map" element={<ConceptMap />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/playground" element={<CodePlayground />} />
              <Route path="/career" element={<CareerTracker />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
