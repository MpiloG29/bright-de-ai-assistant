import React from 'react';
import '../styles/components.css';

const CourseCard = ({ 
  course, 
  onEnroll, 
  onUnenroll, 
  onProgressUpdate,
  onToggleTasks,
  showTasks,
  onCompleteTask,
  onLearnMore 
}) => {
  const handleEnrollClick = () => {
    if (onEnroll && !course.enrolled) {
      onEnroll(course.id);
    }
  };

  const handleUnenrollClick = () => {
    if (onUnenroll && course.enrolled) {
      onUnenroll(course.id);
    }
  };

  const handleProgressClick = () => {
    if (onProgressUpdate && course.enrolled) {
      const newProgress = Math.min(100, course.progress + 10);
      onProgressUpdate(course.id, newProgress);
    }
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return '#ff6b6b';
    if (progress < 70) return '#ffd93d';
    return '#6bcf7f';
  };

  return (
    <div className="course-card rainbow-card-full">
      <div className="course-badge">
        <span className={`level-badge-glow ${course.level.toLowerCase()}`}>
          {course.level}
        </span>
      </div>
      
      <div className="course-header">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-short-description">{course.description}</p>
      </div>
      
      <div className="course-meta rainbow-meta">
        <div className="meta-item">
          <span className="meta-icon">⏱️</span>
          <div className="meta-text">
            <span className="meta-label">Duration</span>
            <span className="meta-value">{course.duration}</span>
          </div>
        </div>
        <div className="meta-item">
          <span className="meta-icon">📚</span>
          <div className="meta-text">
            <span className="meta-label">Modules</span>
            <span className="meta-value">{course.modules}</span>
          </div>
        </div>
        <div className="meta-item">
          <span className="meta-icon">📝</span>
          <div className="meta-text">
            <span className="meta-label">Tasks</span>
            <span className="meta-value">{course.tasks?.length || 0}</span>
          </div>
        </div>
      </div>
      
      <div className="course-topics">
        {course.topics.slice(0, 4).map((topic, index) => (
          <span key={index} className="topic-tag rainbow-topic">{topic}</span>
        ))}
        {course.topics.length > 4 && (
          <span className="topic-tag more-tag">+{course.topics.length - 4}</span>
        )}
      </div>
      
      <div className="course-actions-primary">
        <button 
          className="learn-more-btn rainbow-btn-5"
          onClick={onLearnMore}
        >
          🔍 Learn More
        </button>
        
        {!course.enrolled ? (
          <button 
            className="enroll-btn rainbow-btn-4"
            onClick={handleEnrollClick}
          >
            🚀 Enroll Now
          </button>
        ) : (
          <button 
            className="view-tasks-btn"
            onClick={onToggleTasks}
          >
            {showTasks ? '📋 Hide Tasks' : '📋 View Tasks'}
          </button>
        )}
      </div>
      
      {course.enrolled && (
        <div className="course-progress-section">
          <div className="course-progress">
            <div className="progress-header">
              <span>📊 Your Progress</span>
              <span className="progress-percentage" style={{ color: getProgressColor(course.progress) }}>
                {course.progress}%
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill rainbow-progress"
                style={{ 
                  width: `${course.progress}%`,
                  background: `linear-gradient(90deg, 
                    #ff6b6b 0%, 
                    #ffd93d 50%, 
                    #6bcf7f 100%)`
                }}
              ></div>
            </div>
            
            <div className="course-actions-secondary">
              <button 
                className="update-progress-btn"
                onClick={handleProgressClick}
                disabled={course.progress >= 100}
              >
                {course.progress >= 100 ? '✅ Completed!' : '➕ Add Progress'}
              </button>
              <button 
                className="unenroll-btn"
                onClick={handleUnenrollClick}
              >
                ❌ Unenroll
              </button>
            </div>
          </div>
          
          {showTasks && course.tasks && (
            <div className="tasks-list rainbow-tasks">
              <h4>📝 Course Tasks</h4>
              <div className="tasks-grid">
                {course.tasks.map(task => (
                  <div key={task.id} className="task-item rainbow-task-item">
                    <label className="task-label">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onCompleteTask(course.id, task.id)}
                      />
                      <div className="task-content">
                        <span className={task.completed ? 'completed' : ''}>
                          {task.title}
                        </span>
                        {task.description && (
                          <span className="task-description">{task.description}</span>
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseCard;