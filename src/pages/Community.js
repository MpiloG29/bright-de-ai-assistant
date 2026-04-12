import { useState } from 'react';
import '../styles/components.css';

const weeklyChallenge = {
  id: 'wc_2024_04',
  title: 'Design a Real-Time Analytics Pipeline',
  description: 'You work at a food delivery company. Design a data pipeline that shows restaurant partners their real-time order stats (every 5 minutes). Address: ingestion, processing, storage, and serving layers.',
  points: 500,
  deadline: '2024-12-31',
  submissions: 47,
  tags: ['Streaming', 'Architecture', 'Kafka', 'Real-time'],
  topSolution: {
    author: 'DataDevPro',
    summary: 'Used Kafka → Flink → ClickHouse → REST API. Key insight: pre-aggregate at 1-min intervals in Flink to reduce ClickHouse query load at peak hours.',
    votes: 34
  }
};

const defaultDiscussions = [
  {
    id: 1,
    title: 'When should I use ELT vs ETL?',
    author: 'DataNewbie',
    avatar: '🐣',
    body: "I keep seeing both mentioned in job descriptions. Is ELT replacing ETL? When would you still choose ETL over ELT in 2024?",
    tags: ['ETL', 'ELT', 'Best Practices'],
    votes: 28,
    answers: [
      { author: 'SeniorDE_Mike', avatar: '👨‍💻', body: 'Great question! Use ETL when your destination system is expensive (like older on-prem DWs) and you want to reduce data volume before loading. Use ELT when you have a cloud DW (Snowflake, BigQuery) with elastic compute — transform inside the warehouse using dbt. In 2024, ELT with dbt is the dominant pattern for cloud-native stacks.', votes: 19, isAccepted: true },
      { author: 'DataArchitect', avatar: '🏛️', body: 'One more consideration: compliance. If your raw data contains PII that must be masked BEFORE entering any database, ETL (transform before load) may be legally required.', votes: 12, isAccepted: false }
    ],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Airflow vs Prefect vs Dagster — which should I learn?',
    author: 'CareerSwitcher',
    avatar: '🔄',
    body: "I'm a DE student trying to decide which orchestration tool to invest in learning. Job postings seem to show all three. What do you recommend for 2024?",
    tags: ['Airflow', 'Orchestration', 'Career'],
    votes: 41,
    answers: [
      { author: 'PipelinePro', avatar: '⚙️', body: 'Learn Airflow first — it\'s in 80%+ of job postings. Most concepts transfer to Prefect/Dagster. Airflow 2.x with TaskFlow API is much better than 1.x. Once you know Airflow, Prefect takes 2 days to pick up.', votes: 31, isAccepted: true },
      { author: 'ModernDataStack', avatar: '📊', body: 'Counterpoint: if you\'re targeting startups or modern data stack shops, Dagster is gaining serious traction. Its software-defined assets model is genuinely better for data teams. Worth learning both Airflow and one modern alternative.', votes: 18, isAccepted: false }
    ],
    createdAt: '2024-01-14T14:30:00Z'
  },
  {
    id: 3,
    title: 'How do you handle schema changes in production pipelines?',
    author: 'JuniorDE_Alex',
    avatar: '🌱',
    body: "Our upstream team keeps changing column names without warning and our pipelines crash. What are the best strategies to handle schema drift?",
    tags: ['Schema', 'Production', 'Best Practices', 'dbt'],
    votes: 55,
    answers: [
      { author: 'DataEngineerSarah', avatar: '👩‍💻', body: 'Schema validation at ingestion is your first line of defense. Use Great Expectations or dbt source tests to check for expected columns. When schema changes happen, fail fast with a clear error message rather than silently corrupting data downstream.', votes: 27, isAccepted: true },
      { author: 'SeniorDE_Mike', avatar: '👨‍💻', body: 'Also consider using schema registries (like Confluent Schema Registry for Kafka topics) to enforce schema contracts between teams. Establish a data contract — a formal agreement with upstream teams on what they promise to deliver.', votes: 22, isAccepted: false }
    ],
    createdAt: '2024-01-13T09:15:00Z'
  }
];

