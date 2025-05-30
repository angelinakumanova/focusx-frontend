import { useGoalStore } from "@/hooks/useGoalStore";
import Goal from "@/interfaces/Goal";
import SessionGoal from "@/interfaces/SessionGoal";
import StreakGoal from "@/interfaces/StreakGoal";
import { IconGift, IconX } from "@tabler/icons-react";
import { useState } from "react";
import PopUpModal from "./PopUpModal";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  goal: Goal;
}

const GoalsListItem = ({ goal }: Props) => {
  const { activeGoal, setActiveGoal, removeGoal } = useGoalStore();
  const [isModalOpen, setModalVisibility] = useState(false);

  // TODO: Change to goal id
  return (
    <motion.div
      layout
      key={goal.title}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`mb-5 bg-neutral-900 p-6 rounded-xl shadow-sm border  relative transition-all duration-300 ${
        goal === activeGoal ? "border-green-600" : "border-neutral-800"
      }`}
    >
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={() => setActiveGoal(goal)}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-all hover:cursor-pointer ${
            goal === activeGoal
              ? "bg-green-600 text-white hover:bg-green-500"
              : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
          }`}
        >
          {goal === activeGoal ? "Tracking This Goal" : "Track This Goal"}
        </button>

        <button
          className="hover:cursor-pointer hover:scale-110 transition-all duration-200"
          onClick={() => setModalVisibility(!isModalOpen)}
        >
          <IconX />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-semibold text-white">{goal.title}</h3>

        <div className="bg-neutral-800 text-xs text-white px-2 py-1 rounded-full">
          {goal.type}
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3">{GoalSummary(goal)}</p>

      <div className="mb-4">
        <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${calculateProgress(goal)}%` }}
          />
        </div>
        <p className="text-right text-xs text-gray-500 mt-1">
          {calculateProgress(goal)}% completed
        </p>
      </div>

      <div className="flex gap-2 items-center text-sm text-gray-400">
        <span className="font-medium flex items-center gap-2">
          <IconGift /> Reward:
        </span>
        <span className="text-white">{goal.reward}</span>
      </div>

      <AnimatePresence mode="wait">
        {isModalOpen && (
          <PopUpModal
            title={`Are you sure you want to delete "${goal.title}"`}
            confirmText="Delete"
            confirmFn={() => {
              removeGoal(goal);

              if (activeGoal === goal) setActiveGoal(null);
            }}
            toggleVisibility={() => setModalVisibility(!isModalOpen)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GoalsListItem;

function isSessionGoal(goal: Goal): goal is SessionGoal {
  return goal.type === "Session";
}

function isStreakGoal(goal: Goal): goal is StreakGoal {
  return goal.type === "Streak";
}

const formatGoal = (goal: Goal) => {
  if (isSessionGoal(goal)) {
    const { sets, minutesPerSet } = goal;
    const totalMinutes = sets * minutesPerSet;
    const totalFormatted = formatMinutesToHoursAndMinutes(totalMinutes);

    return `${sets} Set${sets > 1 ? "s" : ""} of ${minutesPerSet} Minute${
      minutesPerSet > 1 ? "s" : ""
    } or ${totalFormatted}`;
  }

  if (isStreakGoal(goal)) {
    return `${goal.streakDays} Streak Day${goal.streakDays > 1 ? "s" : ""}`;
  }

  return "";
};

const formatMinutesToHoursAndMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hStr = hours > 0 ? `${hours}h` : "";
  const mStr = remainingMinutes > 0 ? `${remainingMinutes}m` : "";
  return [hStr, mStr].filter(Boolean).join(" ");
};

const GoalSummary = (goal: Goal) => `Goal type: ${formatGoal(goal)}`;

export function calculateProgress(goal: Goal) {
  if (isSessionGoal(goal)) {
    const completion =
      (goal.completedMinutes / (goal.minutesPerSet * goal.sets)) * 100;

    return completion > 100 ? 100 : completion.toFixed(0);
  } else if (isStreakGoal(goal)) {
    const completion = (goal.streakDays / goal.completedStreakDays) * 100;

    return completion > 100 ? 100 : completion.toFixed(0);
  }
}
