import React, { useState, useEffect } from 'react';
import TermCard from '../components/TermCard';
import ProgressTracker from '../components/ProgressTracker';
import { dataEngineeringTerms } from '../data/termsData';
import { courses } from '../data/coursesData';
import '../styles/components.css';

const Dashboard = () => {
  const [dailyTerm, setDailyTerm] = useState(null);
  const [recentTerms, setRecentTerms] = useState([]);
  const [progress] = useState({
    termsMastered: 25,
    coursesCompleted: 40,
    recentActivities: [
      { time: '2 hours ago', text: 'Completed ETL Fundamentals quiz' },
      { time: 'Yesterday', text: 'Watched Data Pipeline tutorial' },
      { time: '2 days ago', text: 'Mastered 5 new terms' },
      { time: '1 week ago', text: 'Started Big Data course' }
    ]
  });

  useEffect(() => {
    // Set daily term
    const randomIndex = Math.floor(Math.random() * dataEngineeringTerms.length);
    setDailyTerm(dataEngineeringTerms[randomIndex]);
    
    // Set recent terms (last 3)
    setRecentTerms(dataEngineeringTerms.slice(0, 3));
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome to Your Data Engineering Journey</h2>
        <p>Your personalized learning dashboard</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-column">
          <div className="dashboard-card">
            <h3>Term of the Day</h3>
            {dailyTerm && <TermCard term={dailyTerm} />}
          </div>
          
          <div className="dashboard-card">
            <h3>Continue Learning</h3>
            {courses.slice(0, 2).map(course => (
              <div key={course.id} className="continue-course">
                <h4>{course.title}</h4>
                <div className="course-progress-small">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span>{course.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="dashboard-column">
          <div className="dashboard-card">
            <h3>Recent Terms</h3>
            {recentTerms.map(term => (
              <div key={term.id} className="recent-term">
                <span className="term-name">{term.term}</span>
                <span className="term-category">{term.category}</span>
              </div>
            ))}
          </div>
          
          <div className="dashboard-card">
            <ProgressTracker progress={progress} />
          </div>
        </div>
      </div>
      
      <div className="ai-assistant-section">
        <div className="ai-prompt-box">
          <h3>Ask the AI Assistant</h3>
          <textarea 
            placeholder="Type your data engineering question here..."
            className="ai-input"
            rows="3"
          ></textarea>
          <button className="ai-submit-btn">Get Explanation</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;