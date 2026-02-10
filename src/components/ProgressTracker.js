import React from 'react';
import '../styles/components.css';

const ProgressTracker = ({ progress }) => {
  return (
    <div className="progress-tracker">
      <h3>Your Learning Progress</h3>
      <div className="progress-overview">
        <div className="progress-item">
          <div className="progress-label">Terms Mastered</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress.termsMastered}%` }}
            ></div>
          </div>
          <span className="progress-value">{progress.termsMastered}%</span>
        </div>
        
        <div className="progress-item">
          <div className="progress-label">Courses Completed</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress.coursesCompleted}%` }}
            ></div>
          </div>
          <span className="progress-value">{progress.coursesCompleted}%</span>
        </div>
      </div>
      
      <div className="recent-activity">
        <h4>Recent Activity</h4>
        <ul>
          {progress.recentActivities.map((activity, index) => (
            <li key={index}>
              <span className="activity-time">{activity.time}</span>
              <span className="activity-text">{activity.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgressTracker;