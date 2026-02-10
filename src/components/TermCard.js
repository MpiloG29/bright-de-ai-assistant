import React, { useState, useEffect } from 'react';
import StorageService from '../services/storageService';
import '../styles/components.css';

const TermCard = ({ term }) => {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [mastered, setMastered] = useState(false);

  // Initialize state from localStorage
  useEffect(() => {
    const bookmarks = StorageService.loadBookmarks();
    const isBookmarked = bookmarks.some(b => b.id === term.id && b.type === 'term');
    setBookmarked(isBookmarked);
    
    const isMastered = StorageService.isTermMastered(term.id);
    setMastered(isMastered);
  }, [term.id]);

  const toggleBookmark = () => {
    if (bookmarked) {
      const result = StorageService.removeBookmark(term.id, 'term');
      if (result.success) {
        setBookmarked(false);
        alert(result.message);
      }
    } else {
      const result = StorageService.addBookmark({
        id: term.id,
        type: 'term',
        title: term.term,
        category: term.category,
        difficulty: term.difficulty
      });
      if (result.success) {
        setBookmarked(true);
        alert(result.message);
      }
    }
  };

  const markAsMastered = () => {
    const result = StorageService.updateTermMastery(term.id, true);
    if (result) {
      setMastered(true);
      alert(`🎯 "${term.term}" marked as mastered!`);
      
      // Check for achievement
      const stats = StorageService.getStatistics();
      if (stats.totalTermsMastered >= 5) {
        StorageService.addAchievement('fast_learner', 'Fast Learner - Mastered 5 terms!');
      }
    }
  };

  const unmarkAsMastered = () => {
    const result = StorageService.updateTermMastery(term.id, false);
    if (result) {
      setMastered(false);
      alert(`"${term.term}" removed from mastered list.`);
    }
  };

  const getYouTubeSearchLink = () => {
    const searchQuery = encodeURIComponent(`data engineering ${term.term} tutorial`);
    return `https://www.youtube.com/results?search_query=${searchQuery}`;
  };

  return (
    <div className={`term-card ${term.difficulty.toLowerCase()} ${mastered ? 'mastered' : ''}`}>
      <div className="term-header">
        <div className="term-title-section">
          <h3>{term.term}</h3>
          <span className="term-id">#{term.id}</span>
        </div>
        <div className="term-actions">
          <button 
            className={`bookmark-btn ${bookmarked ? 'bookmarked' : ''}`}
            onClick={toggleBookmark}
            title={bookmarked ? "Remove bookmark" : "Bookmark this term"}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark term"}
          >
            {bookmarked ? '★' : '☆'}
          </button>
          <span className={`difficulty-badge ${term.difficulty.toLowerCase()}`}>
            {term.difficulty}
          </span>
        </div>
      </div>
      
      <div className="term-meta">
        <span className="term-category">{term.category}</span>
        {mastered && (
          <span className="mastered-badge">✓ Mastered</span>
        )}
      </div>
      
      <p className="term-definition">{term.definition}</p>
      
      <div className="term-buttons">
        <button 
          className="expand-button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? '▲ Show Less' : '▼ Learn More'}
        </button>
        {!mastered ? (
          <button 
            className="mastery-button"
            onClick={markAsMastered}
          >
            Mark as Mastered
          </button>
        ) : (
          <button 
            className="unmastery-button"
            onClick={unmarkAsMastered}
          >
            Unmark Mastered
          </button>
        )}
      </div>
      
      {expanded && (
        <div className="term-details">
          <div className="detail-section">
            <h4>📝 How to Use</h4>
            <p>{term.howToUse}</p>
          </div>
          
          <div className="detail-section">
            <h4>⏰ When to Use</h4>
            <p>{term.whenToUse}</p>
          </div>
          
          <div className="detail-section">
            <h4>📊 Related Concepts</h4>
            <div className="related-concepts">
              {term.relatedTerms && term.relatedTerms.map((related, index) => (
                <span key={index} className="concept-tag">{related}</span>
              ))}
            </div>
          </div>
          
          <div className="term-resources">
            <h4>🎥 Learning Resources</h4>
            <div className="resource-links">
              <a 
                href={getYouTubeSearchLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link youtube-link"
              >
                YouTube Tutorials
              </a>
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(`data engineering ${term.term} documentation`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link docs-link"
              >
                Documentation
              </a>
              <a 
                href={`https://stackoverflow.com/search?q=${encodeURIComponent(term.term)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link stack-link"
              >
                Stack Overflow
              </a>
            </div>
          </div>
          
          <div className="term-stats">
            <div className="stat-item">
              <span className="stat-label">Difficulty:</span>
              <span className="stat-value">{term.difficulty}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Last Reviewed:</span>
              <span className="stat-value">Just now</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Status:</span>
              <span className="stat-value">
                {mastered ? 'Mastered' : 'Learning'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermCard;