import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { AWARENESS_TOPICS, AWARENESS_QUIZZES } from "../data/awarenessContent";
import {
  BookOpen,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  ArrowRight,
  Droplets,
  HeartPulse,
  ShieldAlert,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";

export const AwarenessCenter: React.FC = () => {
  const { language, t, speakText, isSpeaking } = useApp();

  const isTamil = language === "ta";
  const [selectedTopicId, setSelectedTopicId] = useState<string>(AWARENESS_TOPICS[0].id);
  const [activeTab, setActiveTab] = useState<"guides" | "quiz">("guides");

  // Quiz State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const selectedTopic =
    AWARENESS_TOPICS.find((t) => t.id === selectedTopicId) || AWARENESS_TOPICS[0];

  const currentQ = AWARENESS_QUIZZES[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(idx);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < AWARENESS_QUIZZES.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const renderTopicIcon = (iconName: string) => {
    switch (iconName) {
      case "Droplets":
        return <Droplets className="w-5 h-5 text-cyan-600" />;
      case "HeartPulse":
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              Community Health Knowledge
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
            {t.awarenessCenter}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Practical guidelines on water purification, dehydration management, and flood safety
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => setActiveTab("guides")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === "guides"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Practical Guides
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
              activeTab === "quiz"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Quiz</span>
          </button>
        </div>
      </div>

      {activeTab === "guides" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Topic List Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <div className="px-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Surveillance & Educational Modules
            </div>
            {AWARENESS_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full p-3.5 rounded-2xl text-left transition cursor-pointer flex items-center justify-between border ${
                  selectedTopicId === topic.id
                    ? "border-teal-500 bg-teal-50/70 text-teal-950 font-bold shadow-xs"
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-slate-100">
                    {renderTopicIcon(topic.iconName)}
                  </div>
                  <div>
                    <div className="text-xs font-bold">{topic.title}</div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      {topic.category} • {topic.readTime}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          {/* Selected Topic Content */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200">
                  {renderTopicIcon(selectedTopic.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                    {selectedTopic.category}
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                    {selectedTopic.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedTopic.summary}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  const speech = `${selectedTopic.title}. ${selectedTopic.summary}. ${selectedTopic.keyPoints.join(". ")}. ${selectedTopic.actionSteps.map(s => `${s.step}: ${s.detail}`).join(". ")}`;
                  speakText(speech);
                }}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition cursor-pointer shrink-0 self-start sm:self-auto"
                title="Listen to full guide in voice"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isTamil ? "குரலில் கேட்க" : "Listen in Voice"}</span>
              </button>
            </div>

            {/* Key Points */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Key Public Health Facts
              </div>
              <div className="space-y-1.5">
                {selectedTopic.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Action Protocol
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedTopic.actionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900">{step.step}</h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Flag Warning Signs */}
            {selectedTopic.warningSigns && selectedTopic.warningSigns.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Medical Red Flags & Immediate Hospital Transfer Indicators:</span>
                </div>
                <ul className="text-[11px] text-rose-800 space-y-1 list-disc list-inside">
                  {selectedTopic.warningSigns.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Mode */
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {!quizCompleted ? (
            <div className="space-y-6">
              {/* Quiz Progress */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Question {currentQuestionIdx + 1} of {AWARENESS_QUIZZES.length}
                </span>
                <span className="text-xs font-bold text-indigo-600">
                  Score: {quizScore}
                </span>
              </div>

              {/* Question */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  {currentQ.category}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  let optStyle = "border-slate-200 hover:bg-slate-50 text-slate-700";
                  if (selectedOption === idx) {
                    optStyle = "border-indigo-500 bg-indigo-50 text-indigo-950 font-bold";
                  }
                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      optStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold";
                    } else if (selectedOption === idx) {
                      optStyle = "border-red-500 bg-red-50 text-red-950 font-bold";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswerSubmitted && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {isAnswerSubmitted && (
                <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950 space-y-1 animate-in fade-in duration-200">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Explanation:
                  </div>
                  <p className="text-indigo-900 text-[11px] leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Next / Submit Button */}
              <div>
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition cursor-pointer disabled:opacity-50"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>
                      {currentQuestionIdx + 1 === AWARENESS_QUIZZES.length
                        ? "View Final Score"
                        : "Next Question"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed Results */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Quiz Completed
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
                  You scored {quizScore} / {AWARENESS_QUIZZES.length}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {quizScore >= 4
                    ? "Outstanding! You are well-prepared to safeguard your community against water-borne risks."
                    : "Good effort! Explore the practical guides above to master safe water and sanitation practices."}
                </p>
              </div>

              <button
                onClick={handleRestartQuiz}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
