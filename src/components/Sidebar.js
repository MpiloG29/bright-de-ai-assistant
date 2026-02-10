import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AIService from '../services/aiService';
import StorageService from '../services/storageService';
import '../styles/components.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [aiQuestion, setAiQuestion] = useState('');
  const [showAIChat, setShowAIChat] = useState(false);

  const handleAskAI = async () => {
    if (aiQuestion.trim()) {
      setShowAIChat(true);
      const response = await AIService.askQuestion(aiQuestion);
      alert(`AI Assistant says: ${response.answer}\n\nConfidence: ${response.confidence.toFixed(1)}%`);
      setAiQuestion('');
    } else {
      setShowAIChat(!showAIChat);
    }
  };

  const handleTakeQuiz = () => {
    const topics = ['ETL', 'Data Warehousing', 'SQL', 'Python', 'General'];
    const topic = prompt(`Select a quiz topic:\n${topics.join(', ')}`, 'General');
    if (topic) {
      navigate('/progress');
      // Simulate quiz start
      setTimeout(() => {
        alert(`Starting ${topic} quiz! Check your Progress page for results.`);
      }, 500);
    }
  };

  const handleReviewBookmarks = () => {
    const bookmarks = StorageService.loadBookmarks();
    if (bookmarks.length > 0) {
      navigate('/progress');
      alert(`You have ${bookmarks.length} bookmarked items. Check your Progress page.`);
    } else {
      alert('No bookmarks yet! Bookmark items by clicking the bookmark button.');
    }
  };

  return (
    <aside className="sidebar">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search terms or courses..." 
          className="search-input"
          onChange={(e) => setAiQuestion(e.target.value)}
          value={aiQuestion}
        />
      </div>
      
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="nav-icon">🏠</span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/terms" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="nav-icon">📚</span>
              <span>Terms Library</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/courses" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="nav-icon">🎓</span>
              <span>Courses</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/videos" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="nav-icon">📹</span>
              <span>Video Tutorials</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/progress" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="nav-icon">📊</span>
              <span>Progress Tracker</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="quick-actions">
        <h4>Quick Actions</h4>
        <button 
          className="quick-action-btn"
          onClick={handleAskAI}
        >
          Ask AI Assistant
        </button>
        <button 
          className="quick-action-btn"
          onClick={handleTakeQuiz}
        >
          Take Quiz
        </button>
        <button 
          className="quick-action-btn"
          onClick={handleReviewBookmarks}
        >
          Review Bookmarks
        </button>
        
        {showAIChat && (
          <div className="ai-chat-prompt">
            <textarea 
              placeholder="Ask me anything about data engineering..."
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              rows="3"
            />
            <button onClick={handleAskAI}>Get Answer</button>
          </div>
        )}
      </div>
      
      <div className="sidebar-stats">
        <div className="stat-item">
          <span className="stat-label">Today's Goal</span>
          <span className="stat-value">3/5 terms</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Current Streak</span>
          <span className="stat-value">7 days 🔥</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;