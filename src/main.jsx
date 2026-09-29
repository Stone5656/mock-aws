import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { lessons } from "./learnData";
import { questions, results } from "./surveyData";
import "./styles.css";

const dummyReplies = [
  "歴史的建築物の活用では、建築された年代や建物の特徴、予定している改修内容などによって利用できる制度が変わります。\n\nまずは「条例活用チェック」で建物の状況を確認してみてください。",
  "建物の外観や歴史的な特徴を残しながら活用したい場合、歴史的建築物向けの制度を利用できる可能性があります。具体的な計画が決まる前でも相談できます。",
  "用途変更や大きな改修を行う場合は、事前に専門窓口へ相談することをおすすめします。\n\n相談窓口\nXXX-XXXX-XXXX",
  "まず、建築時期・現在の用途・残したい特徴を分かる範囲で整理してみましょう。分からない項目があっても、相談窓口で一緒に確認できます。",
];

const quickQuestions = [
  "この条例はどんな建物が対象？",
  "古い建物を店舗にできますか？",
  "改修するときに気をつけることは？",
  "どこに相談すればいい？",
];

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-shell">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/check" element={<CheckPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [pathname]);
  return null;
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="トップページへ">
          <span className="brand-mark">京</span>
          <span>
            歴史的建築物 <b>活用サポート</b>
          </span>
        </Link>
        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="メニューを開く"
        >
          ☰
        </button>
        <nav
          className={`site-nav ${open ? "open" : ""}`}
          aria-label="メインナビゲーション"
        >
          <NavLink to="/check">条例活用チェック</NavLink>
          <NavLink to="/learn">条例を学ぶ</NavLink>
          <NavLink className="nav-chat" to="/chat">
            <span>✦</span> AIに相談
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy enter">
          <p className="eyebrow">HISTORIC BUILDING SUPPORT</p>
          <h1>
            歴史を受け継ぎ、
            <br />
            次の使い方へ。
          </h1>
          <p>
            歴史的な建物を残しながら活用したい方へ。制度を知るところから、建物の状況確認、相談までを分かりやすく案内します。
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/learn">
              まずは条例を学ぶ <span>→</span>
            </Link>
            <Link className="text-button" to="/check">
              すぐに活用チェックをする
            </Link>
          </div>
        </div>
        <div className="hero-guide" aria-label="サービス利用の流れ">
          <p>はじめての方へ</p>
          <h2>迷ったら、ここから。</h2>
          <div className="hero-guide-step">
            <span>1</span>
            <div>
              <b>まず制度を知る</b>
              <small>約3分のミニレッスン</small>
            </div>
          </div>
          <i>↓</i>
          <div className="hero-guide-step">
            <span>2</span>
            <div>
              <b>自分の建物を確認する</b>
              <small>4問の Yes / No チェック</small>
            </div>
          </div>
          <i>↓</i>
          <div className="hero-guide-step">
            <span>3</span>
            <div>
              <b>疑問を相談する</b>
              <small>AI相談・電話相談へ</small>
            </div>
          </div>
          <Link to="/learn">
            学習をはじめる <span>→</span>
          </Link>
        </div>
      </section>
      <section className="journey-section">
        <div className="section-heading">
          <p className="eyebrow">YOUR JOURNEY</p>
          <h2>迷わず進める、4つのステップ</h2>
          <p>
            制度に詳しくなくても大丈夫。今の状況に合わせて、必要な情報へ進めます。
          </p>
        </div>
        <div className="journey-grid">
          <JourneyCard
            n="01"
            icon="本"
            title="条例を学ぶ"
            text="短い解説と○×問題で、基本のポイントを知ります。"
            to="/learn"
          />
          <JourneyCard
            n="02"
            icon="問"
            title="理解を深める"
            text="その場で答えと解説を確認し、自信をつけます。"
            to="/learn"
          />
          <JourneyCard
            n="03"
            icon="✓"
            title="建物をチェック"
            text="Yes / Noで建物の状況と活用の可能性を確認します。"
            to="/check"
          />
          <JourneyCard
            n="04"
            icon="✦"
            title="気軽に相談"
            text="疑問はAIで整理。個別の内容は電話窓口へ相談できます。"
            to="/chat"
          />
        </div>
      </section>
      <section className="bottom-cta">
        <div>
          <p className="eyebrow">START HERE</p>
          <h2>あなたのペースで、まず一歩。</h2>
          <p>約3分のミニレッスンから始めてみませんか？</p>
        </div>
        <Link className="light-button" to="/learn">
          条例を学んでみる →
        </Link>
      </section>
    </main>
  );
}