const mentors = [
  { id: 1, name: 'Sarah Chen', icon: '👩‍💻', title: 'Senior Data Engineer @ Databricks', specialties: ['Spark', 'Delta Lake', 'Data Architecture'], experience: '8 years', availability: 'Available', style: 'Code reviews + weekly 1:1s', rating: 4.9, students: 12 },
  { id: 2, name: 'Marcus Williams', icon: '👨‍💼', title: 'Principal DE @ Airbnb', specialties: ['Airflow', 'Kafka', 'System Design'], experience: '12 years', availability: 'Waitlist', style: 'Career coaching + project reviews', rating: 4.8, students: 18 },
  { id: 3, name: 'Priya Patel', icon: '👩‍🎓', title: 'Analytics Engineer @ dbt Labs', specialties: ['dbt', 'SQL', 'Data Modeling'], experience: '6 years', availability: 'Available', style: 'Hands-on dbt project guidance', rating: 4.9, students: 8 },
  { id: 4, name: 'James O\'Brien', icon: '👨‍🔬', title: 'ML Engineer @ Netflix', specialties: ['Feature Stores', 'PySpark', 'MLOps'], experience: '10 years', availability: 'Available', style: 'ML pipeline design + career advice', rating: 4.7, students: 15 }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState('challenges');
  const [discussions, setDiscussions] = useState(() => {
    try {
      const saved = localStorage.getItem('de_discussions');
      return saved ? JSON.parse(saved) : defaultDiscussions;
    } catch { return defaultDiscussions; }
  });
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [challengeSubmission, setChallengeSubmission] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [requestedMentor, setRequestedMentor] = useState(null);

  const saveDiscussions = (updated) => {
    setDiscussions(updated);
    localStorage.setItem('de_discussions', JSON.stringify(updated));
  };

  const handleVoteDiscussion = (id) => {
    const updated = discussions.map(d =>
      d.id === id ? { ...d, votes: d.votes + 1 } : d
    );
    saveDiscussions(updated);
  };

  const handleVoteAnswer = (discId, ansIdx) => {
    const updated = discussions.map(d => {
      if (d.id !== discId) return d;
      const answers = d.answers.map((a, i) =>
        i === ansIdx ? { ...a, votes: a.votes + 1 } : a
      );
      return { ...d, answers };
    });
    saveDiscussions(updated);
  };

  const handlePostAnswer = () => {
    if (!newAnswer.trim() || !selectedDiscussion) return;
    const updated = discussions.map(d => {
      if (d.id !== selectedDiscussion.id) return d;
      return {
        ...d,
        answers: [
          ...d.answers,
          { author: 'You', avatar: '🙋', body: newAnswer, votes: 0, isAccepted: false }
        ]
      };
    });
    saveDiscussions(updated);
    const updatedDisc = updated.find(d => d.id === selectedDiscussion.id);
    setSelectedDiscussion(updatedDisc);
    setNewAnswer('');
  };

  const handleNewPost = () => {
    if (!newPostTitle.trim() || !newPostBody.trim()) return;
    const newPost = {
      id: Date.now(),
      title: newPostTitle,
      author: 'You',
      avatar: '🙋',
      body: newPostBody,
      tags: ['General'],
      votes: 0,
      answers: [],
      createdAt: new Date().toISOString()
    };
    saveDiscussions([newPost, ...discussions]);
    setNewPostTitle('');
    setNewPostBody('');
    setShowNewPost(false);
  };

  const handleChallengeSubmit = () => {
    if (!challengeSubmission.trim()) return;
    setSubmitted(true);
    localStorage.setItem('de_challenge_sub', challengeSubmission);
  };

  const timeAgo = (isoDate) => {
    const diff = Date.now() - new Date(isoDate);
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="community-page">
      <div className="page-hero community-hero">
        <h2>🤝 Community Hub</h2>
        <p>Peer challenges, Q&A discussions, and mentorship. Learn alongside other data engineers.</p>
      </div>

      {/* Tabs */}
      <div className="community-tabs">
        <button className={`comm-tab ${activeTab === 'challenges' ? 'active' : ''}`} onClick={() => setActiveTab('challenges')}>
          🏆 Weekly Challenge
        </button>
        <button className={`comm-tab ${activeTab === 'discussions' ? 'active' : ''}`} onClick={() => setActiveTab('discussions')}>
          💬 Discussions ({discussions.length})
        </button>
        <button className={`comm-tab ${activeTab === 'mentorship' ? 'active' : ''}`} onClick={() => setActiveTab('mentorship')}>
          🧑‍🏫 Mentorship
        </button>
      </div>

      {/* WEEKLY CHALLENGE */}
      {activeTab === 'challenges' && (
        <div className="challenges-section">
          <div className="challenge-card featured">
            <div className="challenge-header">
              <span className="challenge-week">This Week's Challenge</span>
              <span className="challenge-points">🏆 {weeklyChallenge.points} XP</span>
            </div>
            <h3>{weeklyChallenge.title}</h3>
            <p>{weeklyChallenge.description}</p>
            <div className="challenge-meta">
              <span>👥 {weeklyChallenge.submissions} submissions</span>
              <span>🏷️ {weeklyChallenge.tags.join(' · ')}</span>
            </div>

            {!submitted ? (
              <div className="challenge-submit">
                <h4>Submit Your Solution:</h4>
                <textarea
                  className="challenge-textarea"
                  placeholder="Describe your architecture design, tool choices, and reasoning. Use diagrams (text-based is fine!)"
                  value={challengeSubmission}
                  onChange={e => setChallengeSubmission(e.target.value)}
                  rows={8}
                />
                <button className="submit-challenge-btn" onClick={handleChallengeSubmit}>
                  Submit Solution (+{weeklyChallenge.points} XP)
                </button>
              </div>
            ) : (
              <div className="submission-success">
                <h4>✅ Solution Submitted!</h4>
                <p>Your solution has been saved. Check out the community's top solution below for comparison.</p>
              </div>
            )}
          </div>

          <div className="top-solution">
            <h3>⭐ Community Top Solution</h3>
            <div className="solution-card">
              <div className="solution-header">
                <span className="solution-author">👨‍💻 {weeklyChallenge.topSolution.author}</span>
                <span className="solution-votes">▲ {weeklyChallenge.topSolution.votes} votes</span>
              </div>
              <p>{weeklyChallenge.topSolution.summary}</p>
              <div className="solution-tags">
                {weeklyChallenge.tags.map(t => <span key={t} className="solution-tag">{t}</span>)}
              </div>
            </div>
          </div>

          <div className="past-challenges">
            <h3>📅 Past Challenges</h3>
            <div className="past-challenge-list">
              {[
                { title: 'Build a Data Quality Framework', points: 450, submissions: 62 },
                { title: 'Migrate a Monolithic ETL to Microservices', points: 400, submissions: 38 },
                { title: 'Design a Multi-Region Data Replication Strategy', points: 500, submissions: 29 }
              ].map((c, i) => (
                <div key={i} className="past-challenge-item">
                  <div>
                    <strong>{c.title}</strong>
                    <span className="past-submissions">👥 {c.submissions} solutions</span>
                  </div>
                  <span className="past-points">+{c.points} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DISCUSSIONS */}
      {activeTab === 'discussions' && (
        <div className="discussions-section">
          {!selectedDiscussion ? (
            <>
              <div className="discussions-toolbar">
                <h3>Q&A Forum</h3>
                <button className="new-post-btn" onClick={() => setShowNewPost(!showNewPost)}>
                  + Ask a Question
                </button>
              </div>

              {showNewPost && (
                <div className="new-post-form">
                  <h4>Ask the Community</h4>
                  <input
                    className="post-title-input"
                    placeholder="Question title (be specific)"
                    value={newPostTitle}
                    onChange={e => setNewPostTitle(e.target.value)}
                  />
                  <textarea
                    className="post-body-input"
                    placeholder="Provide context, what you've tried, and what specifically you're stuck on..."
                    value={newPostBody}
                    onChange={e => setNewPostBody(e.target.value)}
                    rows={5}
                  />
                  <div className="new-post-actions">
                    <button className="submit-post-btn" onClick={handleNewPost}>Post Question</button>
                    <button className="cancel-post-btn" onClick={() => setShowNewPost(false)}>Cancel</button>
                  </div>
                </div>
              )}

              <div className="discussions-list">
                {discussions.map(disc => (
                  <div key={disc.id} className="discussion-item" onClick={() => setSelectedDiscussion(disc)}>
                    <div className="disc-votes">
                      <button className="vote-btn" onClick={e => { e.stopPropagation(); handleVoteDiscussion(disc.id); }}>▲</button>
                      <span>{disc.votes}</span>
                    </div>
                    <div className="disc-content">
                      <h4>{disc.title}</h4>
                      <p>{disc.body.slice(0, 120)}...</p>
                      <div className="disc-meta">
                        <span>{disc.avatar} {disc.author}</span>
                        <span>💬 {disc.answers.length} answers</span>
                        <span>🕐 {timeAgo(disc.createdAt)}</span>
                        {disc.tags.map(t => <span key={t} className="disc-tag">{t}</span>)}
                      </div>
                    </div>
                    {disc.answers.some(a => a.isAccepted) && (
                      <span className="answered-badge">✅ Answered</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="discussion-detail">
              <button className="back-btn" onClick={() => setSelectedDiscussion(null)}>← Back to Discussions</button>

              <div className="discussion-full">
                <div className="disc-full-header">
                  <div className="disc-votes-large">
                    <button className="vote-btn-large" onClick={() => handleVoteDiscussion(selectedDiscussion.id)}>▲</button>
                    <span>{discussions.find(d => d.id === selectedDiscussion.id)?.votes}</span>
                  </div>
                  <div>
                    <h2>{selectedDiscussion.title}</h2>
                    <div className="disc-meta">
                      <span>{selectedDiscussion.avatar} {selectedDiscussion.author}</span>
                      <span>🕐 {timeAgo(selectedDiscussion.createdAt)}</span>
                      {selectedDiscussion.tags.map(t => <span key={t} className="disc-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
                <p className="disc-full-body">{selectedDiscussion.body}</p>
              </div>

              <div className="answers-section">
                <h3>{discussions.find(d => d.id === selectedDiscussion.id)?.answers.length} Answers</h3>
                {discussions.find(d => d.id === selectedDiscussion.id)?.answers.map((ans, i) => (
                  <div key={i} className={`answer-item ${ans.isAccepted ? 'accepted' : ''}`}>
                    <div className="answer-votes">
                      <button className="vote-btn" onClick={() => handleVoteAnswer(selectedDiscussion.id, i)}>▲</button>
                      <span>{ans.votes}</span>
                      {ans.isAccepted && <span className="accepted-check">✓</span>}
                    </div>
                    <div className="answer-content">
                      <p>{ans.body}</p>
                      <span className="answer-author">{ans.avatar} {ans.author}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="post-answer">
                <h4>Your Answer</h4>
                <textarea
                  className="answer-textarea"
                  placeholder="Share your knowledge..."
                  value={newAnswer}
                  onChange={e => setNewAnswer(e.target.value)}
                  rows={5}
                />
                <button className="post-answer-btn" onClick={handlePostAnswer}>Post Answer</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MENTORSHIP */}
      {activeTab === 'mentorship' && (
        <div className="mentorship-section">
          <div className="mentorship-intro">
            <h3>🧑‍🏫 Find a Mentor</h3>
            <p>Get paired with an experienced data engineer for guided learning sessions, code reviews, and career advice.</p>
          </div>

          <div className="mentors-grid">
            {mentors.map(mentor => (
              <div key={mentor.id} className={`mentor-card ${mentor.availability === 'Waitlist' ? 'waitlist' : ''}`}>
                <div className="mentor-header">
                  <span className="mentor-avatar">{mentor.icon}</span>
                  <div>
                    <h3>{mentor.name}</h3>
                    <p className="mentor-title">{mentor.title}</p>
                    <span className={`availability-badge ${mentor.availability === 'Available' ? 'available' : 'waitlist'}`}>
                      {mentor.availability === 'Available' ? '🟢' : '🟡'} {mentor.availability}
                    </span>
                  </div>
                </div>

                <div className="mentor-specialties">
                  {mentor.specialties.map(s => <span key={s} className="specialty-tag">{s}</span>)}
                </div>

                <div className="mentor-details">
                  <div className="mentor-detail-item">
                    <span className="detail-label">Experience:</span>
                    <span>{mentor.experience}</span>
                  </div>
                  <div className="mentor-detail-item">
                    <span className="detail-label">Style:</span>
                    <span>{mentor.style}</span>
                  </div>
                  <div className="mentor-detail-item">
                    <span className="detail-label">Rating:</span>
                    <span>{'⭐'.repeat(Math.floor(mentor.rating))} {mentor.rating}</span>
                  </div>
                  <div className="mentor-detail-item">
                    <span className="detail-label">Current students:</span>
                    <span>{mentor.students}</span>
                  </div>
                </div>

                {requestedMentor === mentor.id ? (
                  <div className="request-sent">
                    ✅ Request sent! {mentor.name} will be in touch shortly.
                  </div>
                ) : (
                  <button
                    className={`request-mentor-btn ${mentor.availability === 'Waitlist' ? 'waitlist-btn' : ''}`}
                    onClick={() => setRequestedMentor(mentor.id)}
                  >
                    {mentor.availability === 'Available' ? '👋 Request Mentorship' : '📋 Join Waitlist'}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="become-mentor">
            <h3>🌟 Become a Mentor</h3>
            <p>Have 3+ years of data engineering experience? Help the next generation of DEs and build your personal brand.</p>
            <button className="become-mentor-btn">Apply to Mentor</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
