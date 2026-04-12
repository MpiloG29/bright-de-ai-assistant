import React, { useState } from 'react';
import storageService from '../services/storageService';
import '../styles/components.css';

const DE_RANKS = [
  { id: 'data_intern', title: 'Data Intern', icon: '🌱', minXP: 0, maxXP: 200, color: '#94a3b8', description: 'Just starting your data engineering journey!' },
  { id: 'pipeline_apprentice', title: 'Pipeline Apprentice', icon: '🔧', minXP: 200, maxXP: 600, color: '#4ecdc4', description: 'Learning to build your first pipelines.' },
  { id: 'sql_craftsman', title: 'SQL Craftsman', icon: '🗄️', minXP: 600, maxXP: 1200, color: '#45b7d1', description: 'Strong fundamentals in data querying and modeling.' },
  { id: 'etl_engineer', title: 'ETL Engineer', icon: '⚙️', minXP: 1200, maxXP: 2500, color: '#ffd166', description: 'Building reliable data pipelines with confidence.' },
  { id: 'data_architect', title: 'Data Architect', icon: '🏛️', minXP: 2500, maxXP: 5000, color: '#ff9f1c', description: 'Designing scalable data architectures.' },
  { id: 'spark_master', title: 'Spark Master', icon: '⚡', minXP: 5000, maxXP: 10000, color: '#ff6b6b', description: 'Commanding distributed data processing.' },
  { id: 'data_legend', title: 'Data Legend', icon: '🏆', minXP: 10000, maxXP: Infinity, color: '#ffd700', description: 'A true master of the data engineering craft.' }
];

const ALL_BADGES = [
  { id: 'first_term', name: 'First Term', icon: '📚', description: 'Learned your first DE term', xp: 10, condition: (s) => s.totalTermsMastered >= 1 },
  { id: 'bookworm', name: 'Bookworm', icon: '🐛', description: 'Mastered 10 terms', xp: 50, condition: (s) => s.totalTermsMastered >= 10 },
  { id: 'term_expert', name: 'Term Expert', icon: '🎓', description: 'Mastered 25 terms', xp: 150, condition: (s) => s.totalTermsMastered >= 25 },
  { id: 'term_master', name: 'Term Master', icon: '🏆', description: 'Mastered 50 terms', xp: 300, condition: (s) => s.totalTermsMastered >= 50 },
  { id: 'first_quiz', name: 'Quiz Starter', icon: '📝', description: 'Took your first quiz', xp: 25, condition: (s) => s.totalQuizzesTaken >= 1 },
  { id: 'quiz_addict', name: 'Quiz Addict', icon: '🧠', description: 'Completed 5 quizzes', xp: 100, condition: (s) => s.totalQuizzesTaken >= 5 },
  { id: 'quiz_master', name: 'Quiz Master', icon: '👑', description: 'Completed 10 quizzes', xp: 200, condition: (s) => s.totalQuizzesTaken >= 10 },
  { id: 'enrolled', name: 'Course Enrolled', icon: '🎓', description: 'Enrolled in your first course', xp: 30, condition: (s) => s.totalCoursesEnrolled >= 1 },
  { id: 'course_collector', name: 'Course Collector', icon: '📦', description: 'Enrolled in 3 courses', xp: 80, condition: (s) => s.totalCoursesEnrolled >= 3 },
  { id: 'binge_watcher', name: 'Binge Watcher', icon: '📺', description: 'Watched 5 videos', xp: 40, condition: (s) => s.totalVideosWatched >= 5 },
  { id: 'video_junkie', name: 'Video Junkie', icon: '🎬', description: 'Watched 15 videos', xp: 120, condition: (s) => s.totalVideosWatched >= 15 },
  { id: 'streak_3', name: 'Hat Trick', icon: '🔥', description: '3-day learning streak', xp: 50, condition: (s) => s.currentStreak >= 3 },
  { id: 'streak_7', name: 'Week Warrior', icon: '⚔️', description: '7-day streak', xp: 150, condition: (s) => s.currentStreak >= 7 },
  { id: 'streak_30', name: 'Unstoppable', icon: '🌟', description: '30-day streak', xp: 500, condition: (s) => s.currentStreak >= 30 }
];

const getRank = (xp) => {
  return DE_RANKS.slice().reverse().find(r => xp >= r.minXP) || DE_RANKS[0];
};

const calcXP = (stats) => {
  return (stats.totalTermsMastered * 20) +
    (stats.totalQuizzesTaken * 40) +
    (stats.totalCoursesEnrolled * 50) +
    (stats.totalVideosWatched * 10) +
    (stats.currentStreak * 5);
};

