import { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import aiService from '../services/aiService';
import storageService from '../services/storageService';
import '../styles/components.css';

const NAV_LINKS = [
  { to: '/', icon: '🏠', label: 'Dashboard' },
  { to: '/terms', icon: '📚', label: 'Terms Library' },
  { to: '/courses', icon: '🎓', label: 'Courses' },
  { to: '/videos', icon: '📹', label: 'Video Tutorials' },
  { to: '/progress', icon: '📊', label: 'Progress & Ranks' },
  { to: '/scenarios', icon: '🧪', label: 'Interactive Labs' },
  { to: '/concept-map', icon: '🗺️', label: 'Concept Map' },
  { to: '/case-studies', icon: '📋', label: 'Case Studies' },
  { to: '/playground', icon: '💻', label: 'Code Playground' },
  { to: '/career', icon: '🚀', label: 'Career Tracker' },
  { to: '/community', icon: '🤝', label: 'Community' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizTopic, setQuizTopic] = useState('general');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const recognitionRef = useRef(null);

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) {
      alert('Please enter a question!');
      return;
    }
    setIsLoading(true);
    try {
      const response = await aiService.askQuestion(aiQuestion);
      setAiResponse(response.answer);
    } catch (error) {
      console.error('AI Error:', error);
      setAiResponse('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice input is not supported in your browser. Try Chrome or Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setAiQuestion(prev => prev ? `${prev} ${transcript}` : transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setShowAIChat(true);
  };

  const handleStartQuiz = async (topic) => {
    try {
      const quiz = await aiService.generateQuiz(topic || quizTopic);
      setCurrentQuiz(quiz);
      setCurrentQuestionIndex(0);
      setQuizScore(0);
      setShowResult(false);
      setShowQuizModal(true);
    } catch (error) {
      console.error('Quiz Error:', error);
      alert('Failed to generate quiz. Please try again.');
    }
  };

  const handleAnswerQuestion = (selectedOptionIndex) => {
    if (!currentQuiz) return;
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedOptionIndex === currentQuestion.correct;
    if (isCorrect) setQuizScore(prev => prev + 1);

    alert(`${isCorrect ? '✅ Correct!' : '❌ Incorrect!'}\n${currentQuestion.explanation}`);

    if (currentQuestionIndex + 1 < currentQuiz.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const finalScore = quizScore + (isCorrect ? 1 : 0);
      const percentage = Math.round((finalScore / currentQuiz.questions.length) * 100);
      storageService.saveQuizResult({
        name: `${quizTopic.toUpperCase()} Quiz`,
        score: percentage,
        totalQuestions: currentQuiz.questions.length,
        correctAnswers: finalScore
      });
      setShowResult(true);
    }
  };

  const handleReviewBookmarks = () => {
    const bookmarks = storageService.loadBookmarks();
    if (bookmarks.length > 0) {
      navigate('/progress');
      setTimeout(() => {
        alert(`📚 You have ${bookmarks.length} bookmarked items. Check your Progress page!`);
      }, 100);
    } else {
      alert('No bookmarks yet! Click the ★ star on any term to bookmark it.');
    }
  };

  const stats = storageService.getStatistics();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>DE Assistant</h2>
        <p>Learn Data Engineering</p>
        <button className="collapse-nav-btn" onClick={() => setNavCollapsed(!navCollapsed)}>
          {navCollapsed ? '▼ Show nav' : '▲ Hide nav'}
        </button>
      </div>

      {!navCollapsed && (
        <nav>
          <ul className="nav-links">
            {NAV_LINKS.map(({ to, icon, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} className={({ isActive }) => isActive ? 'active rainbow' : 'rainbow'}>
                  <span className="nav-icon">{icon}</span>
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="quick-actions rainbow-gradient">
        <h4>⚡ Quick Actions</h4>

        <button className="quick-action-btn ai-btn" onClick={() => setShowAIChat(!showAIChat)}>
          🤖 Ask AI Assistant
        </button>

        <button
          className={`quick-action-btn voice-btn ${isListening ? 'listening' : ''}`}
          onClick={handleVoiceInput}
        >
          {isListening ? '🔴 Listening...' : '🎤 Voice Search'}
        </button>

        {showAIChat && (
          <div className="ai-chat-box">
            <div className="ai-input-row">
              <textarea
                placeholder="Ask anything about data engineering..."
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                rows="3"
                onKeyDown={(e) => { if (e.key === 'Enter' && e.ctrlKey) handleAskAI(); }}
              />
              <button
                className={`voice-inline-btn ${isListening ? 'listening' : ''}`}
                onClick={handleVoiceInput}
                title="Voice input"
              >
                🎤
              </button>
            </div>
            <button onClick={handleAskAI} disabled={isLoading} className="ask-btn">
              {isLoading ? 'Thinking...' : 'Ask AI'}
            </button>
            {aiResponse && (
              <div className="ai-response-box">
                <pre>{aiResponse}</pre>
                <button onClick={() => setAiResponse('')}>Clear</button>
              </div>
            )}
          </div>
        )}

        <button className="quick-action-btn quiz-btn" onClick={() => setShowQuizModal(true)}>
          📝 Take a Quiz
        </button>

        <button className="quick-action-btn bookmark-btn" onClick={handleReviewBookmarks}>
          🔖 Review Bookmarks
        </button>
      </div>

      <div className="sidebar-stats rainbow-light">
        <div className="stat-item">
          <span className="stat-label">Today's Streak</span>
          <span className="stat-value">{stats.currentStreak || 0} days 🔥</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Terms Mastered</span>
          <span className="stat-value">{stats.totalTermsMastered || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total XP</span>
          <span className="stat-value">⭐ {(stats.totalTermsMastered * 20 + stats.totalQuizzesTaken * 40 + stats.totalCoursesEnrolled * 50 + stats.totalVideosWatched * 10)}</span>
        </div>
      </div>

      {/* Quiz Modal — Topic Select */}
      {showQuizModal && !currentQuiz && (
        <div className="modal-overlay">
          <div className="modal-content rainbow-gradient">
            <h3>📝 Select Quiz Topic</h3>
            <div className="quiz-topics">
              {['general', 'etl', 'data lake', 'sql', 'spark'].map(topic => (
                <button
                  key={topic}
                  onClick={() => { setQuizTopic(topic); handleStartQuiz(topic); }}
                  className="topic-btn"
                >
                  {topic.charAt(0).toUpperCase() + topic.slice(1)}
                </button>
              ))}
            </div>
            <button className="close-btn" onClick={() => setShowQuizModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Quiz Modal — Question */}
      {showQuizModal && currentQuiz && !showResult && (
        <div className="modal-overlay">
          <div className="modal-content rainbow-gradient">
            <h3>{currentQuiz.topic.toUpperCase()} Quiz</h3>
            <div className="quiz-progress">
              Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
            </div>
            <div className="quiz-question">
              <p>{currentQuiz.questions[currentQuestionIndex].question}</p>
            </div>
            <div className="quiz-options">
              {currentQuiz.questions[currentQuestionIndex].options.map((option, idx) => (
                <button key={idx} className="option-btn" onClick={() => handleAnswerQuestion(idx)}>
                  {option}
                </button>
              ))}
            </div>
            <button className="close-btn" onClick={() => setShowQuizModal(false)}>Exit Quiz</button>
          </div>
        </div>
      )}

      {/* Quiz Modal — Result */}
      {showQuizModal && showResult && (
        <div className="modal-overlay">
          <div className="modal-content rainbow-gradient">
            <h3>🎉 Quiz Complete!</h3>
            <div className="quiz-result">
              <p>Your Score: {quizScore}/{currentQuiz?.questions.length}</p>
              <p>Percentage: {Math.round((quizScore / (currentQuiz?.questions.length || 1)) * 100)}%</p>
              <p>XP Earned: +{Math.round((quizScore / (currentQuiz?.questions.length || 1)) * 40)} ⭐</p>
            </div>
            <button className="restart-btn" onClick={() => { setCurrentQuiz(null); setShowResult(false); }}>
              Try Another Quiz
            </button>
            <button className="close-btn" onClick={() => { setShowQuizModal(false); setCurrentQuiz(null); setShowResult(false); }}>
              Close
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
