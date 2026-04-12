import React, { useState } from 'react';
import { scenarios, dragDropExercises } from '../data/scenariosData';
import storageService from '../services/storageService';
import '../styles/components.css';

const Scenarios = () => {
  const [activeTab, setActiveTab] = useState('simulations');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [dragOrder, setDragOrder] = useState([]);
  const [dragResult, setDragResult] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  const completedScenarios = (() => {
    try {
      const s = localStorage.getItem('de_completed_scenarios');
      return s ? JSON.parse(s) : [];
    } catch { return []; }
  })();

  const saveCompleted = (id) => {
    const updated = [...completedScenarios, id];
    localStorage.setItem('de_completed_scenarios', JSON.stringify(updated));
  };

  const startScenario = (scenario) => {
    setSelectedScenario(scenario);
    setCurrentStep(0);
    setAnswers({});
    setShowFeedback(null);
    setCompleted(false);
    setScore(0);
  };

  const handleAnswer = (optionId) => {
    const step = selectedScenario.steps[currentStep];
    const option = step.options.find(o => o.id === optionId);
    setAnswers(prev => ({ ...prev, [step.id]: { chosen: optionId, correct: option.correct } }));
    setShowFeedback({ correct: option.correct, message: option.feedback });
  };

  const handleNext = () => {
    setShowFeedback(null);
    if (currentStep + 1 < selectedScenario.steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate score
      const correctCount = Object.values(answers).filter(a => a.correct).length;
      const finalScore = correctCount + (showFeedback?.correct ? 1 : 0);
      setScore(finalScore);
      setCompleted(true);
      saveCompleted(selectedScenario.id);
      storageService.saveQuizResult({
        name: `Scenario: ${selectedScenario.title}`,
        score: Math.round((finalScore / selectedScenario.steps.length) * 100),
        totalQuestions: selectedScenario.steps.length,
        correctAnswers: finalScore
      });
    }
  };

  // Drag & Drop
  const startExercise = (exercise) => {
    setSelectedExercise(exercise);
    setDragOrder([...exercise.stages].sort(() => Math.random() - 0.5));
    setDragResult(null);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('stageId', id);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('stageId');
    if (draggedId === targetId) return;
    const newOrder = [...dragOrder];
    const fromIdx = newOrder.findIndex(s => s.id === draggedId);
    const toIdx = newOrder.findIndex(s => s.id === targetId);
    newOrder.splice(toIdx, 0, newOrder.splice(fromIdx, 1)[0]);
    setDragOrder(newOrder);
    setDragOver(null);
  };

  const checkDragAnswer = () => {
    const correct = dragOrder.every((stage, idx) => stage.correctPosition === idx + 1);
    setDragResult(correct ? 'correct' : 'incorrect');
  };

  const difficultyColor = { Beginner: '#4ecdc4', Intermediate: '#ffd166', Advanced: '#ff6b6b' };

  return (
    <div className="scenarios-page">
      <div className="page-hero scenarios-hero">
        <h2>🧪 Interactive Labs</h2>
        <p>Solve real-world data engineering problems through guided scenario simulations and drag-and-drop exercises.</p>
      </div>

      <div className="scenarios-tabs">
        <button className={`scenario-tab ${activeTab === 'simulations' ? 'active' : ''}`} onClick={() => setActiveTab('simulations')}>
          🎮 Scenario Simulations
        </button>
        <button className={`scenario-tab ${activeTab === 'dragdrop' ? 'active' : ''}`} onClick={() => setActiveTab('dragdrop')}>
          🖱️ Drag-and-Drop
        </button>
      </div>

      {/* SIMULATIONS */}
      {activeTab === 'simulations' && (
        <>
          {!selectedScenario ? (
            <div className="scenarios-grid">
              {scenarios.map(scenario => (
                <div key={scenario.id} className="scenario-card">
                  <div className="scenario-card-header">
                    <span className="scenario-icon">{scenario.icon}</span>
                    <div>
                      <span className="scenario-category">{scenario.category}</span>
                      <span
                        className="scenario-difficulty"
                        style={{ background: difficultyColor[scenario.difficulty] }}
                      >
                        {scenario.difficulty}
                      </span>
                    </div>
                  </div>
                  <h3>{scenario.title}</h3>
                  <p className="scenario-story">{scenario.story}</p>
                  <div className="scenario-meta">
                    <span>⏱ {scenario.duration}</span>
                    <span>📋 {scenario.steps.length} decisions</span>
                    <span>⭐ +{scenario.xpReward} XP</span>
                  </div>
                  {completedScenarios.includes(scenario.id) && (
                    <div className="scenario-completed-badge">✅ Completed</div>
                  )}
                  <button className="start-scenario-btn" onClick={() => startScenario(scenario)}>
                    {completedScenarios.includes(scenario.id) ? '🔁 Retry' : '▶ Start Lab'}
                  </button>
                </div>
              ))}
            </div>
          ) : !completed ? (
            <div className="scenario-runner">
              <div className="runner-header">
                <button className="back-btn" onClick={() => setSelectedScenario(null)}>← Exit Lab</button>
                <div className="runner-progress">
                  {selectedScenario.steps.map((_, i) => (
                    <div
                      key={i}
                      className={`runner-dot ${i < currentStep ? 'done' : i === currentStep ? 'current' : ''}`}
                    ></div>
                  ))}
                </div>
                <span className="step-counter">Step {currentStep + 1} / {selectedScenario.steps.length}</span>
              </div>

              <div className="scenario-context">
                <span className="context-label">📖 Scenario</span>
                <p>{selectedScenario.story}</p>
              </div>

              <div className="step-card">
                <div className="step-header">
                  <span className="step-num">{currentStep + 1}</span>
                  <h3>{selectedScenario.steps[currentStep].title}</h3>
                </div>
                <p className="step-description">{selectedScenario.steps[currentStep].description}</p>
                <p className="step-task"><strong>❓ {selectedScenario.steps[currentStep].task}</strong></p>

                <div className="step-options">
                  {selectedScenario.steps[currentStep].options.map(option => {
                    const answered = answers[selectedScenario.steps[currentStep].id];
                    const isChosen = answered?.chosen === option.id;
                    const isCorrect = option.correct;
                    let cls = 'option-card';
                    if (answered) {
                      if (isChosen && isCorrect) cls += ' correct';
                      else if (isChosen && !isCorrect) cls += ' incorrect';
                      else if (isCorrect) cls += ' correct-hint';
                    }
                    return (
                      <button
                        key={option.id}
                        className={cls}
                        onClick={() => !answered && handleAnswer(option.id)}
                        disabled={!!answered}
                      >
                        <span className="option-letter">{option.id.toUpperCase()}</span>
                        <span>{option.text}</span>
                      </button>
                    );
                  })}
                </div>

                {showFeedback && (
                  <div className={`step-feedback ${showFeedback.correct ? 'feedback-correct' : 'feedback-incorrect'}`}>
                    <strong>{showFeedback.correct ? '✅ Correct!' : '❌ Not quite.'}</strong>
                    <p>{showFeedback.message}</p>
                    <button className="next-step-btn" onClick={handleNext}>
                      {currentStep + 1 < selectedScenario.steps.length ? 'Next Step →' : 'See Results'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="scenario-results">
              <div className="results-hero">
                <div className="results-icon">
                  {score === selectedScenario.steps.length ? '🏆' : score >= selectedScenario.steps.length / 2 ? '⭐' : '📚'}
                </div>
                <h2>Lab Complete!</h2>
                <p className="results-score">{score} / {selectedScenario.steps.length} correct</p>
                <p className="results-xp">+{Math.round((score / selectedScenario.steps.length) * selectedScenario.xpReward)} XP earned</p>
              </div>

              <div className="completion-message">
                <p>{selectedScenario.completionMessage}</p>
              </div>

              <div className="answer-review">
                <h3>Answer Review</h3>
                {selectedScenario.steps.map((step, i) => {
                  const userAns = answers[step.id];
                  const chosenOption = step.options.find(o => o.id === userAns?.chosen);
                  return (
                    <div key={i} className={`review-item ${userAns?.correct ? 'review-correct' : 'review-wrong'}`}>
                      <strong>{userAns?.correct ? '✅' : '❌'} Step {i + 1}: {step.title}</strong>
                      <p>You chose: <em>{chosenOption?.text}</em></p>
                      <p className="review-feedback">{chosenOption?.feedback}</p>
                    </div>
                  );
                })}
              </div>

              <div className="results-actions">
                <button className="retry-btn" onClick={() => startScenario(selectedScenario)}>🔁 Retry Lab</button>
                <button className="back-btn" onClick={() => setSelectedScenario(null)}>← All Labs</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* DRAG AND DROP */}
      {activeTab === 'dragdrop' && (
        <>
          {!selectedExercise ? (
            <div className="exercises-grid">
              <h3>🖱️ Visual Ordering Exercises</h3>
              <p>Drag stages into the correct order to build data pipelines and architectures.</p>
              {dragDropExercises.map(ex => (
                <div key={ex.id} className="exercise-card">
                  <h3>{ex.title}</h3>
                  <p>{ex.description}</p>
                  <div className="exercise-preview">
                    {ex.stages.map(s => (
                      <span key={s.id} className="preview-stage" style={{ background: s.color }}>{s.icon} {s.label}</span>
                    ))}
                  </div>
                  <button className="start-exercise-btn" onClick={() => startExercise(ex)}>
                    Try Exercise
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="drag-exercise">
              <button className="back-btn" onClick={() => setSelectedExercise(null)}>← Back</button>
              <h3>{selectedExercise.title}</h3>
              <p>{selectedExercise.description}</p>

              <div className="drag-area">
                {dragOrder.map((stage) => (
                  <div
                    key={stage.id}
                    className={`drag-stage ${dragOver === stage.id ? 'drag-over' : ''}`}
                    draggable
                    onDragStart={e => handleDragStart(e, stage.id)}
                    onDragOver={e => { e.preventDefault(); setDragOver(stage.id); }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={e => handleDrop(e, stage.id)}
                    style={{ background: stage.color }}
                  >
                    <span className="drag-handle">⠿</span>
                    <span className="stage-icon">{stage.icon}</span>
                    <div>
                      <strong>{stage.label}</strong>
                      <p>{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {!dragResult ? (
                <button className="check-order-btn" onClick={checkDragAnswer}>
                  ✅ Check Order
                </button>
              ) : (
                <div className={`drag-result ${dragResult}`}>
                  {dragResult === 'correct' ? (
                    <>
                      <h3>🎉 Perfect Order!</h3>
                      <p>You correctly ordered all the stages. Well done!</p>
                    </>
                  ) : (
                    <>
                      <h3>❌ Not quite right</h3>
                      <p>Keep trying! The correct order is:</p>
                      <ol>
                        {[...selectedExercise.stages]
                          .sort((a, b) => a.correctPosition - b.correctPosition)
                          .map(s => <li key={s.id}><strong>{s.icon} {s.label}</strong> — {s.description}</li>)
                        }
                      </ol>
                    </>
                  )}
                  <button className="retry-btn" onClick={() => startExercise(selectedExercise)}>Try Again</button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Scenarios;
