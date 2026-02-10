import React, { useState } from 'react';
import '../styles/components.css';

const SearchBar = ({ onSearch, placeholder = "Search terms, courses, or videos..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery, searchType);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('', 'all');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-header">
        <h3>Find What You Need</h3>
        <p>Search across terms, courses, and video tutorials</p>
      </div>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <div className="search-type-selector">
            <button 
              type="button"
              className={`search-type-btn ${searchType === 'all' ? 'active' : ''}`}
              onClick={() => setSearchType('all')}
            >
              All
            </button>
            <button 
              type="button"
              className={`search-type-btn ${searchType === 'terms' ? 'active' : ''}`}
              onClick={() => setSearchType('terms')}
            >
              Terms
            </button>
            <button 
              type="button"
              className={`search-type-btn ${searchType === 'courses' ? 'active' : ''}`}
              onClick={() => setSearchType('courses')}
            >
              Courses
            </button>
            <button 
              type="button"
              className={`search-type-btn ${searchType === 'videos' ? 'active' : ''}`}
              onClick={() => setSearchType('videos')}
            >
              Videos
            </button>
          </div>
          
          <div className="search-input-wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="search-input-field"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={handleClear}
                className="clear-search-btn"
              >
                ✕
              </button>
            )}
            <button 
              type="submit"
              className="search-submit-btn"
            >
              <span className="search-icon">🔍</span>
              Search
            </button>
          </div>
        </div>
        
        <div className="search-filters">
          <div className="filter-group">
            <label>
              <input type="checkbox" defaultChecked />
              Include definitions
            </label>
          </div>
          <div className="filter-group">
            <label>
              <input type="checkbox" defaultChecked />
              Include examples
            </label>
          </div>
          <div className="filter-group">
            <label>
              <input type="checkbox" />
              Advanced search
            </label>
          </div>
        </div>
      </form>
      
      {searchQuery && (
        <div className="search-results-info">
          <span className="results-count">Searching for: "{searchQuery}" in {searchType}</span>
          <button 
            onClick={handleClear}
            className="clear-all-btn"
          >
            Clear all filters
          </button>
        </div>
      )}
      
      <div className="search-suggestions">
        <h4>Popular Searches:</h4>
        <div className="suggestion-tags">
          <button 
            className="suggestion-tag"
            onClick={() => {
              setSearchQuery('ETL');
              setSearchType('terms');
            }}
          >
            ETL
          </button>
          <button 
            className="suggestion-tag"
            onClick={() => {
              setSearchQuery('Data Pipeline');
              setSearchType('courses');
            }}
          >
            Data Pipeline
          </button>
          <button 
            className="suggestion-tag"
            onClick={() => {
              setSearchQuery('Apache Spark');
              setSearchType('videos');
            }}
          >
            Apache Spark
          </button>
          <button 
            className="suggestion-tag"
            onClick={() => {
              setSearchQuery('SQL');
              setSearchType('all');
            }}
          >
            SQL
          </button>
          <button 
            className="suggestion-tag"
            onClick={() => {
              setSearchQuery('Data Warehouse');
              setSearchType('terms');
            }}
          >
            Data Warehouse
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;