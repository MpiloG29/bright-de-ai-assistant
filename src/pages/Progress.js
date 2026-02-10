import React, { useState } from 'react';
import '../styles/components.css';

const Progress = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  const progressData = {
    week: {
      termsLearned: 12,
      hoursStudied: 8,
      quizzesTaken: 3,
      streak: 7
    },
    month: {
      termsLearned: 45,
      hoursStudied: 32,
      quizzesTaken: 12,
      streak: 30
    },
    allTime: {
      termsLearned: 156,
      hoursStudied: 120,
      quizzesTaken: 45,
      streak: 45
    }
  };

  const achievements = [
    { id: 1, name: 'Fast Learner', description: 'Learn 10 terms in one day', achieved: true },
    { id: 2, name: 'Quiz Master', description: 'Score 100% on 5 quizzes', achieved: true },
    { id: 3, name: 'Consistent Learner', description: '30-day streak', achieved: false },
    { id: 4, name: 'Course Completer', description: 'Finish 3 courses', achieved: false },
    { id: 5, name: 'Early Bird', description: 'Study 7 days in a row before 8 AM', achieved: false },
  ];

  const recentQuizzes = [
    { id: 1, name: 'ETL Fundamentals', score: 85, date: '2024-01-15' },
    { id: 2, name: 'SQL Basics', score: 92, date: '2024-01-12' },
    { id: 3, name: 'Data Modeling', score: 78, date: '2024-01-10' },
  ];

  return (
    <div className="progress-page">
      <div className="progress-header">
        <h2>Your Learning Progress</h2>
        <div className="time-range-selector">
          <button 
            className={`time-range-btn ${timeRange === 'week' ? 'active' : ''}`}
            onClick={() => setTimeRange('week')}
          >
            This Week
          </button>
          <button 
            className={`time-range-btn ${timeRange === 'month' ? 'active' : ''}`}
            onClick={() => setTimeRange('month')}
          >
            This Month
          </button>
          <button 
            className={`time-range-btn ${timeRange === 'allTime' ? 'active' : ''}`}
            onClick={() => setTimeRange('allTime')}
          >
            All Time
          </button>
        </div>
      </div>
      
      <div className="progress-overview-cards">
        <div className="progress-card">
          <div className="progress-card-icon">📚</div>
          <div className="progress-card-content">
            <span className="progress-card-number">{progressData[timeRange].termsLearned}</span>
            <span className="progress-card-label">Terms Learned</span>
          </div>
        </div>
        
        <div className="progress-card">
          <div className="progress-card-icon">⏱️</div>
          <div className="progress-card-content">
            <span className="progress-card-number">{progressData[timeRange].hoursStudied}</span>
            <span className="progress-card-label">Hours Studied</span>
          </div>
        </div>
        
        <div className="progress-card">
          <div className="progress-card-icon">📝</div>
          <div className="progress-card-content">
            <span className="progress-card-number">{progressData[timeRange].quizzesTaken}</span>
            <span className="progress-card-label">Quizzes Taken</span>
          </div>
        </div>
        
        <div className="progress-card">
          <div className="progress-card-icon">🔥</div>
          <div className="progress-card-content">
            <span className="progress-card-number">{progressData[timeRange].streak}</span>
            <span className="progress-card-label">Day Streak</span>
          </div>
        </div>
      </div>
      
      <div className="progress-details">
        <div className="progress-section">
          <h3>Achievements</h3>
          <div className="achievements-grid">
            {achievements.map(achievement => (
              <div 
                key={achievement.id} 
                className={`achievement-card ${achievement.achieved ? 'achieved' : 'locked'}`}
              >
                <div className="achievement-icon">
                  {achievement.achieved ? '🏆' : '🔒'}
                </div>
                <div className="achievement-content">
                  <h4>{achievement.name}</h4>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="progress-section">
          <h3>Recent Quiz Results</h3>
          <div className="quizzes-table">
            <table>
              <thead>
                <tr>
                  <th>Quiz Name</th>
                  <th>Score</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentQuizzes.map(quiz => (
                  <tr key={quiz.id}>
                    <td>{quiz.name}</td>
                    <td>
                      <span className={`score-badge ${quiz.score >= 90 ? 'excellent' : quiz.score >= 80 ? 'good' : 'average'}`}>
                        {quiz.score}%
                      </span>
                    </td>
                    <td>{quiz.date}</td>
                    <td>
                      <button className="retake-btn">Retake</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="progress-export">
        <button className="export-btn">Export Progress Report</button>
        <button className="share-btn">Share Progress</button>
      </div>
    </div>
  );
};

export default Progress;