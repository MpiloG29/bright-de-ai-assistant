import React, { useState, useEffect } from 'react';
import '../styles/components.css';

const VideoPlayer = ({ video, onMarkWatched, onWatchYouTube }) => {
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    // Initialize watched state from video prop
    setWatched(video.watched || false);
  }, [video.watched]);

  const handleWatchClick = () => {
    if (!watched) {
      setWatched(true);
      if (onMarkWatched) {
        onMarkWatched(video.id);
      }
    }
  };

  const handleYouTubeClick = (e) => {
    e.preventDefault();
    if (onWatchYouTube) {
      onWatchYouTube();
    } else if (video.url) {
      window.open(video.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="video-card">
      <div className="video-thumbnail-container">
        <img 
          src={video.thumbnail || `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&fit=crop`}
          alt={video.title}
          className="video-thumbnail"
        />
        <div className="video-duration">{video.duration || "10:00"}</div>
      </div>
      
      <div className="video-info">
        <div className="video-header">
          <h4>{video.title || "Data Engineering Tutorial"}</h4>
          <span className="video-channel">{video.channel || "Data Engineering Pro"}</span>
        </div>
        
        <p className="video-description">{video.description || "Learn data engineering concepts"}</p>
        
        <div className="video-stats">
          <span className="stat">
            <span className="stat-icon">👁️</span>
            <span>{video.views || "100K"}</span>
          </span>
          <span className="stat">
            <span className="stat-icon">👍</span>
            <span>{video.likes || "5K"}</span>
          </span>
          <span className="stat">
            <span className="stat-icon">📅</span>
            <span>{video.published || "1 month ago"}</span>
          </span>
        </div>
        
        <div className="video-actions">
          <button 
            className={`watch-btn ${watched ? 'watched' : ''}`}
            onClick={handleWatchClick}
          >
            {watched ? '✓ Watched' : 'Mark as Watched'}
          </button>
          <button 
            className="youtube-link-btn"
            onClick={handleYouTubeClick}
          >
            Watch on YouTube
          </button>
        </div>
        
        <div className="video-category">
          <span className="category-tag">{video.category || "General"}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;