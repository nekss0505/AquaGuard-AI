import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  Bot,
  Send,
  User,
  ShieldAlert,
  Volume2,
} from "lucide-react";

export const AquaGuideAssistant: React.FC = () => {
  const {
    chatMessages,
    sendChatMessage,
    isChatLoading,
    language,
    speakText,
    t,
  } = useApp();
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isChatLoading) return;
    sendChatMessage(input);
    setInput("");
  };

  const getStarterPrompts = () => {
    if (language === "ta") {
      return [
        "குடிநீரை எவ்வாறு கொதிக்க வைத்து குடிக்க வேண்டும்?",
        "வீட்டிலேயே ORS கரைசல் தயாரிப்பது எப்படி?",
        "வாந்தி மற்றும் வயிற்றுப்போக்கிற்கான முதலுதவி என்ன?",
        "வெள்ள நீர் புகுந்த ஆழ்துளை கிணற்றை எவ்வாறு தூய்மைப்படுத்துவது?",
      ];
    } else if (language === "hi") {
      return [
        "पीने का पानी कैसे उबालें और शुद्ध करें?",
        "घर पर ओआरएस (ORS) घोल कैसे बनाएं?",
        "दस्त और उल्टी के लिए प्राथमिक उपचार क्या है?",
        "बाढ़ प्रभावित बोरवेल को कैसे कीटाণুরहित करें?",
      ];
    } else if (language === "bn") {
      return [
        "পানীয় জল কীভাবে ফুটিয়ে নিরাপদ করবেন?",
        "বাড়িতে ওআরএস (ORS) তৈরি করার নিয়ম কী?",
        "বমি ও ডায়রিয়ার ঘরোয়া প্রাথমিক চিকিৎসা কী?",
        "বন্যার জল ঢোকা টিউবওয়েল কীভাবে ক্লোরিন দিয়ে পরিষ্কার করবেন?",
      ];
    }
    return [
      "How should I boil and purify drinking water safely?",
      "What is the exact recipe for homemade ORS electrolyte solution?",
      "What are early danger signs of cholera / dehydration?",
      "How do I disinfect a flooded handpump with chlorine?",
    ];
  };

  const getSpeechLang = () => {
    if (language === "ta") return "ta-IN";
    if (language === "hi") return "hi-IN";
    if (language === "bn") return "bn-IN";
    return "en-IN";
  };

  const starterPrompts = getStarterPrompts();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 text-2xl">
            🤖
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {t.aiTitle}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">
                {t.voiceSupported}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.aiSub}
            </p>
          </div>
        </div>

        {/* Safety Disclaimer Badge */}
        <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>
            {t.aiDisclaimer}
          </span>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[560px] overflow-hidden">
        {/* Messages Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {chatMessages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  isUser ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-sm font-bold ${
                    isUser
                      ? "bg-slate-900 text-white"
                      : "bg-teal-600 text-white shadow-xs shadow-teal-600/30"
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? "bg-slate-900 text-white rounded-tr-none font-medium"
                      : "bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-none font-normal shadow-xs"
                  }`}
                >
                  <div className="whitespace-pre-line font-medium">{msg.text}</div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/40 text-[10px]">
                    <span className={isUser ? "text-slate-400" : "text-slate-400 font-mono"}>
                      {msg.timestamp}
                    </span>

                    {!isUser && (
                      <button
                        onClick={() => speakText(msg.text, getSpeechLang())}
                        className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold flex items-center space-x-1 transition cursor-pointer border border-teal-200/60"
                        title={t.listenAloud}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{t.listenAloud}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isChatLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 text-slate-700 border border-slate-200/80 rounded-tl-none text-xs sm:text-sm flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                <span className="font-bold">
                  {t.aiThinking}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Chips */}
        <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 px-1">
            {t.suggestedQuestions}
          </span>
          {starterPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                sendChatMessage(prompt);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 text-xs font-semibold text-slate-700 transition shrink-0 shadow-xs cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={handleSend}
          className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder={t.inputPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isChatLoading}
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-teal-500 focus:bg-white transition"
          />

          <button
            type="submit"
            disabled={!input.trim() || isChatLoading}
            className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-md shadow-teal-600/20 transition cursor-pointer shrink-0"
          >
            <span>{t.sendBtn}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