const Progress = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');

  const stats = storageService.getStatistics();
  const totalXP = calcXP(stats);
  const currentRank = getRank(totalXP);
  const nextRank = DE_RANKS.find(r => r.minXP > totalXP);
  const xpToNext = nextRank ? nextRank.minXP - totalXP : 0;
  const rankProgress = nextRank
    ? Math.round(((totalXP - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100)
    : 100;

  const earnedBadges = ALL_BADGES.filter(b => b.condition(stats));
  const lockedBadges = ALL_BADGES.filter(b => !b.condition(stats));
  const badgeXP = earnedBadges.reduce((sum, b) => sum + b.xp, 0);

  const quizResults = storageService.getQuizResults();
  const avgScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((sum, q) => sum + q.score, 0) / quizResults.length)
    : 0;

  const progressData = {
    week: { termsLearned: Math.min(stats.totalTermsMastered, 12), hoursStudied: 8, quizzesTaken: Math.min(stats.totalQuizzesTaken, 3), streak: stats.currentStreak },
    month: { termsLearned: Math.min(stats.totalTermsMastered, 45), hoursStudied: 32, quizzesTaken: Math.min(stats.totalQuizzesTaken, 12), streak: stats.currentStreak },
    allTime: { termsLearned: stats.totalTermsMastered, hoursStudied: 120, quizzesTaken: stats.totalQuizzesTaken, streak: stats.currentStreak }
  };

  return (
    <div className="progress-page">
      <div className="progress-header">
        <h2>Your Learning Progress</h2>
        <div className="time-range-selector">
          {['week', 'month', 'allTime'].map(t => (
            <button
              key={t}
              className={`time-range-btn ${timeRange === t ? 'active' : ''}`}
              onClick={() => setTimeRange(t)}
            >
              {t === 'week' ? 'This Week' : t === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Rank Card */}
      <div className="rank-card" style={{ borderColor: currentRank.color, background: `linear-gradient(135deg, ${currentRank.color}22, white)` }}>
        <div className="rank-left">
          <span className="rank-icon-large">{currentRank.icon}</span>
          <div>
            <span className="rank-label">Current Rank</span>
            <h2 className="rank-title" style={{ color: currentRank.color }}>{currentRank.title}</h2>
            <p>{currentRank.description}</p>
          </div>
        </div>
        <div className="rank-right">
          <div className="xp-display">
            <span className="xp-total" style={{ color: currentRank.color }}>{totalXP.toLocaleString()} XP</span>
            {nextRank && (
              <span className="xp-to-next">{xpToNext} XP to {nextRank.title} {nextRank.icon}</span>
            )}
          </div>
          <div className="rank-progress-bar">
            <div className="rank-progress-fill" style={{ width: `${rankProgress}%`, background: currentRank.color }}></div>
          </div>
          <div className="level-badges">
            <span className="level-badge">Level {DE_RANKS.indexOf(currentRank) + 1} / {DE_RANKS.length}</span>
            <span className="badges-count">🏅 {earnedBadges.length} badges</span>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
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
        <div className="progress-card xp-card">
          <div className="progress-card-icon">⭐</div>
          <div className="progress-card-content">
            <span className="progress-card-number" style={{ color: currentRank.color }}>{totalXP}</span>
            <span className="progress-card-label">Total XP</span>
          </div>
        </div>
        <div className="progress-card">
          <div className="progress-card-icon">🎯</div>
          <div className="progress-card-content">
            <span className="progress-card-number">{avgScore || '--'}%</span>
            <span className="progress-card-label">Avg Quiz Score</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="progress-tabs">
        <button className={`progress-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          📊 Overview
        </button>
        <button className={`progress-tab ${activeTab === 'badges' ? 'active' : ''}`} onClick={() => setActiveTab('badges')}>
          🏅 Badges ({earnedBadges.length}/{ALL_BADGES.length})
        </button>
        <button className={`progress-tab ${activeTab === 'ranks' ? 'active' : ''}`} onClick={() => setActiveTab('ranks')}>
          🏆 Ranks
        </button>
        <button className={`progress-tab ${activeTab === 'quizzes' ? 'active' : ''}`} onClick={() => setActiveTab('quizzes')}>
          📝 Quiz History
        </button>
      </div>

      {/* OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="progress-details">
          <div className="xp-breakdown">
            <h3>⭐ XP Breakdown</h3>
            <div className="xp-items">
              {[
                { label: 'Terms Mastered', value: stats.totalTermsMastered * 20, icon: '📚', unit: `${stats.totalTermsMastered} terms × 20 XP` },
                { label: 'Quizzes Taken', value: stats.totalQuizzesTaken * 40, icon: '📝', unit: `${stats.totalQuizzesTaken} quizzes × 40 XP` },
                { label: 'Courses Enrolled', value: stats.totalCoursesEnrolled * 50, icon: '🎓', unit: `${stats.totalCoursesEnrolled} courses × 50 XP` },
                { label: 'Videos Watched', value: stats.totalVideosWatched * 10, icon: '📹', unit: `${stats.totalVideosWatched} videos × 10 XP` },
                { label: 'Streak Bonus', value: stats.currentStreak * 5, icon: '🔥', unit: `${stats.currentStreak} days × 5 XP` },
                { label: 'Badge Bonuses', value: badgeXP, icon: '🏅', unit: `${earnedBadges.length} badges earned` }
              ].map(item => (
                <div key={item.label} className="xp-item">
                  <span className="xp-item-icon">{item.icon}</span>
                  <div className="xp-item-details">
                    <span className="xp-item-label">{item.label}</span>
                    <span className="xp-item-unit">{item.unit}</span>
                  </div>
                  <span className="xp-item-value">+{item.value} XP</span>
                </div>
              ))}
            </div>
            <div className="xp-total-row">
              <span>Total XP</span>
              <span className="xp-total-value" style={{ color: currentRank.color }}>{totalXP} XP</span>
            </div>
          </div>

          <div className="rank-journey">
            <h3>🗺️ Rank Journey</h3>
            <div className="rank-timeline">
              {DE_RANKS.map((rank, i) => {
                const isCurrent = rank.id === currentRank.id;
                const isPast = DE_RANKS.indexOf(currentRank) > i;
                return (
                  <div key={rank.id} className={`rank-milestone ${isCurrent ? 'current' : isPast ? 'past' : 'future'}`}>
                    <div className="rank-milestone-icon" style={{ background: isPast || isCurrent ? rank.color : '#e2e8f0', borderColor: rank.color }}>
                      {rank.icon}
                    </div>
                    <div className="rank-milestone-info">
                      <strong style={{ color: isCurrent ? rank.color : 'inherit' }}>{rank.title}</strong>
                      <span>{rank.minXP.toLocaleString()} XP</span>
                    </div>
                    {isCurrent && <span className="current-marker">← You are here</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* BADGES */}
      {activeTab === 'badges' && (
        <div className="badges-section">
          <h3>Earned Badges ({earnedBadges.length})</h3>
          <div className="achievements-grid">
            {earnedBadges.map(badge => (
              <div key={badge.id} className="achievement-card achieved badge-card">
                <div className="achievement-icon badge-earned">{badge.icon}</div>
                <div className="achievement-content">
                  <h4>{badge.name}</h4>
                  <p>{badge.description}</p>
                  <span className="badge-xp">+{badge.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
          {lockedBadges.length > 0 && (
            <>
              <h3>Locked Badges ({lockedBadges.length})</h3>
              <div className="achievements-grid">
                {lockedBadges.map(badge => (
                  <div key={badge.id} className="achievement-card locked badge-card">
                    <div className="achievement-icon">🔒</div>
                    <div className="achievement-content">
                      <h4>{badge.name}</h4>
                      <p>{badge.description}</p>
                      <span className="badge-xp-locked">+{badge.xp} XP when earned</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* RANKS */}
      {activeTab === 'ranks' && (
        <div className="ranks-section">
          <h3>All Data Engineering Ranks</h3>
          <div className="ranks-list">
            {DE_RANKS.map((rank, i) => {
              const isCurrent = rank.id === currentRank.id;
              const isUnlocked = totalXP >= rank.minXP;
              return (
                <div key={rank.id} className={`rank-item ${isCurrent ? 'current-rank' : isUnlocked ? 'unlocked-rank' : 'locked-rank'}`} style={{ borderLeft: `4px solid ${rank.color}` }}>
                  <span className="rank-item-icon" style={{ background: isUnlocked ? rank.color : '#e2e8f0' }}>{rank.icon}</span>
                  <div className="rank-item-info">
                    <strong style={{ color: rank.color }}>{rank.title}</strong>
                    <p>{rank.description}</p>
                    <span className="rank-xp-req">{rank.minXP.toLocaleString()} XP required</span>
                  </div>
                  {isCurrent && <span className="current-rank-badge">✨ Current</span>}
                  {!isUnlocked && <span className="locked-rank-badge">🔒 {(rank.minXP - totalXP).toLocaleString()} XP to unlock</span>}
                  {isUnlocked && !isCurrent && <span className="completed-rank-badge">✅ Completed</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* QUIZ HISTORY */}
      {activeTab === 'quizzes' && (
        <div className="progress-section">
          <h3>Recent Quiz Results</h3>
          {quizResults.length === 0 ? (
            <div className="empty-state">
              <p>No quizzes taken yet. Head to the sidebar to take your first quiz!</p>
            </div>
          ) : (
            <div className="quizzes-table">
              <table>
                <thead>
                  <tr>
                    <th>Quiz Name</th>
                    <th>Score</th>
                    <th>Date</th>
                    <th>XP Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {[...quizResults].reverse().map((quiz, idx) => (
                    <tr key={idx}>
                      <td>{quiz.name}</td>
                      <td>
                        <span className={`score-badge ${quiz.score >= 90 ? 'excellent' : quiz.score >= 70 ? 'good' : 'average'}`}>
                          {quiz.score}%
                        </span>
                      </td>
                      <td>{new Date(quiz.takenAt).toLocaleDateString()}</td>
                      <td><span className="xp-earned-badge">+{Math.round(quiz.score * 0.4)} XP</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="progress-export">
        <button className="export-btn" onClick={() => {
          const result = storageService.exportData();
          if (result.success) {
            const blob = new Blob([result.data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = result.filename; a.click();
          }
        }}>📥 Export Progress Report</button>
      </div>
    </div>
  );
};

export default Progress;
