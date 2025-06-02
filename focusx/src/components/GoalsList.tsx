import { AnimatePresence } from "motion/react";
import GoalListItem from "./GoalsListItem";
import { useAuthStore } from "@/context/useAuthStore";
import { fetchGoals, useGoalStore } from "@/hooks/useGoalStore";
import { useEffect } from "react";

const GoalsList = () => {
  const user = useAuthStore((s) => s.user);
  const goals = useGoalStore((s) => s.goals);
 
  useEffect(() => {
    if (user?.id) {
      fetchGoals(user.id);
    }
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center mb-10">
        {goals.length > 0 ? "Active Goals" : "No current active goals"}
      </h1>

      <AnimatePresence mode="popLayout">
        {goals.map((goal, index) => (
          <GoalListItem goal={goal} key={index} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GoalsList;
