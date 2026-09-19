import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { questions, results } from './surveyData';
import './styles.css';

function App() {
  const [screenId, setScreenId] = useState('q1');
  const [step, setStep] = useState(1);
  const [transitionKey, setTransitionKey] = useState(0);

  const currentQuestion = questions.find((item) => item.id === screenId);
  const currentResult = results[screenId];

  function goTo(nextId) {
    setTransitionKey((key) => key + 1);
    setScreenId(nextId);
    if (nextId.startsWith('q')) {
      setStep((value) => value + 1);
    }
  }

  function reset() {
    setTransitionKey((key) => key + 1);
    setScreenId('q1');
    setStep(1);
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="survey-stage" aria-live="polite">
        {currentQuestion ? (
          <QuestionCard
            key={transitionKey}
            question={currentQuestion}
            step={step}
            onAnswer={goTo}
          />
        ) : (
          <ResultCard key={transitionKey} result={currentResult} onReset={reset} />
        )}
      </section>
    </main>
  );
}

function QuestionCard({ question, step, onAnswer }) {
  return (
    <article className="card question-card enter">
      <div className="progress-track">
        <span className="progress-fill" style={{ width: `${Math.min(28 + step * 18, 92)}%` }} />
      </div>

      <p className="eyebrow">QUESTION {String(step).padStart(2, '0')}</p>
      <h1>{question.question}</h1>
      <p className="description">{question.description}</p>

      <div className="choice-grid">
        <ChoiceButton
          label="はい"
          icon="✓"
          variant="yes"
          onClick={() => onAnswer(question.yes)}
        />
        <ChoiceButton
          label="いいえ"
          icon="×"
          variant="no"
          onClick={() => onAnswer(question.no)}
        />
      </div>
    </article>
  );
}

function ChoiceButton({ label, icon, variant, onClick }) {
  return (
    <button className={`choice-button ${variant}`} onClick={onClick} type="button">
      <span className="choice-icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function ResultCard({ result, onReset }) {
  return (
    <article className={`card result-card enter ${result.tone}`}>
      <div className="result-icon" aria-hidden="true">
        {result.icon}
      </div>
      <p className="eyebrow">RESULT</p>
      <h1>{result.title}</h1>
      <p className="description">{result.description}</p>

      <button className="reset-button" onClick={onReset} type="button">
        もう一度確認する
      </button>
    </article>
  );
}

createRoot(document.getElementById('root')).render(<App />);
