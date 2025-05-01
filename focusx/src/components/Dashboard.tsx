"use client";

import {
  IconCircleCheck,
  IconCirclePlus,
  IconClock,
  IconFlame,
  IconGift,
  IconTarget,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import StatisticsGrid from "./StatisticsGrid";

export default function Dashboard() {
  const [goals, setGoals] = useState<any[]>([
    {
      title: "Daily Focus Habit",
      type: "Streak",
      streakDays: 5,
      progress: 60,
      reward: "Movie Night",
      milestone: "Consistency",
    },
    
  ]);

  const handleHighlightGoal = (index: number) => {
    setGoals((prevGoals) =>
      prevGoals.map((g, i) => ({
        ...g,
        isActive: i === index, // Only one active at a time
      }))
    );
  };

  const activeGoal = goals.find((g) => g.isActive);

  const [goalType, setGoalType] = useState("Session");
  const [newGoal, setNewGoal] = useState("");
  const [newMilestone, setNewMilestone] = useState("");
  const [sessionDuration, setSessionDuration] = useState("");
  const [newReward, setNewReward] = useState("");
  const handleAddGoal = () => {
    if (newGoal.trim() && newMilestone.trim() && newReward.trim()) {
      setGoals([
        ...goals,
        {
          title: newGoal,
          milestone: newMilestone,
          progress: 0,
          reward: newReward,
        },
      ]);
      setNewGoal("");
      setNewMilestone("");
      setNewReward("");
    }
  };

  // State for modal
  const [goalToRemove, setGoalToRemove] = useState<number>();

  // Remove confirmed
  const confirmRemoveGoal = () => {
    if (goalToRemove !== null) {
      setGoals((prev) => prev.filter((_, i) => i !== goalToRemove));
      setGoalToRemove(0);
    }
  };

  return (
    <div className="bg-neutral-950 text-gray-100 min-h-screen w-full px-6 py-10 sm:px-10 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl sm:text-4xl font-medium mb-2">
          Welcome back, angiek!
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          What will you focus on today?
        </p>
      </motion.div>

      {/* Overview Grid */}
      <StatisticsGrid activeGoal={activeGoal} />

      {/* New Goal Form */}
      <div className="bg-neutral-900/60 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-20 border border-neutral-800">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <IconTarget className="w-5 h-5 text-neutral-400" />
          Set a New Goal
        </h2>

        <div className="grid gap-5">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-white mb-1 block">
              Goal Title
            </label>
            <input
              type="text"
              placeholder="e.g., Study Java"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
            />
          </div>

          {/* Goal Type Selector */}
          <div>
            <label className="text-sm font-medium text-white mb-1 block">
              Goal Type
            </label>
            <div className="flex items-center gap-3">
              {["Session", "Streak"].map((type) => (
                <button
                  key={type}
                  onClick={() => setGoalType(type)}
                  className={`px-4 py-1 rounded-full text-sm transition-colors ${
                    goalType === type
                      ? "bg-green-600 text-white"
                      : "bg-neutral-700 text-gray-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Inputs */}
          {goalType === "Session" && (
            <>
              <div>
                <label className="text-sm font-medium text-white mb-1 block">
                  Number of Sessions
                </label>
                <input
                  type="number"
                  placeholder="e.g., 5"
                  value={newMilestone}
                  onChange={(e) => setNewMilestone(e.target.value)}
                  className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-1 block">
                  Session Duration (mins)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 60"
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(e.target.value)}
                  className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
                />
              </div>
            </>
          )}

          {goalType === "Streak" && (
            <div>
              <label className="text-sm font-medium text-white mb-1 block">
                Days in a Row
              </label>
              <input
                type="number"
                placeholder="e.g., 7"
                value={newMilestone}
                onChange={(e) => setNewMilestone(e.target.value)}
                className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />
            </div>
          )}

          {/* Reward */}
          <div>
            <label className="text-sm font-medium text-white mb-1 block">
              Reward
            </label>
            <input
              type="text"
              placeholder="e.g., Ice cream 🍦"
              value={newReward}
              onChange={(e) => setNewReward(e.target.value)}
              className="w-full p-3 bg-neutral-800 text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleAddGoal}
            className="w-full mt-4 py-3 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-all"
          >
            <IconCirclePlus className="w-4 h-4" />
            Add Goal
          </button>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-8">
        {goals.map((goal, index) => (
          <div
            key={index}
            className="bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-800 relative"
          >
            <div>
              <div className="absolute top-4 right-4 bg-neutral-800 text-xs text-white px-2 py-1 rounded-full">
                {goal.type}
              </div>
              <button
                onClick={() => handleHighlightGoal(index)}
                className={`mt-4 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                  goal.isActive
                    ? "bg-green-600 text-white hover:bg-green-500"
                    : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                }`}
              >
                {goal.isActive ? "Tracking This Goal" : "Track This Goal"}
              </button>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1">
              {goal.title}
            </h3>
            <p className="text-gray-400 text-sm mb-1 italic">
              {goal.milestone}
            </p>

            <p className="text-xs text-gray-500 mb-3">
              Goal type: {goal.type}
              {goal.type === "Session" &&
                ` • ${goal.sets} Set${goal.sets > 1 ? "s" : ""} of ${
                  goal.minutesPerSet
                } Minute${goal.minutesPerSet > 1 ? "s" : ""}`}
              {goal.type === "Streak" &&
                ` • ${goal.streakDays} Streak Day${
                  goal.streakDays > 1 ? "s" : ""
                }`}
            </p>

            <div className="mb-4">
              <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">
                {goal.progress}% completed
              </p>
            </div>

            <div className="flex gap-2 items-center text-sm text-gray-400">
              <span className="font-medium flex items-center gap-2">
                <IconGift /> Reward:
              </span>
              <span className="text-white">{goal.reward}</span>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => setGoalToRemove(index)}
              className="absolute bottom-4 right-4 text-xs text-neutral-400 hover:text-white font-medium transition"
            >
              Remove Goal
            </button>
          </div>
        ))}

        {/* Confirmation Modal */}
        {goalToRemove !== 0 && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-neutral-900 p-6 rounded-xl w-[90%] max-w-sm text-center shadow-lg border border-neutral-700">
              <h3 className="text-white text-lg font-semibold mb-4">
                Are you sure you want to remove this goal?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmRemoveGoal}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Yes, Remove
                </button>
                <button
                  onClick={() => setGoalToRemove(0)}
                  className="px-4 py-2 bg-neutral-700 text-gray-300 rounded-lg hover:bg-neutral-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
