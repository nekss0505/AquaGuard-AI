import React from "react";
import { useApp } from "../context/AppContext";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useApp();

  if (!toastMessage) return null;

  const getStyle = () => {
    switch (toastMessage.type) {
      case "success":
        return {
          bg: "bg-emerald-950 border-emerald-500 text-emerald-100",
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
        };
      case "error":
        return {
          bg: "bg-red-950 border-red-500 text-red-100",
          icon: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
        };
      case "warning":
        return {
          bg: "bg-amber-950 border-amber-500 text-amber-100",
          icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
        };
      default:
        return {
          bg: "bg-slate-900 border-teal-500 text-slate-100",
          icon: <Info className="w-5 h-5 text-teal-400 shrink-0" />,
        };
    }
  };

  const style = getStyle();

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div
        className={`flex items-start justify-between p-3.5 rounded-xl border shadow-2xl ${style.bg}`}
      >
        <div className="flex items-start space-x-3">
          {style.icon}
          <div className="text-xs font-medium leading-relaxed">{toastMessage.text}</div>
        </div>
      </div>
    </div>
  );
};
