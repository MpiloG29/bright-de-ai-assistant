import { useState } from 'react';
import '../styles/components.css';

const careerRoles = [
  {
    id: 'junior_de',
    title: 'Junior Data Engineer',
    icon: '🌱',
    level: 1,
    salary: '$70k – $95k',
    color: '#4ecdc4',
    description: 'Entry-level role focused on building and maintaining data pipelines under supervision.',
    requiredSkills: ['SQL', 'Python Basics', 'ETL Concepts', 'Git', 'Linux CLI', 'Data Modeling Basics'],
    niceToHave: ['Cloud basics (AWS/GCP/Azure)', 'Docker', 'Airflow basics'],
    responsibilities: [
      'Build and maintain ETL/ELT pipelines',
      'Write SQL queries for data extraction',
      'Monitor scheduled pipeline runs',
      'Debug data quality issues with guidance'
    ],
    certifications: ['AWS Cloud Practitioner', 'Google Associate Cloud Engineer', 'dbt Fundamentals'],
    courses: ['SQL for Data Engineering', 'Python for ETL', 'Introduction to Data Warehousing']
  },
  {
    id: 'mid_de',
    title: 'Data Engineer',
    icon: '⚙️',
    level: 2,
    salary: '$95k – $130k',
    color: '#45b7d1',
    description: 'Designs and builds robust data infrastructure, leads pipeline projects, and mentors juniors.',
    requiredSkills: ['Advanced SQL', 'Python / PySpark', 'Data Warehouse Design', 'Airflow / Orchestration', 'dbt', 'Cloud Platform (1+)', 'Streaming Basics'],
    niceToHave: ['Kafka', 'Delta Lake / Iceberg', 'Terraform', 'DBT Advanced'],
    responsibilities: [
      'Design scalable data architectures',
      'Own end-to-end pipeline development',
      'Implement data quality frameworks',
      'Collaborate with analytics and ML teams',
      'Write technical documentation'
    ],
    certifications: ['AWS Data Analytics Specialty', 'Databricks Certified Engineer', 'Google Professional Data Engineer'],
    courses: ['Data Warehouse Design Patterns', 'Apache Spark Deep Dive', 'Stream Processing with Kafka']
  },
  {
    id: 'senior_de',
    title: 'Senior Data Engineer',
    icon: '🚀',
    level: 3,
    salary: '$130k – $170k',
    color: '#ffd166',
    description: 'Leads architectural decisions, sets engineering standards, and drives data platform strategy.',
    requiredSkills: ['System Design', 'Advanced Spark & Distributed Computing', 'Data Lakehouse Architecture', 'Streaming at Scale', 'Cost Optimization', 'Security & Governance', 'Team Leadership'],
    niceToHave: ['ML Engineering', 'Data Mesh Concepts', 'Real-time Serving', 'Multi-cloud'],
    responsibilities: [
      'Define data platform architecture',
      'Set coding standards and best practices',
      'Lead technical design reviews',
      'Drive infrastructure cost optimization',
      'Mentor mid and junior engineers',
      'Collaborate with executive stakeholders'
    ],
    certifications: ['AWS Solutions Architect', 'Google Professional Cloud Architect', 'Databricks Certified Architect'],
    courses: ['Distributed Systems Design', 'Data Platform Architecture', 'Technical Leadership']
  },
  {
    id: 'staff_de',
    title: 'Staff / Principal Data Engineer',
    icon: '🏆',
    level: 4,
    salary: '$170k – $220k+',
    color: '#ff6b6b',
    description: 'Cross-team technical leader who shapes company-wide data strategy and solves hard, ambiguous problems.',
    requiredSkills: ['Full-stack Data Platform', 'Data Mesh / Domain Architecture', 'Org-wide Strategy', 'System Design Mastery', 'Stakeholder Management', 'Innovation & Research'],
    niceToHave: ['Data Product Management', 'ML Platform Architecture', 'OSS contributions'],
    responsibilities: [
      'Define 3–5 year data platform roadmap',
      'Drive cross-team technical decisions',
      'Represent engineering at executive level',
      'Establish engineering culture and hiring bar',
      'Evaluate and adopt emerging technologies'
    ],
    certifications: ['Architecture certifications', 'Leadership programs', 'Domain-specific certs'],
    courses: ['Engineering Leadership', 'Data Mesh Implementation', 'Enterprise Architecture']
  },
  {
    id: 'ml_engineer',
    title: 'ML Engineer',
    icon: '🤖',
    level: 3,
    salary: '$120k – $175k',
    color: '#a855f7',
    description: 'Bridges data engineering and ML — builds feature pipelines, trains models in production, and manages ML lifecycle.',
    requiredSkills: ['Python (ML stack)', 'Feature Engineering', 'MLflow / Model Registry', 'Spark / Dask', 'Data Pipelines', 'Statistics & ML Algorithms', 'API Development'],
    niceToHave: ['Kubernetes / Kubeflow', 'Ray', 'LLM Fine-tuning', 'Real-time feature serving'],
    responsibilities: [
      'Build and maintain feature stores',
      'Deploy ML models to production',
      'Manage model monitoring and retraining',
      'Optimize inference pipelines for latency',
      'Collaborate with data scientists'
    ],
    certifications: ['AWS Machine Learning Specialty', 'Google Professional ML Engineer', 'Databricks ML Professional'],
    courses: ['Feature Engineering for ML', 'MLOps Fundamentals', 'Production ML Systems']
  },
  {
    id: 'analytics_engineer',
    title: 'Analytics Engineer',
    icon: '📊',
    level: 2,
    salary: '$90k – $130k',
    color: '#06d6a0',
    description: 'Transforms raw data into reliable, analytics-ready datasets. The bridge between DE and BI/analytics.',
    requiredSkills: ['Advanced SQL', 'dbt (deep)', 'Data Modeling', 'Business Domain Knowledge', 'Git', 'BI Tools (Looker/Tableau)'],
    niceToHave: ['Python for analytics', 'Semantic layer tools', 'Data contracts'],
    responsibilities: [
      'Build and maintain dbt models',
      'Define and document business metrics',
      'Partner with analysts and product teams',
      'Ensure data quality with dbt tests',
      'Create and maintain semantic layer definitions'
    ],
    certifications: ['dbt Certified Developer', 'Looker Developer Certification'],
    courses: ['Analytics Engineering with dbt', 'Data Modeling Best Practices', 'Business Intelligence Fundamentals']
  }
];