function JourneyCard({ n, icon, title, text, to }) {
  return (
    <Link className="journey-card" to={to}>
      <span className="journey-number">STEP {n}</span>
      <span className="journey-icon">
        {icon === "本"
          ? "学ぶ"
          : icon === "問"
            ? "確かめる"
            : icon === "✓"
              ? "チェック"
              : "相談する"}
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      <b>
        このステップへ進む <span>→</span>
      </b>
    </Link>
  );
}

function CheckPage() {
  const [screenId, setScreenId] = useState("q1");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const currentQuestion = questions.find((item) => item.id === screenId);
  function answer(nextId) {
    if (nextId.startsWith("result")) {
      navigate("/result", { state: { resultId: nextId } });
      return;
    }
    setScreenId(nextId);
    setStep((v) => v + 1);
  }
  return (
    <main className="check-page page-background">
      <div className="page-intro">
        <p className="eyebrow">ORDINANCE CHECK</p>
        <h1>条例活用チェック</h1>
        <p>4つの質問に答えて、制度活用の可能性を確認しましょう。</p>
      </div>
      <section className="survey-stage" aria-live="polite">
        {currentQuestion && (
          <QuestionCard
            key={screenId}
            question={currentQuestion}
            step={step}
            onAnswer={answer}
          />
        )}
      </section>
      <p className="disclaimer">
        このチェックは簡易的な目安です。実際の適用可否は専門窓口へご相談ください。
      </p>
    </main>
  );
}

function QuestionCard({ question, step, onAnswer }) {
  return (
    <article className="card question-card enter">
      <div className="progress-meta">
        <span>QUESTION {String(step).padStart(2, "0")}</span>
        <b>
          {step} / {questions.length}
        </b>
      </div>
      <div className="progress-track">
        <span
          className="progress-fill"
          style={{ width: `${(step / questions.length) * 100}%` }}
        />
      </div>
      <h2>{question.question}</h2>
      <p className="description">{question.description}</p>
      <div className="choice-grid">
        <button
          className="choice-button yes"
          onClick={() => onAnswer(question.yes)}
          type="button"
        >
          <span className="choice-icon">✓</span>
          <span>
            <b>はい</b>
            <small>あてはまる</small>
          </span>
        </button>
        <button
          className="choice-button no"
          onClick={() => onAnswer(question.no)}
          type="button"
        >
          <span className="choice-icon">×</span>
          <span>
            <b>いいえ</b>
            <small>あてはまらない</small>
          </span>
        </button>
      </div>
    </article>
  );
}

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = results[location.state?.resultId] || results.result_consider;
  return (
    <main className="result-page page-background">
      <article className={`card result-card enter ${result.tone}`}>
        <div className="result-icon">{result.icon}</div>
        <p className="eyebrow">CHECK RESULT</p>
        <h1>{result.title}</h1>
        <p className="description">{result.description}</p>
        <div className="next-steps">
          <div className="next-step">
            <span>✦</span>
            <div>
              <b>AIに相談する</b>
              <p>気になることを気軽に質問できます</p>
            </div>
            <Link to="/chat">相談する →</Link>
          </div>
          <div className="next-step">
            <span>☎</span>
            <div>
              <b>詳しく相談したい方</b>
              <p>TEL：XXX-XXXX-XXXX</p>
            </div>
            <small>平日 9:00〜17:00</small>
          </div>
        </div>
        <button
          className="text-button"
          onClick={() => navigate("/check")}
          type="button"
        >
          ↻ もう一度確認する
        </button>
      </article>
    </main>
  );
}

