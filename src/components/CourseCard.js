import React from 'react';
import '../styles/components.css';

const CourseCard = ({ course, onEnroll, onProgressUpdate }) => {
  const handleEnrollClick = () => {
    if (onEnroll && !course.enrolled) {
      onEnroll(course.id);
    }
  };

  const handleProgressClick = () => {
    if (onProgressUpdate && course.enrolled) {
      const newProgress = Math.min(100, course.progress + 10);
      onProgressUpdate(course.id, newProgress);
    }
  };

  return (
    <div className="course-card">
      <div className="course-header">
        <h3>{course.title}</h3>
        <span className={`level-badge ${course.level.toLowerCase()}`}>
          {course.level}
        </span>
      </div>
      <p className="course-description">{course.description}</p>
      
      <div className="course-meta">
        <span className="meta-item">
          <span className="meta-label">Duration:</span>
          <span className="meta-value">{course.duration}</span>
        </span>
        <span className="meta-item">
          <span className="meta-label">Modules:</span>
          <span className="meta-value">{course.modules}</span>
        </span>
      </div>
      
      <div className="course-topics">
        {course.topics.map((topic, index) => (
          <span key={index} className="topic-tag">{topic}</span>
        ))}
      </div>
      
      {!course.enrolled ? (
        <button 
          className="enroll-btn"
          onClick={handleEnrollClick}
        >
          Enroll Now
        </button>
      ) : (
        <div className="course-progress">
          <div className="progress-header">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <button 
            className="update-progress-btn"
            onClick={handleProgressClick}
            disabled={course.progress >= 100}
          >
            {course.progress >= 100 ? 'Completed! 🎉' : 'Mark Progress (+10%)'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;