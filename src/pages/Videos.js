import React, { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import { videosData } from '../data/videosData';
import StorageService from '../services/storageService';
import '../styles/components.css';

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [videos, setVideos] = useState(videosData.map(video => ({
    ...video,
    watched: StorageService.isVideoWatched(video.id)
  })));

  const categories = ['All', 'ETL', 'SQL', 'Python', 'Big Data', 'Cloud', 'Interview Prep', 'Streaming'];

  const handleMarkWatched = (videoId) => {
    const result = StorageService.markVideoWatched(videoId);
    if (result) {
      setVideos(prevVideos =>
        prevVideos.map(video =>
          video.id === videoId ? { ...video, watched: true } : video
        )
      );
      
      // Check for achievement
      const stats = StorageService.getStatistics();
      if (stats.totalVideosWatched >= 5) {
        StorageService.addAchievement('video_learner', 'Video Learner - Watched 5 tutorials!');
        alert('🎉 Achievement unlocked: Video Learner!');
      }
    }
  };

  const openYouTubeVideo = (url) => {
    if (url && url.includes('youtube.com')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert('YouTube link will open in a new tab for real implementation.');
    }
  };

  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const watchedVideos = videos.filter(v => v.watched).length;
  const totalVideos = videos.length;

  return (
    <div className="videos-page">
      <div className="videos-header">
        <h2>Video Tutorials Library</h2>
        <p>Watch and learn from expert data engineers</p>
      </div>
      
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="videos-stats">
        <div className="video-stat">
          <span className="stat-number">{filteredVideos.length}</span>
          <span className="stat-label">Videos Available</span>
        </div>
        <div className="video-stat">
          <span className="stat-number">{watchedVideos}</span>
          <span className="stat-label">Watched</span>
        </div>
        <div className="video-stat">
          <span className="stat-number">
            {totalVideos > 0 ? Math.round((watchedVideos / totalVideos) * 100) : 0}%
          </span>
          <span className="stat-label">Completion</span>
        </div>
      </div>
      
      <div className="featured-video">
        <div className="featured-content">
          <h3>Featured Tutorial: Building ETL Pipelines with Python</h3>
          <p>Learn how to create robust ETL pipelines using Python, Pandas, and Apache Airflow</p>
          <button 
            className="watch-featured-btn"
            onClick={() => window.open('https://www.youtube.com/watch?v=5ATnG7d_mug', '_blank')}
          >
            Watch Now on YouTube
          </button>
        </div>
      </div>
      
      <div className="videos-grid">
        {filteredVideos.map(video => (
          <VideoPlayer 
            key={video.id} 
            video={video}
            onMarkWatched={() => handleMarkWatched(video.id)}
            onWatchYouTube={() => openYouTubeVideo(video.url)}
          />
        ))}
      </div>
      
      {filteredVideos.length === 0 && (
        <div className="no-videos">
          <p>No videos found in this category. Try another category!</p>
        </div>
      )}
      
      <div className="youtube-channel">
        <h3>Recommended YouTube Channels</h3>
        <div className="channels-list">
          <div className="channel-card">
            <div className="channel-logo">D</div>
            <div className="channel-info">
              <h4>DataCamp</h4>
              <p>Professional data engineering tutorials and courses</p>
              <a 
                href="https://www.youtube.com/c/datacamp"
                target="_blank"
                rel="noopener noreferrer"
                className="subscribe-link"
              >
                Subscribe
              </a>
            </div>
          </div>
          <div className="channel-card">
            <div className="channel-logo">A</div>
            <div className="channel-info">
              <h4>Apache Spark</h4>
              <p>Official channel for Apache Spark tutorials</p>
              <a 
                href="https://www.youtube.com/c/TheApacheSpark"
                target="_blank"
                rel="noopener noreferrer"
                className="subscribe-link"
              >
                Subscribe
              </a>
            </div>
          </div>
          <div className="channel-card">
            <div className="channel-logo">C</div>
            <div className="channel-info">
              <h4>Cloud Guru</h4>
              <p>AWS, Azure, GCP data engineering services</p>
              <a 
                href="https://www.youtube.com/c/acloudguru"
                target="_blank"
                rel="noopener noreferrer"
                className="subscribe-link"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;