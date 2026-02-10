import React, { useState } from 'react';
import CourseCard from '../components/CourseCard';
import { courses as initialCourses } from '../data/coursesData';
import StorageService from '../services/storageService';
import '../styles/components.css';

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses.map(course => ({
    ...course,
    enrolled: StorageService.getCourseProgress(course.id) > 0
  })));
  const [selectedLevel, setSelectedLevel] = useState('All');

  const handleEnroll = (courseId) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId 
          ? { ...course, enrolled: true, progress: 5 }
          : course
      )
    );
    StorageService.updateCourseProgress(courseId, 5);
    alert(`Enrolled in course! Starting progress tracked.`);
  };

  const handleProgressUpdate = (courseId, newProgress) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId 
          ? { ...course, progress: newProgress }
          : course
      )
    );
    StorageService.updateCourseProgress(courseId, newProgress);
    
    if (newProgress === 100) {
      alert(`🎉 Congratulations! You've completed the course!`);
    }
  };

  const filteredCourses = selectedLevel === 'All' 
    ? courses 
    : courses.filter(course => course.level === selectedLevel);

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h2>Data Engineering Courses</h2>
        <p>Structured learning paths to master data engineering</p>
      </div>
      
      <div className="level-filters">
        <button 
          className={`level-filter-btn ${selectedLevel === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedLevel('All')}
        >
          All Levels
        </button>
        <button 
          className={`level-filter-btn ${selectedLevel === 'Beginner' ? 'active' : ''}`}
          onClick={() => setSelectedLevel('Beginner')}
        >
          Beginner
        </button>
        <button 
          className={`level-filter-btn ${selectedLevel === 'Intermediate' ? 'active' : ''}`}
          onClick={() => setSelectedLevel('Intermediate')}
        >
          Intermediate
        </button>
        <button 
          className={`level-filter-btn ${selectedLevel === 'Advanced' ? 'active' : ''}`}
          onClick={() => setSelectedLevel('Advanced')}
        >
          Advanced
        </button>
      </div>
      
      <div className="courses-container">
        {filteredCourses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onEnroll={handleEnroll}
            onProgressUpdate={handleProgressUpdate}
          />
        ))}
      </div>
      
      <div className="learning-path">
        <h3>Recommended Learning Path</h3>
        <div className="path-steps">
          <div className="path-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Foundation</h4>
              <p>SQL, Python, Data Modeling</p>
            </div>
          </div>
          <div className="path-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Core Skills</h4>
              <p>ETL, Data Warehousing, Cloud Basics</p>
            </div>
          </div>
          <div className="path-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Advanced Topics</h4>
              <p>Big Data, Streaming, DataOps</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;