const allSkills = [
  'SQL', 'Python Basics', 'ETL Concepts', 'Git', 'Linux CLI', 'Data Modeling Basics',
  'Cloud basics (AWS/GCP/Azure)', 'Docker', 'Airflow basics', 'Advanced SQL',
  'Python / PySpark', 'Data Warehouse Design', 'Airflow / Orchestration', 'dbt',
  'Cloud Platform (1+)', 'Streaming Basics', 'Kafka', 'Delta Lake / Iceberg', 'Terraform',
  'System Design', 'Advanced Spark & Distributed Computing', 'Data Lakehouse Architecture',
  'Streaming at Scale', 'Cost Optimization', 'Security & Governance', 'Team Leadership',
  'Python (ML stack)', 'Feature Engineering', 'MLflow / Model Registry', 'Statistics & ML Algorithms',
  'API Development', 'Data Mesh / Domain Architecture', 'dbt (deep)', 'Business Domain Knowledge',
  'BI Tools (Looker/Tableau)'
];

const CareerTracker = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [mySkills, setMySkills] = useState(() => {
    try {
      const saved = localStorage.getItem('de_career_skills');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [careerGoal, setCareerGoal] = useState(() => {
    return localStorage.getItem('de_career_goal') || '';
  });
  const [activeView, setActiveView] = useState('overview');

  const toggleSkill = (skill) => {
    const updated = mySkills.includes(skill)
      ? mySkills.filter(s => s !== skill)
      : [...mySkills, skill];
    setMySkills(updated);
    localStorage.setItem('de_career_skills', JSON.stringify(updated));
  };

  const setGoal = (roleId) => {
    setCareerGoal(roleId);
    localStorage.setItem('de_career_goal', roleId);
  };

  const getRoleReadiness = (role) => {
    const required = role.requiredSkills;
    const mastered = required.filter(s => mySkills.includes(s));
    return Math.round((mastered.length / required.length) * 100);
  };

  const getMissingSkills = (role) => {
    return role.requiredSkills.filter(s => !mySkills.includes(s));
  };

  const goalRole = careerRoles.find(r => r.id === careerGoal);
  const goalReadiness = goalRole ? getRoleReadiness(goalRole) : 0;

  return (
    <div className="career-tracker-page">
      <div className="page-hero career-hero">
        <h2>🗺️ Career Tracker</h2>
        <p>Map your current skills to data engineering roles. See exactly what you need to learn to reach your career goal.</p>
      </div>

      {/* View Tabs */}
      <div className="career-tabs">
        <button className={`career-tab ${activeView === 'overview' ? 'active' : ''}`} onClick={() => setActiveView('overview')}>
          🗺️ Role Overview
        </button>
        <button className={`career-tab ${activeView === 'skills' ? 'active' : ''}`} onClick={() => setActiveView('skills')}>
          🛠️ My Skills ({mySkills.length})
        </button>
        <button className={`career-tab ${activeView === 'roadmap' ? 'active' : ''}`} onClick={() => setActiveView('roadmap')}>
          🚀 My Roadmap
        </button>
      </div>

      {/* Goal Banner */}
      {goalRole && (
        <div className="goal-banner" style={{ borderLeft: `5px solid ${goalRole.color}` }}>
          <div className="goal-banner-left">
            <span className="goal-icon">{goalRole.icon}</span>
            <div>
              <strong>Career Goal: {goalRole.title}</strong>
              <p>Salary range: {goalRole.salary}</p>
            </div>
          </div>
          <div className="goal-readiness">
            <div className="readiness-circle" style={{ '--pct': goalReadiness, '--color': goalRole.color }}>
              <span>{goalReadiness}%</span>
            </div>
            <p>Ready</p>
          </div>
        </div>
      )}

      {/* OVERVIEW VIEW */}
      {activeView === 'overview' && (
        <div className="roles-grid">
          {careerRoles.map(role => {
            const readiness = getRoleReadiness(role);
            return (
              <div
                key={role.id}
                className={`role-card ${careerGoal === role.id ? 'goal-role' : ''}`}
                style={{ borderTop: `4px solid ${role.color}` }}
              >
                <div className="role-card-header">
                  <span className="role-icon">{role.icon}</span>
                  <div>
                    <h3>{role.title}</h3>
                    <span className="role-salary">{role.salary}</span>
                  </div>
                </div>
                <p>{role.description}</p>

                <div className="readiness-bar-container">
                  <div className="readiness-bar-label">
                    <span>Your readiness</span>
                    <span style={{ color: role.color }}>{readiness}%</span>
                  </div>
                  <div className="readiness-bar">
                    <div
                      className="readiness-fill"
                      style={{ width: `${readiness}%`, background: role.color }}
                    ></div>
                  </div>
                </div>

                <div className="role-card-actions">
                  <button className="view-details-btn" onClick={() => setSelectedRole(role)}>
                    View Details
                  </button>
                  <button
                    className={`set-goal-btn ${careerGoal === role.id ? 'is-goal' : ''}`}
                    style={careerGoal === role.id ? { background: role.color } : {}}
                    onClick={() => setGoal(careerGoal === role.id ? '' : role.id)}
                  >
                    {careerGoal === role.id ? '⭐ My Goal' : 'Set as Goal'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SKILLS VIEW */}
      {activeView === 'skills' && (
        <div className="skills-view">
          <div className="skills-header-info">
            <h3>Check off skills you've learned or practiced</h3>
            <p>Your skill selection powers the readiness percentages on all role cards.</p>
            <div className="skills-summary">
              <span className="skill-stat">
                <strong>{mySkills.length}</strong> skills checked
              </span>
              <span className="skill-stat">
                <strong>{allSkills.length - mySkills.length}</strong> skills to go
              </span>
            </div>
          </div>
          <div className="skills-checklist">
            {allSkills.map(skill => (
              <label key={skill} className={`skill-check-item ${mySkills.includes(skill) ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={mySkills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                />
                <span className="skill-check-label">
                  {mySkills.includes(skill) ? '✅' : '⬜'} {skill}
                </span>
              </label>
            ))}
          </div>
          <button
            className="clear-skills-btn"
            onClick={() => { setMySkills([]); localStorage.removeItem('de_career_skills'); }}
          >
            Reset Skills
          </button>
        </div>
      )}

      {/* ROADMAP VIEW */}
      {activeView === 'roadmap' && (
        <div className="roadmap-view">
          {!goalRole ? (
            <div className="no-goal-message">
              <p>🎯 No career goal set yet. Go to <strong>Role Overview</strong> and click "Set as Goal" on a role.</p>
            </div>
          ) : (
            <>
              <div className="roadmap-header">
                <h3>Your Roadmap to {goalRole.title} {goalRole.icon}</h3>
                <p>Based on your selected skills, here's exactly what you need to focus on.</p>
              </div>

              <div className="roadmap-sections">
                <div className="roadmap-section have">
                  <h4>✅ Skills You Have ({goalRole.requiredSkills.filter(s => mySkills.includes(s)).length}/{goalRole.requiredSkills.length})</h4>
                  <div className="skill-pills">
                    {goalRole.requiredSkills
                      .filter(s => mySkills.includes(s))
                      .map(s => <span key={s} className="skill-pill have">{s}</span>)}
                  </div>
                </div>

                <div className="roadmap-section missing">
                  <h4>🎯 Skills to Learn ({getMissingSkills(goalRole).length})</h4>
                  <div className="skill-pills">
                    {getMissingSkills(goalRole).map(s => (
                      <span key={s} className="skill-pill missing">{s}
                        <button className="mark-learned-btn" onClick={() => toggleSkill(s)}>+ Learn</button>
                      </span>
                    ))}
                  </div>
                  {getMissingSkills(goalRole).length === 0 && (
                    <div className="ready-message">
                      🎉 You have all required skills for this role! Focus on nice-to-haves and start applying.
                    </div>
                  )}
                </div>

                <div className="roadmap-section certs">
                  <h4>🏅 Recommended Certifications</h4>
                  {goalRole.certifications.map(cert => (
                    <div key={cert} className="cert-item">
                      <span className="cert-icon">🏅</span>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>

                <div className="roadmap-section courses-rec">
                  <h4>📚 Recommended Courses</h4>
                  {goalRole.courses.map(course => (
                    <div key={course} className="course-rec-item">
                      <span className="course-icon">📖</span>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>

                <div className="roadmap-section responsibilities">
                  <h4>💼 Day-to-Day Responsibilities</h4>
                  {goalRole.responsibilities.map((resp, i) => (
                    <div key={i} className="resp-item">
                      <span className="resp-bullet" style={{ color: goalRole.color }}>▸</span>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Role Detail Modal */}
      {selectedRole && (
        <div className="modal-overlay" onClick={() => setSelectedRole(null)}>
          <div className="modal-content career-modal" onClick={e => e.stopPropagation()}>
            <div className="career-modal-header" style={{ borderBottom: `3px solid ${selectedRole.color}` }}>
              <span className="role-icon large">{selectedRole.icon}</span>
              <div>
                <h2>{selectedRole.title}</h2>
                <span className="role-salary large">{selectedRole.salary}</span>
              </div>
              <button className="close-btn" onClick={() => setSelectedRole(null)}>✕</button>
            </div>

            <div className="career-modal-body">
              <p>{selectedRole.description}</p>

              <div className="modal-readiness">
                <strong>Your readiness: </strong>
                <span style={{ color: selectedRole.color, fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {getRoleReadiness(selectedRole)}%
                </span>
              </div>

              <h4>Required Skills</h4>
              <div className="skill-pills">
                {selectedRole.requiredSkills.map(s => (
                  <span key={s} className={`skill-pill ${mySkills.includes(s) ? 'have' : 'missing'}`}>{s}</span>
                ))}
              </div>

              <h4>Nice to Have</h4>
              <div className="skill-pills">
                {selectedRole.niceToHave.map(s => (
                  <span key={s} className="skill-pill nice">{s}</span>
                ))}
              </div>

              <div className="modal-actions">
                <button
                  className="set-goal-btn-large"
                  style={{ background: selectedRole.color }}
                  onClick={() => { setGoal(selectedRole.id); setSelectedRole(null); setActiveView('roadmap'); }}
                >
                  🎯 Set as My Goal & View Roadmap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerTracker;
