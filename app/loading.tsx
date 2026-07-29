"use client";

import { Rocket, Sparkle, Plus } from "lucide-react";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Animated Icon Container */}
      <div className="relative">
        {/* Floating sparkles */}
        <div className="absolute -top-4 -left-6 animate-pulse">
          <Plus className="w-4 h-4 text-sky-400" strokeWidth={3} />
        </div>
        <div
          className="absolute -top-2 -right-4 animate-pulse"
          style={{ animationDelay: "0.3s" }}
        >
          <Plus className="w-3 h-3 text-sky-400" strokeWidth={3} />
        </div>
        <div
          className="absolute -bottom-2 -left-4 animate-pulse"
          style={{ animationDelay: "0.6s" }}
        >
          <Sparkle className="w-3 h-3 text-sky-400 fill-sky-400" />
        </div>
        <div
          className="absolute -bottom-1 -right-6 animate-pulse"
          style={{ animationDelay: "0.9s" }}
        >
          <Sparkle className="w-4 h-4 text-sky-400 fill-sky-400" />
        </div>

        {/* Main Rocket with float animation */}
        <div className="animate-float">
          <div className="animate-rocket-tilt">
            <Rocket className="w-20 h-20 text-sky-400" strokeWidth={1.5} />
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 blur-2xl opacity-40 -z-10">
          <div className="w-20 h-20 bg-sky-400 rounded-full" />
        </div>
      </div>

      {/* Loading Text with animated dots */}
      <div className="mt-8 flex items-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 tracking-tight">
          Space Loading
        </h2>
        <div className="flex items-end ml-1 gap-0.5 mb-1">
          <span className="w-1.5 h-1.5 bg-slate-800 rounded-full animate-bounce-dot" />
          <span
            className="w-1.5 h-1.5 bg-slate-800 rounded-full animate-bounce-dot"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="w-1.5 h-1.5 bg-slate-800 rounded-full animate-bounce-dot"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400 rounded-full animate-progress" />
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes rocket-tilt {
          0%,
          100% {
            transform: rotate(-15deg);
          }
          50% {
            transform: rotate(-5deg);
          }
        }

        @keyframes bounce-dot {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .animate-rocket-tilt {
          animation: rocket-tilt 2s ease-in-out infinite;
        }

        .animate-bounce-dot {
          animation: bounce-dot 1s ease-in-out infinite;
        }

        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
          width: 50%;
        }
      `}</style>
    </div>
  );
};

export default GlobalLoading;