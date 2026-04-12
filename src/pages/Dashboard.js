import { useState, useEffect } from 'react';
import TermCard from '../components/TermCard';
import ProgressTracker from '../components/ProgressTracker';
import { dataEngineeringTerms } from '../data/termsData';
import { courses } from '../data/coursesData';
import storageService from '../services/storageService';
import '../styles/components.css';

const dailyDigestItems = [
  { id: 1, type: 'tip', icon: '💡', title: 'Tip of the Day', body: 'Always define the grain of your fact table before designing any star schema. The grain determines everything downstream.' },
  { id: 2, type: 'trivia', icon: '🧠', title: 'Did You Know?', body: 'Apache Kafka was originally developed at LinkedIn in 2010 and open-sourced in 2011. It now processes trillions of events per day at companies like Netflix and Uber.' },
  { id: 3, type: 'concept', icon: '📖', title: 'Quick Concept', body: 'The difference between ETL and ELT: In ETL, data is transformed before loading. In ELT, raw data loads first and transforms happen inside the warehouse — which is why dbt is so popular in cloud-native stacks.' },
  { id: 4, type: 'quote', icon: '💬', title: 'Engineering Wisdom', body: '"Data pipelines are like plumbing. Nobody cares about them until they break." — Every data team ever. Build with monitoring from day one.' },
  { id: 5, type: 'challenge', icon: '🎯', title: 'Mini Challenge', body: 'Can you name 3 differences between a Data Lake and a Data Warehouse? Think about: structure, users, and typical tools used.' },
  { id: 6, type: 'tip', icon: '⚡', title: 'Performance Tip', body: 'In Spark, use filter() as early as possible in your transformation chain. Pushing filters to the source reduces the amount of data Spark has to shuffle across the cluster.' },
  { id: 7, type: 'trivia', icon: '📊', title: 'Industry Stat', body: 'According to the 2024 State of Data Engineering report, dbt usage grew 400% in 3 years. It\'s now mentioned in over 60% of analytics engineering job postings.' }
];

const recommendations = [
  { id: 1, type: 'course', icon: '🎓', title: 'ETL Fundamentals', reason: 'Most popular starting point for new DEs', action: '/courses', tag: 'Beginner' },
  { id: 2, type: 'term', icon: '📚', title: 'Learn: Delta Lake', reason: 'Hot skill — mentioned in 40% of DE job postings', action: '/terms', tag: 'Trending' },
  { id: 3, type: 'lab', icon: '🧪', title: 'Build Your First ETL Pipeline', reason: 'Hands-on practice is the fastest way to learn', action: '/scenarios', tag: 'Interactive' },
  { id: 4, type: 'case', icon: '🏢', title: 'Read: Real-Time Fraud Detection', reason: 'See how Kafka + Spark solve real production problems', action: '/case-studies', tag: 'Case Study' },
  { id: 5, type: 'career', icon: '🗺️', title: 'Set Your Career Goal', reason: 'Know where you\'re headed before you start learning', action: '/career', tag: 'Career' }
];

const getDailyDigestItem = () => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return dailyDigestItems[dayOfYear % dailyDigestItems.length];
};

