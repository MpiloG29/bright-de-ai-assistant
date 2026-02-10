import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import TermsLibrary from '../pages/TermsLibrary';
import Courses from '../pages/Courses';
import Videos from '../pages/Videos';
import Progress from '../pages/Progress';
import SearchBar from './SearchBar';
import AIService from '../services/aiService';
import '../styles/components.css';

const MainContent = () => {
  const location = useLocation();
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (query, type) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    // Simulate search functionality
    const mockResults = {
      query,
      type,
      results: [
        {
          id: 1,
          type: 'term',
          title: 'ETL',
          match: 'Found in definitions and examples',
          relevance: '95%'
        },
        {
          id: 2,
          type: 'course',
          title: 'Data Engineering Fundamentals',
          match: 'Course covers ETL processes',
          relevance: '85%'
        },
        {
          id: 3,
          type: 'video',
          title: 'ETL Pipeline Tutorial with Python',
          match: 'Video tutorial about building ETL pipelines',
          relevance: '90%'
        }
      ]
    };

    setSearchResults(mockResults);
  };

  const handleAISearch = async (question) => {
    if (!question.trim()) return;
    
    setAiLoading(true);
    try {
      // Simulate AI response
      setTimeout(async () => {
        const response = await AIService.explainTerm(question);
        setAiResponse({
          question,
          answer: response.explanation,
          examples: response.examples,
          timestamp: new Date().toLocaleTimeString()
        });
        setAiLoading(false);
      }, 1500);
    } catch (error) {
      console.error('AI search error:', error);
      setAiLoading(false);
    }
  };

  const renderContent = () => {
    switch (location.pathname) {
      case '/':
        return <Dashboard />;
      case '/terms':
        return <TermsLibrary />;
      case '/courses':
        return <Courses />;
      case '/videos':
        return <Videos />;
      case '/progress':
        return <Progress />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="main-content">
      <div className="content-header">
        <div className="breadcrumb">
          <span className="breadcrumb-item">Home</span>
          {location.pathname !== '/' && (
            <>
              <span className="breadcrumb-separator">›</span>
              <span className="breadcrumb-item">
                {location.pathname.substring(1).charAt(0).toUpperCase() + 
                 location.pathname.substring(1).slice(1)}
              </span>
            </>
          )}
        </div>
        
        <div className="quick-actions-bar">
          <button className="quick-action">
            <span className="action-icon">💡</span>
            Daily Challenge
          </button>
          <button className="quick-action">
            <span className="action-icon">⭐</span>
            Bookmarked Items
          </button>
          <button className="quick-action">
            <span className="action-icon">📝</span>
            Take a Quiz
          </button>
        </div>
      </div>

      <div className="search-section">
        <SearchBar onSearch={handleSearch} />
        
        {searchResults && (
          <div className="search-results-panel">
            <div className="results-header">
              <h4>Search Results for "{searchResults.query}"</h4>
              <button 
                className="close-results"
                onClick={() => setSearchResults(null)}
              >
                Close
              </button>
            </div>
            <div className="results-grid">
              {searchResults.results.map(result => (
                <div key={result.id} className="result-card">
                  <div className="result-type">{result.type}</div>
                  <h5>{result.title}</h5>
                  <p className="result-match">{result.match}</p>
                  <div className="result-footer">
                    <span className="relevance">{result.relevance} relevant</span>
                    <button className="view-result-btn">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="ai-quick-assist">
        <div className="ai-assist-header">
          <h3>Quick AI Assistant</h3>
          <p>Ask any data engineering question</p>
        </div>
        <div className="ai-input-group">
          <input
            type="text"
            placeholder="Type your question here... (e.g., 'What is a data lake?')"
            className="ai-quick-input"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAISearch(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <button 
            className="ai-quick-btn"
            onClick={() => {
              const input = document.querySelector('.ai-quick-input');
              handleAISearch(input.value);
              input.value = '';
            }}
          >
            {aiLoading ? 'Thinking...' : 'Ask AI'}
          </button>
        </div>
        
        {aiResponse && (
          <div className="ai-response">
            <div className="response-header">
              <strong>Q: {aiResponse.question}</strong>
              <span className="response-time">{aiResponse.timestamp}</span>
            </div>
            <div className="response-content">
              <p>{aiResponse.answer}</p>
              {aiResponse.examples && aiResponse.examples.length > 0 && (
                <div className="response-examples">
                  <strong>Examples:</strong>
                  <ul>
                    {aiResponse.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="response-actions">
              <button className="response-action">Save Answer</button>
              <button className="response-action">Ask Follow-up</button>
              <button className="response-action">Clear</button>
            </div>
          </div>
        )}
      </div>

      <div className="content-body">
        {renderContent()}
      </div>

      <div className="content-footer">
        <div className="footer-stats">
          <div className="footer-stat">
            <span className="stat-value">50+</span>
            <span className="stat-label">Learning Resources</span>
          </div>
          <div className="footer-stat">
            <span className="stat-value">24/7</span>
            <span className="stat-label">AI Assistant Available</span>
          </div>
          <div className="footer-stat">
            <span className="stat-value">100%</span>
            <span className="stat-label">Free Access</span>
          </div>
        </div>
        
        <div className="footer-actions">
          <button className="footer-action-btn">Give Feedback</button>
          <button className="footer-action-btn">Report Issue</button>
          <button className="footer-action-btn">Share App</button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;