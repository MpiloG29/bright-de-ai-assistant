import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { courses as initialCourses } from '../data/coursesData';
import storageService from '../services/storageService';
import '../styles/components.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showTasks, setShowTasks] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);

  useEffect(() => {
    // Load courses with enrollment status
    const loadedCourses = initialCourses.map(course => ({
      ...course,
      enrolled: storageService.getCourseProgress(course.id) > 0,
      progress: storageService.getCourseProgress(course.id) || 0,
      tasks: generateTasks(course),
      fullDescription: getFullCourseDescription(course)
    }));
    setCourses(loadedCourses);
  }, []);

  const getFullCourseDescription = (course) => {
    const descriptions = {
      1: "This comprehensive Data Engineering Fundamentals course is your starting point into the world of data engineering. You'll master the essential skills needed to build robust data pipelines and understand core data architecture principles. Perfect for beginners with no prior experience.",
      2: "Dive deep into the world of Big Data with this intensive course. Learn how to process terabytes of data using distributed computing frameworks. Master Apache Spark, understand Hadoop ecosystem, and build scalable data solutions used by top tech companies.",
      3: "Become a cloud data engineering expert. This course covers all major cloud providers - AWS, Azure, and GCP. Learn to build serverless data pipelines, manage data lakes, and implement cost-effective cloud solutions for enterprise-scale data problems.",
      4: "Real-time data processing is crucial in modern applications. This advanced course teaches you to build streaming pipelines that process millions of events per second. Master Apache Kafka, Flink, and Spark Streaming for real-time analytics.",
      5: "Take control of your data workflows with Apache Airflow. This course covers everything from basic DAG design to complex dependency management, monitoring, and production deployment. Build reliable, maintainable pipelines that scale.",
      6: "Data quality is non-negotiable. Learn comprehensive testing strategies, data validation frameworks, and quality monitoring systems. Implement Great Expectations, build data quality dashboards, and ensure your data is always reliable.",
      7: "Transform your data engineering practice with DataOps. This advanced course teaches you to apply DevOps principles to data pipelines - from CI/CD for data to infrastructure as code. Build faster, more reliable data systems.",
      8: "Ace your data engineering interviews with this comprehensive preparation course. Covers technical questions, system design challenges, coding problems, and behavioral interviews. Includes mock interviews with real feedback."
    };
    return descriptions[course.id] || "This course covers essential data engineering concepts with hands-on projects and real-world applications. Perfect for advancing your career in data engineering.";
  };

  const generateTasks = (course) => {
    // Generate tasks based on course topics
    const tasks = course.topics.map((topic, index) => ({
      id: `${course.id}-${index}`,
      title: `Complete lesson on ${topic}`,
      description: `Master ${topic} with hands-on exercises`,
      completed: false,
      courseId: course.id
    }));
    return tasks;
  };

  const handleEnroll = (courseId) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id === courseId) {
          storageService.updateCourseProgress(courseId, 0);
          return {
            ...course,
            enrolled: true,
            progress: 0,
            tasks: course.tasks.map(task => ({ ...task, completed: false }))
          };
        }
        return course;
      })
    );
    alert(`✅ Successfully enrolled in ${courses.find(c => c.id === courseId)?.title}! Start your learning journey now.`);
  };

  const handleUnenroll = (courseId) => {
    if (window.confirm('Are you sure you want to unenroll? Your progress will be reset.')) {
      setCourses(prevCourses =>
        prevCourses.map(course => {
          if (course.id === courseId) {
            storageService.updateCourseProgress(courseId, 0);
            return {
              ...course,
              enrolled: false,
              progress: 0,
              tasks: course.tasks.map(task => ({ ...task, completed: false }))
            };
          }
          return course;
        })
      );
      alert(`❌ Unenrolled from ${courses.find(c => c.id === courseId)?.title}. You can re-enroll anytime.`);
    }
  };

  const handleCompleteTask = (courseId, taskId) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id === courseId) {
          const updatedTasks = course.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          
          const completedCount = updatedTasks.filter(t => t.completed).length;
          const progress = Math.round((completedCount / updatedTasks.length) * 100);
          
          storageService.updateCourseProgress(courseId, progress);
          
          return {
            ...course,
            tasks: updatedTasks,
            progress: progress
          };
        }
        return course;
      })
    );
  };

  const handleProgressUpdate = (courseId, newProgress) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id === courseId) {
          storageService.updateCourseProgress(courseId, newProgress);
          return {
            ...course,
            progress: newProgress
          };
        }
        return course;
      })
    );

    if (newProgress === 100) {
      storageService.addAchievement('course_complete', '🏆 Course Completer');
      alert(`🎉 Congratulations! You've completed the course! 🎉`);
    }
  };

  const toggleTasks = (courseId) => {
    setShowTasks(showTasks === courseId ? null : courseId);
  };

  const handleLearnMore = (course) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  const filteredCourses = selectedLevel === 'All' 
    ? courses 
    : courses.filter(course => course.level === selectedLevel);

  return (
    <div className="courses-page rainbow-bg-full">
      {/* Animated Rainbow Background */}
      <div className="rainbow-background-animated"></div>
      
      <div className="courses-content">
        <div className="courses-header rainbow-text-giant">
          <h1>🎓 Data Engineering Courses</h1>
          <p className="subtitle">Master data engineering with our comprehensive, hands-on courses</p>
        </div>
        
        <div className="level-filters rainbow-filter-glow">
          <button 
            className={`level-filter-btn rainbow-btn ${selectedLevel === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedLevel('All')}
          >
            🌈 All Levels
          </button>
          <button 
            className={`level-filter-btn rainbow-btn-1 ${selectedLevel === 'Beginner' ? 'active' : ''}`}
            onClick={() => setSelectedLevel('Beginner')}
          >
            🟢 Beginner
          </button>
          <button 
            className={`level-filter-btn rainbow-btn-2 ${selectedLevel === 'Intermediate' ? 'active' : ''}`}
            onClick={() => setSelectedLevel('Intermediate')}
          >
            🟡 Intermediate
          </button>
          <button 
            className={`level-filter-btn rainbow-btn-3 ${selectedLevel === 'Advanced' ? 'active' : ''}`}
            onClick={() => setSelectedLevel('Advanced')}
          >
            🔴 Advanced
          </button>
        </div>
        
        <div className="courses-stats">
          <div className="stat-card rainbow-card">
            <span className="stat-number">{filteredCourses.length}</span>
            <span className="stat-label">Courses Available</span>
          </div>
          <div className="stat-card rainbow-card">
            <span className="stat-number">{courses.filter(c => c.enrolled).length}</span>
            <span className="stat-label">Your Courses</span>
          </div>
          <div className="stat-card rainbow-card">
            <span className="stat-number">
              {Math.round(courses.reduce((acc, c) => acc + (c.progress || 0), 0) / (courses.length || 1))}%
            </span>
            <span className="stat-label">Average Progress</span>
          </div>
        </div>
        
        <div className="courses-container">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-wrapper rainbow-card-hover">
              <CourseCard 
                course={course}
                onEnroll={handleEnroll}
                onUnenroll={handleUnenroll}
                onProgressUpdate={handleProgressUpdate}
                onToggleTasks={() => toggleTasks(course.id)}
                showTasks={showTasks === course.id}
                onCompleteTask={handleCompleteTask}
                onLearnMore={() => handleLearnMore(course)}
              />
            </div>
          ))}
        </div>
        
        <div className="learning-path rainbow-gradient-full">
          <h2>🚀 Your Learning Journey</h2>
          <div className="path-steps">
            <div className="path-step">
              <div className="step-number rainbow-1">1</div>
              <div className="step-content">
                <h4>Foundation</h4>
                <p>SQL, Python, Data Modeling</p>
                <span className="step-duration">8 weeks</span>
              </div>
            </div>
            <div className="path-step">
              <div className="step-number rainbow-2">2</div>
              <div className="step-content">
                <h4>Core Skills</h4>
                <p>ETL, Data Warehousing, Cloud Basics</p>
                <span className="step-duration">10 weeks</span>
              </div>
            </div>
            <div className="path-step">
              <div className="step-number rainbow-3">3</div>
              <div className="step-content">
                <h4>Advanced Topics</h4>
                <p>Big Data, Streaming, DataOps</p>
                <span className="step-duration">12 weeks</span>
              </div>
            </div>
            <div className="path-step">
              <div className="step-number rainbow-4">4</div>
              <div className="step-content">
                <h4>Specialization</h4>
                <p>Choose your focus area</p>
                <span className="step-duration">Flexible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details Modal */}
      {showCourseDetails && selectedCourse && (
        <div className="modal-overlay rainbow-overlay">
          <div className="modal-content rainbow-modal">
            <button className="modal-close-btn" onClick={() => setShowCourseDetails(false)}>✕</button>
            
            <div className="modal-header rainbow-gradient-full">
              <h2>{selectedCourse.title}</h2>
              <span className={`level-badge-large ${selectedCourse.level.toLowerCase()}`}>
                {selectedCourse.level}
              </span>
            </div>
            
            <div className="modal-body">
              <div className="course-detail-section">
                <h3>📖 Full Course Description</h3>
                <p className="course-full-description">{selectedCourse.fullDescription}</p>
              </div>
              
              <div className="course-detail-section">
                <h3>🎯 What You'll Learn</h3>
                <ul className="course-detail-list">
                  {selectedCourse.topics.map((topic, index) => (
                    <li key={index}>
                      <span className="topic-icon">✨</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="course-detail-grid">
                <div className="detail-card">
                  <span className="detail-icon">⏱️</span>
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{selectedCourse.duration}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">📚</span>
                  <span className="detail-label">Modules</span>
                  <span className="detail-value">{selectedCourse.modules}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">📝</span>
                  <span className="detail-label">Tasks</span>
                  <span className="detail-value">{selectedCourse.tasks?.length || 0}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🏆</span>
                  <span className="detail-label">Certificate</span>
                  <span className="detail-value">Yes</span>
                </div>
              </div>
              
              <div className="course-detail-section">
                <h3>💼 Career Opportunities</h3>
                <div className="career-tags">
                  <span className="career-tag">Data Engineer</span>
                  <span className="career-tag">ETL Developer</span>
                  <span className="career-tag">BI Engineer</span>
                  <span className="career-tag">Data Architect</span>
                  <span className="career-tag">Pipeline Engineer</span>
                </div>
              </div>
              
              <div className="course-detail-section">
                <h3>📋 Prerequisites</h3>
                <div className="prerequisites-list">
                  {selectedCourse.level === 'Beginner' ? (
                    <>
                      <span className="prerequisite-tag">Basic computer skills</span>
                      <span className="prerequisite-tag">Enthusiasm to learn</span>
                      <span className="prerequisite-tag">No prior experience needed</span>
                    </>
                  ) : selectedCourse.level === 'Intermediate' ? (
                    <>
                      <span className="prerequisite-tag">Basic SQL knowledge</span>
                      <span className="prerequisite-tag">Python fundamentals</span>
                      <span className="prerequisite-tag">Understanding of databases</span>
                    </>
                  ) : (
                    <>
                      <span className="prerequisite-tag">Completed Core Skills</span>
                      <span className="prerequisite-tag">1+ years experience</span>
                      <span className="prerequisite-tag">Distributed systems knowledge</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              {!selectedCourse.enrolled ? (
                <button 
                  className="enroll-btn-large rainbow-gradient-full"
                  onClick={() => {
                    handleEnroll(selectedCourse.id);
                    setShowCourseDetails(false);
                  }}
                >
                  🚀 Enroll Now - Start Learning Today!
                </button>
              ) : (
                <button 
                  className="continue-btn-large"
                  onClick={() => {
                    setShowCourseDetails(false);
                    toggleTasks(selectedCourse.id);
                  }}
                >
                  📚 Continue Learning
                </button>
              )}
              <button 
                className="close-btn-large"
                onClick={() => setShowCourseDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;