const Dashboard = () => {
  const [dailyTerm, setDailyTerm] = useState(null);
  const [recentTerms, setRecentTerms] = useState([]);
  const [digestItem] = useState(getDailyDigestItem);
  const [digestRead, setDigestRead] = useState(false);
  const [storyMode, setStoryMode] = useState(false);

  const stats = storageService.getStatistics();

  const progress = {
    termsMastered: stats.totalTermsMastered,
    coursesCompleted: stats.totalCoursesEnrolled,
    recentActivities: storageService.getRecentActivity().map(a => ({
      time: new Date(a.time).toLocaleDateString(),
      text: a.message
    }))
  };

  useEffect(() => {
    const dayIdx = Math.floor(Date.now() / 86400000) % dataEngineeringTerms.length;
    setDailyTerm(dataEngineeringTerms[dayIdx]);
    setRecentTerms(dataEngineeringTerms.slice(0, 3));
    storageService.updateStreak();
  }, []);

  const digestTypeColor = { tip: '#4ecdc4', trivia: '#45b7d1', concept: '#ffd166', quote: '#a855f7', challenge: '#ff6b6b' };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome to Your Data Engineering Journey</h2>
        <p>Your personalized learning dashboard</p>
        <div className="header-badges">
          <span className="header-badge streak">🔥 {stats.currentStreak} day streak</span>
          <span className="header-badge xp">⭐ {(stats.totalTermsMastered * 20 + stats.totalQuizzesTaken * 40 + stats.totalCoursesEnrolled * 50 + stats.totalVideosWatched * 10)} XP</span>
        </div>
      </div>

      {/* Daily Data Digest */}
      <div className="daily-digest" style={{ borderLeft: `5px solid ${digestTypeColor[digestItem.type] || '#6366f1'}` }}>
        <div className="digest-header">
          <div className="digest-left">
            <span className="digest-icon">{digestItem.icon}</span>
            <div>
              <span className="digest-type-label" style={{ color: digestTypeColor[digestItem.type] }}>{digestItem.type.toUpperCase()}</span>
              <h3>{digestItem.title}</h3>
            </div>
          </div>
          <span className="digest-date">📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
        </div>
        <p className="digest-body">{digestItem.body}</p>
        {!digestRead && (
          <button className="digest-read-btn" onClick={() => setDigestRead(true)}>
            ✅ Got it! (+5 XP)
          </button>
        )}
        {digestRead && <span className="digest-done">✅ Read today's digest</span>}
      </div>

      {/* Storytelling Mode Toggle */}
      <div className="storytelling-banner">
        <div className="storytelling-text">
          <span className="storytelling-icon">📖</span>
          <div>
            <strong>Storytelling Mode</strong>
            <p>Learn concepts through real-world narratives instead of definitions</p>
          </div>
        </div>
        <label className="toggle-label">
          <input type="checkbox" checked={storyMode} onChange={() => setStoryMode(!storyMode)} />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-column">
          <div className="dashboard-card">
            <h3>Term of the Day</h3>
            {dailyTerm && (
              storyMode ? (
                <div className="story-term">
                  <h4>{dailyTerm.term}</h4>
                  <p className="story-narrative">
                    Imagine you're a data engineer at a coffee chain with 500 stores.
                    {dailyTerm.howToUse
                      ? ` ${dailyTerm.howToUse}`
                      : ` That's where ${dailyTerm.term} becomes essential — it helps you ${dailyTerm.definition?.toLowerCase()}`
                    }
                  </p>
                  <span className="story-label">📖 Storytelling Mode</span>
                </div>
              ) : (
                <TermCard term={dailyTerm} />
              )
            )}
          </div>

          <div className="dashboard-card">
            <h3>Continue Learning</h3>
            {courses.slice(0, 2).map(course => (
              <div key={course.id} className="continue-course">
                <h4>{course.title}</h4>
                <div className="course-progress-small">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
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

      {/* Personalized Recommendations */}
      <div className="recommendations-section">
        <h3>🎯 Recommended for You</h3>
        <p className="rec-subtitle">Based on your progress and career trends in data engineering</p>
        <div className="recommendations-grid">
          {recommendations.map(rec => (
            <a key={rec.id} href={rec.action} className="rec-card">
              <div className="rec-icon">{rec.icon}</div>
              <div className="rec-body">
                <span className="rec-tag">{rec.tag}</span>
                <strong>{rec.title}</strong>
                <p>{rec.reason}</p>
              </div>
              <span className="rec-arrow">→</span>
            </a>
          ))}
        </div>
      </div>

      <div className="ai-assistant-section">
        <div className="ai-prompt-box">
          <h3>🤖 Ask the AI Assistant</h3>
          <p>Use the AI Assistant in the sidebar to ask anything about data engineering.</p>
          <textarea
            placeholder="Type your data engineering question here..."
            className="ai-input"
            rows="3"
            disabled
          ></textarea>
          <p className="ai-hint">👈 Open the sidebar AI Assistant to get answers</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
