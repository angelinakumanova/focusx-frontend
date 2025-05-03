"use client";

import Goal from "@/interfaces/Goal";
import { motion } from "framer-motion";
import { useState } from "react";
import GoalForm from "./GoalForm";
import StatisticsGrid from "./StatisticsGrid";
import GoalsList from "./GoalsList";

export default function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = (newGoal: Goal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);

    // Step 3: Send the new goal to the database
    // You can make an API call to save the new goal in the database here
    // Example: 
    // fetch("/api/goals", { method: "POST", body: JSON.stringify(newGoal) })
    //   .then(response => response.json())
    //   .catch(error => console.error("Error saving goal:", error));
  };

 

  const [ activeGoal, setActiveGoal ] = useState<Goal | null>(null);


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
      <GoalForm onSubmit={(goal) => addGoal(goal)} />

      {/* Goals List */}
      <GoalsList goals={goals} handleHighlightGoal={(index) => setActiveGoal(goals[index])} />
      
    </div>
  );
}