function LearnPage() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const lesson = lessons[lessonIndex];
  const lessonAnswers = answers[lesson.id] || {};
  const complete = lesson.questions.every(
    (q) => lessonAnswers[q.id] !== undefined,
  );
  const score = lesson.questions.filter(
    (q) => lessonAnswers[q.id] === q.answer,
  ).length;
  function choose(questionId, value) {
    setAnswers((current) => ({
      ...current,
      [lesson.id]: { ...(current[lesson.id] || {}), [questionId]: value },
    }));
  }
  function nextLesson() {
    setLessonIndex((v) => Math.min(v + 1, lessons.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <main className="learn-page page-background">
      <div className="lesson-progress-wrap">
        <div className="lesson-progress-meta">
          <span>LEARNING PROGRESS</span>
          <b>
            LESSON {lessonIndex + 1} / {lessons.length}
          </b>
        </div>
        <div className="progress-track">
          <span
            className="progress-fill"
            style={{ width: `${((lessonIndex + 1) / lessons.length) * 100}%` }}
          />
        </div>
      </div>
      <article className="lesson-card enter" key={lesson.id}>
        <header className="lesson-header">
          <p className="eyebrow">LESSON {lesson.number}</p>
          <h1>{lesson.title}</h1>
          <p>{lesson.lead}</p>
        </header>
        <LessonVisual variant={lesson.visual} label={lesson.visualLabel} />
        <div className="lesson-description">
          <span>POINT</span>
          <p>{lesson.description}</p>
        </div>
        <section className="quiz-section">
          <div className="quiz-heading">
            <p className="eyebrow">QUICK CHECK</p>
            <h2>理解度チェック</h2>
            <p className="quiz-instruction">
              学んだ内容を思い出しながら、各文章が正しいと思えば「○」、正しくないと思えば「×」を選んでください。
            </p>
          </div>
          {lesson.questions.map((question, index) => (
            <QuizQuestion
              key={question.id}
              question={question}
              index={index}
              selected={lessonAnswers[question.id]}
              onChoose={choose}
            />
          ))}
        </section>
        {complete && (
          <div className="lesson-result enter">
            <span className="result-seal">✓</span>
            <div>
              <p>LESSON {lesson.number} COMPLETE</p>
              <h2>
                {lesson.questions.length}問中 <span>{score}問正解</span>
              </h2>
              <span>条例についての基本的なポイントを確認できました。</span>
            </div>
            {lessonIndex < lessons.length - 1 ? (
              <button className="primary-button" onClick={nextLesson}>
                次のLessonへ →
              </button>
            ) : (
              <Link className="primary-button" to="/check">
                条例活用チェックを試す →
              </Link>
            )}
          </div>
        )}
      </article>
      <aside className="learn-help">
        <div>
          <span>?</span>
          <p>
            <b>分からないことがありますか？</b>
            <br />
            AIが疑問の整理をお手伝いします。
          </p>
        </div>
        <Link to="/chat">AIに質問する →</Link>
      </aside>
    </main>
  );
}

function LessonVisual({ variant, label }) {
  return (
    <div className={`lesson-visual ${variant}`} role="img" aria-label={label}>
      <div className="visual-sun" />
      <div className="visual-buildings">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="visual-caption">
        <span>IMAGE</span>
        <b>{label}</b>
      </div>
    </div>
  );
}

function QuizQuestion({ question, index, selected, onChoose }) {
  const answered = selected !== undefined;
  const correct = selected === question.answer;
  return (
    <article
      className={`quiz-question ${answered ? (correct ? "is-correct" : "is-wrong") : ""}`}
    >
      <div className="question-copy">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <p>{question.text}</p>
      </div>
      <div className="ox-buttons">
        <button
          className={`ox-button circle ${answered && question.answer ? "answer-correct" : ""} ${answered && selected === true && !correct ? "answer-wrong" : ""}`}
          onClick={() => onChoose(question.id, true)}
          disabled={answered}
        >
          <b>○</b>
          <span>正しい</span>
        </button>
        <button
          className={`ox-button cross ${answered && !question.answer ? "answer-correct" : ""} ${answered && selected === false && !correct ? "answer-wrong" : ""}`}
          onClick={() => onChoose(question.id, false)}
          disabled={answered}
        >
          <b>×</b>
          <span>正しくない</span>
        </button>
      </div>
      {answered && (
        <div className={`feedback ${correct ? "correct" : "wrong"}`}>
          <b>{correct ? "✓ 正解です" : "× もう一度確認してみましょう"}</b>
          <p>{question.explanation}</p>
        </div>
      )}
    </article>
  );
}

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "ai",
      text: "こんにちは。歴史的建築物の活用について、気になることを一緒に整理します。\nどのようなことでお困りですか？",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);
  const timeoutRef = useRef(null);
  useEffect(
    () => endRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages, isTyping],
  );
  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setMessages((items) => [
      ...items,
      { id: Date.now(), from: "user", text: trimmed },
    ]);
    setInput("");
    setIsTyping(true);
    timeoutRef.current = setTimeout(
      () => {
        setMessages((items) => [
          ...items,
          {
            id: Date.now() + 1,
            from: "ai",
            text: dummyReplies[Math.floor(Math.random() * dummyReplies.length)],
          },
        ]);
        setIsTyping(false);
      },
      1800 + Math.random() * 900,
    );
  }
  return (
    <main className="chat-page page-background">
      <div className="chat-page-intro">
        <div>
          <p className="eyebrow">AI CONCIERGE</p>
          <h1>AIに相談</h1>
          <p>条例や歴史的建築物について、気になることを質問できます。</p>
        </div>
        <span>
          <i /> AI相談受付中
        </span>
      </div>
      <section className="chat-panel">
        <div className="chat-notice">
          ✦{" "}
          <span>
            このAIはデモ用です。個別の判断が必要な内容は専門窓口へご相談ください。
          </span>
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div className={`message-row ${message.from}`} key={message.id}>
              {message.from === "ai" && <span className="ai-avatar">AI</span>}
              <div>
                <small>
                  {message.from === "ai" ? "AIコンシェルジュ" : "あなた"}
                </small>
                <div className="message-bubble">{message.text}</div>
              </div>
            </div>
          ))}
          {messages.length === 1 && (
            <div className="quick-area">
              <p>よくある質問から選ぶ</p>
              <div className="quick-questions">
                {quickQuestions.map((q) => (
                  <button key={q} onClick={() => sendMessage(q)}>
                    「{q}」<span>→</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {isTyping && (
            <div className="message-row ai">
              <span className="ai-avatar">AI</span>
              <div>
                <small>AIが回答を考えています</small>
                <div className="message-bubble typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <form
          className="chat-input"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="質問を入力してください"
            aria-label="質問を入力してください"
          />
          <button type="submit" disabled={!input.trim() || isTyping}>
            送信 <span>↑</span>
          </button>
        </form>
      </section>
      <div className="chat-contact">
        <span>☎</span>
        <p>
          <b>お急ぎの場合は相談窓口へ</b>
          <br />
          TEL：XXX-XXXX-XXXX（平日 9:00〜17:00）
        </p>
      </div>
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <Link className="footer-brand" to="/">
            <span className="brand-mark">京</span>
            <b>
              歴史的建築物
              <br />
              活用サポート
            </b>
          </Link>
          <p>
            歴史ある建物を、次の世代へ。
            <br />
            制度の理解から相談までをサポートします。
          </p>
        </div>
        <div className="footer-links">
          <h3>メニュー</h3>
          <Link to="/check">条例活用チェック</Link>
          <Link to="/learn">条例を学ぶ</Link>
          <Link to="/chat">AIに相談</Link>
        </div>
        <div className="footer-contact">
          <h3>相談窓口</h3>
          <b>TEL：XXX-XXXX-XXXX</b>
          <p>受付時間：平日 9:00〜17:00</p>
          <small>※ 祝日・年末年始を除く</small>
        </div>
      </div>
      <div className="prototype-note">
        <p>
          本ページはプロトタイプです。表示される内容・連絡先・判定結果はすべてサンプルです。
        </p>
        <span>© 2026 Historic Building Support</span>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
