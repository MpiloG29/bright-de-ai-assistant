import React, { useState } from 'react';
import { caseStudies, toolDemos } from '../data/caseStudiesData';
import '../styles/components.css';

const CaseStudies = () => {
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [activeTab, setActiveTab] = useState('cases');
  const [filterIndustry, setFilterIndustry] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [storyMode, setStoryMode] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  const industries = ['All', ...new Set(caseStudies.map(c => c.industry))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredStudies = caseStudies.filter(c => {
    const industryMatch = filterIndustry === 'All' || c.industry === filterIndustry;
    const diffMatch = filterDifficulty === 'All' || c.difficulty === filterDifficulty;
    return industryMatch && diffMatch;
  });

  const difficultyColor = { Beginner: '#4ecdc4', Intermediate: '#ffd166', Advanced: '#ff6b6b' };

  return (
    <div className="case-studies-page">
      <div className="page-hero case-hero">
        <h2>📚 Case Studies Hub</h2>
        <p>Real-world data engineering from finance, healthcare, e-commerce, logistics, and more. See exactly how the concepts you're learning are applied in production.</p>
      </div>

      {/* Tabs */}
      <div className="cs-tabs">
        <button className={`cs-tab ${activeTab === 'cases' ? 'active' : ''}`} onClick={() => setActiveTab('cases')}>
          🏢 Industry Cases
        </button>
        <button className={`cs-tab ${activeTab === 'tools' ? 'active' : ''}`} onClick={() => setActiveTab('tools')}>
          🔧 Tool Demos
        </button>
      </div>

      {activeTab === 'cases' && (
        <>
          {/* Filters */}
          <div className="cs-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label>Industry:</label>
                {industries.map(i => (
                  <button
                    key={i}
                    className={`filter-chip ${filterIndustry === i ? 'active' : ''}`}
                    onClick={() => setFilterIndustry(i)}
                  >
                    {i}
                  </button>
                ))}
              </div>
              <div className="filter-group">
                <label>Level:</label>
                {difficulties.map(d => (
                  <button
                    key={d}
                    className={`filter-chip ${filterDifficulty === d ? 'active' : ''}`}
                    onClick={() => setFilterDifficulty(d)}
                    style={filterDifficulty === d && d !== 'All' ? { background: difficultyColor[d], color: '#fff', border: 'none' } : {}}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="story-toggle">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={storyMode}
                  onChange={() => setStoryMode(!storyMode)}
                />
                <span className="toggle-slider"></span>
                📖 Storytelling Mode
              </label>
              {storyMode && <span className="story-hint">Cases shown as narratives — great for beginners!</span>}
            </div>
          </div>

          {/* Case Cards Grid */}
          {!selectedStudy ? (
            <div className="cases-grid">
              {filteredStudies.map(study => (
                <div key={study.id} className="case-card" onClick={() => setSelectedStudy(study)}>
                  <div className="case-card-header">
                    <span className="case-icon">{study.icon}</span>
                    <div>
                      <span className="case-industry">{study.industry}</span>
                      <span
                        className="case-difficulty"
                        style={{ background: difficultyColor[study.difficulty] }}
                      >
                        {study.difficulty}
                      </span>
                    </div>
                  </div>
                  <h3>{study.title}</h3>
                  <p className="case-summary">
                    {storyMode ? study.storytelling : study.summary}
                  </p>
                  <div className="case-tags">
                    {study.tags.map(tag => (
                      <span key={tag} className="case-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="case-footer">
                    <span>⏱ {study.duration}</span>
                    <button className="read-more-btn">Read Case →</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="case-detail">
              <button className="back-btn" onClick={() => setSelectedStudy(null)}>← Back to Cases</button>

              <div className="case-detail-header">
                <span className="case-icon large">{selectedStudy.icon}</span>
                <div>
                  <div className="case-meta">
                    <span className="case-industry">{selectedStudy.industry}</span>
                    <span className="case-difficulty" style={{ background: difficultyColor[selectedStudy.difficulty] }}>
                      {selectedStudy.difficulty}
                    </span>
                    <span>⏱ {selectedStudy.duration}</span>
                  </div>
                  <h2>{selectedStudy.title}</h2>
                  <p className="company-name">📍 {selectedStudy.company}</p>
                </div>
              </div>

              {storyMode && (
                <div className="story-block">
                  <h3>📖 The Story</h3>
                  <p>{selectedStudy.storytelling}</p>
                </div>
              )}

              <div className="case-sections">
                <div className="case-section challenge">
                  <h3>⚠️ The Challenge</h3>
                  <p>{selectedStudy.challenge}</p>
                </div>

                <div className="case-section solution">
                  <h3>💡 The Solution</h3>
                  <p>{selectedStudy.solution}</p>
                </div>

                <div className="case-section architecture">
                  <h3>🏗️ Architecture</h3>
                  <div className="arch-pipeline">
                    {selectedStudy.architecture.map((step, idx) => (
                      <React.Fragment key={step.step}>
                        <div className="arch-step">
                          <div className="arch-step-num">{step.step}</div>
                          <div className="arch-step-content">
                            <strong>{step.label}</strong>
                            <span className="arch-tool">{step.tool}</span>
                            <p>{step.description}</p>
                          </div>
                        </div>
                        {idx < selectedStudy.architecture.length - 1 && (
                          <div className="arch-arrow">→</div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="case-section results">
                  <h3>🏆 Results</h3>
                  <div className="results-grid">
                    {selectedStudy.results.map((r, i) => (
                      <div key={i} className="result-item">
                        <span className="result-check">✅</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="case-section terms-used">
                  <h3>📚 DE Terms in This Case</h3>
                  <div className="de-terms-list">
                    {selectedStudy.deTermsUsed.map(term => (
                      <span key={term} className="de-term-chip">{term}</span>
                    ))}
                  </div>
                </div>

                <div className="case-section lesson">
                  <h3>💬 Key Lesson</h3>
                  <blockquote>{selectedStudy.lessons}</blockquote>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'tools' && (
        <div className="tools-section">
          <h3>🔧 Hands-On Tool Demos</h3>
          <p>Explore real queries and code snippets from the most popular data engineering platforms.</p>

          {!selectedTool ? (
            <div className="tools-grid">
              {toolDemos.map(tool => (
                <div
                  key={tool.id}
                  className="tool-card"
                  style={{ borderTop: `4px solid ${tool.color}` }}
                  onClick={() => setSelectedTool(tool)}
                >
                  <div className="tool-header">
                    <span className="tool-icon">{tool.icon}</span>
                    <div>
                      <h3>{tool.name}</h3>
                      <span className="tool-category">{tool.category}</span>
                    </div>
                  </div>
                  <p>{tool.description}</p>
                  <div className="tool-features">
                    {tool.keyFeatures.slice(0, 2).map(f => (
                      <span key={f} className="tool-feature">⚡ {f}</span>
                    ))}
                  </div>
                  <button className="explore-btn" style={{ background: tool.color }}>Explore {tool.name} →</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="tool-detail">
              <button className="back-btn" onClick={() => setSelectedTool(null)}>← Back to Tools</button>
              <div className="tool-detail-header" style={{ borderLeft: `5px solid ${selectedTool.color}` }}>
                <span className="tool-icon large">{selectedTool.icon}</span>
                <div>
                  <h2>{selectedTool.name}</h2>
                  <span className="tool-category">{selectedTool.category}</span>
                  <p>{selectedTool.description}</p>
                </div>
              </div>

              <div className="tool-detail-body">
                <div className="tool-features-full">
                  <h3>Key Features</h3>
                  {selectedTool.keyFeatures.map(f => (
                    <div key={f} className="feature-row">
                      <span className="feature-check" style={{ color: selectedTool.color }}>✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                  <div className="tool-pricing">
                    <strong>Pricing model:</strong> {selectedTool.pricing}
                  </div>
                </div>

                <div className="tool-sample-query">
                  <h3>Sample Code</h3>
                  <pre className="tool-code">{selectedTool.sampleQuery}</pre>
                </div>

                <div className="tool-use-cases">
                  <h3>Best Used For</h3>
                  {selectedTool.useCases.map(uc => (
                    <span key={uc} className="use-case-chip">{uc}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CaseStudies;
