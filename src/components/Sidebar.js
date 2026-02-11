import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import aiService from '../services/aiService';
import storageService from '../services/storageService';
import '../styles/components.css';

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

  const handleStartQuiz = async () => {
    try {
      const quiz = await aiService.generateQuiz(quizTopic);
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
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    
    // Show result for this question
    alert(`${isCorrect ? '✅ Correct!' : '❌ Incorrect!'}\n${currentQuestion.explanation}`);
    
    // Move to next question or finish
    if (currentQuestionIndex + 1 < currentQuiz.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz completed
      const finalScore = quizScore + (isCorrect ? 1 : 0);
      const percentage = Math.round((finalScore / currentQuiz.questions.length) * 100);
      
      storageService.saveQuizResult({
        name: `${quizTopic.toUpperCase()} Quiz`,
        score: percentage,
        totalQuestions: currentQuiz.questions.length,
        correctAnswers: finalScore
      });
      
      setShowResult(true);
      alert(`🎉 Quiz completed!\nYour score: ${finalScore}/${currentQuiz.questions.length} (${percentage}%)`);
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

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>DE Assistant</h2>
        <p>Learn Data Engineering</p>
      </div>
      
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active rainbow' : 'rainbow'}>
              <span className="nav-icon">🏠</span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/terms" className={({ isActive }) => isActive ? 'active rainbow' : 'rainbow'}>
              <span className="nav-icon">📚</span>
              <span>Terms Library</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/courses" className={({ isActive }) => isActive ? 'active rainbow' : 'rainbow'}>
              <span className="nav-icon">🎓</span>
              <span>Courses</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/videos" className={({ isActive }) => isActive ? 'active rainbow' : 'rainbow'}>
              <span className="nav-icon">📹</span>
              <span>Video Tutorials</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/progress" className={({ isActive }) => isActive ? 'active rainbow' : 'rainbow'}>
              <span className="nav-icon">📊</span>
              <span>Progress Tracker</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="quick-actions rainbow-gradient">
        <h4>⚡ Quick Actions</h4>
        
        <button 
          className="quick-action-btn ai-btn"
          onClick={() => setShowAIChat(!showAIChat)}
        >
          🤖 Ask AI Assistant
        </button>
        
        {showAIChat && (
          <div className="ai-chat-box">
            <textarea
              placeholder="Ask anything about data engineering..."
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              rows="3"
            />
            <button 
              onClick={handleAskAI}
              disabled={isLoading}
              className="ask-btn"
            >
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
        
        <button 
          className="quick-action-btn quiz-btn"
          onClick={() => setShowQuizModal(true)}
        >
          📝 Take a Quiz
        </button>
        
        <button 
          className="quick-action-btn bookmark-btn"
          onClick={handleReviewBookmarks}
        >
          🔖 Review Bookmarks
        </button>
      </div>
      
      <div className="sidebar-stats rainbow-light">
        <div className="stat-item">
          <span className="stat-label">Today's Streak</span>
          <span className="stat-value">{storageService.getStreak() || 0} days 🔥</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Terms Mastered</span>
          <span className="stat-value">{storageService.getStatistics().totalTermsMastered || 0}</span>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuizModal && !currentQuiz && (
        <div className="modal-overlay">
          <div className="modal-content rainbow-gradient">
            <h3>📝 Select Quiz Topic</h3>
            <div className="quiz-topics">
              <button onClick={() => { setQuizTopic('general'); handleStartQuiz(); }} className="topic-btn">General</button>
              <button onClick={() => { setQuizTopic('etl'); handleStartQuiz(); }} className="topic-btn">ETL</button>
              <button onClick={() => { setQuizTopic('data lake'); handleStartQuiz(); }} className="topic-btn">Data Lake</button>
            </div>
            <button className="close-btn" onClick={() => setShowQuizModal(false)}>Close</button>
          </div>
        </div>
      )}

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
                <button
                  key={idx}
                  className="option-btn"
                  onClick={() => handleAnswerQuestion(idx)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="close-btn" onClick={() => setShowQuizModal(false)}>Exit Quiz</button>
          </div>
        </div>
      )}

      {showQuizModal && showResult && (
        <div className="modal-overlay">
          <div className="modal-content rainbow-gradient">
            <h3>🎉 Quiz Complete!</h3>
            <div className="quiz-result">
              <p>Your Score: {quizScore}/{currentQuiz?.questions.length}</p>
              <p>Percentage: {Math.round((quizScore / (currentQuiz?.questions.length || 1)) * 100)}%</p>
            </div>
            <button 
              className="restart-btn"
              onClick={() => {
                setCurrentQuiz(null);
                setShowResult(false);
              }}
            >
              Try Another Quiz
            </button>
            <button className="close-btn" onClick={() => {
              setShowQuizModal(false);
              setCurrentQuiz(null);
              setShowResult(false);
            }}>Close</button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;