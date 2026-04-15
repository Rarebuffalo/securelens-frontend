"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScoreGauge({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Simple count up animation
    const interval = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev < score) return prev + 1;
        clearInterval(interval);
        return score;
      });
    }, 10);
    return () => clearInterval(interval);
  }, [score]);

  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "#22c55e"; // text-green-500
    if (score >= 50) return "#f59e0b"; // text-yellow-500
    return "#ef4444"; // text-red-500
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          stroke="#f1f5f9"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Foreground Circle */}
        <motion.circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {/* Absolute positioned inner score */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-4xl font-bold tracking-tighter text-slate-900">{animatedScore}</span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">Score</span>
      </div>
    </div>
  );
}
