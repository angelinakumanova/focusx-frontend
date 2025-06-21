import { useGoalStore } from "@/hooks/useGoalStore";
import Goal from "@/interfaces/Goal";
import { IconGift, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import PopUpModal from "./PopUpModal";
import { useAuthStore } from "@/context/useAuthStore";

interface Props {
  goal: Goal;
}

const GoalsListItem = ({ goal }: Props) => {
  const user = useAuthStore(s => s.user);
  const [error, setError] = useState('');
  const { activeGoal, setActiveGoal, removeGoal } = useGoalStore();
  const [isModalOpen, setModalVisibility] = useState(false);

  return (
    <motion.div
      layout
      key={goal.id}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`mb-5 bg-neutral-900 p-6 rounded-xl shadow-sm border  relative transition-all duration-300 ${
        goal.id === activeGoal?.id ? "border-green-600" : "border-neutral-800"
      }`}
    >
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={() => setActiveGoal(goal)}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-all hover:cursor-pointer ${
            goal.id === activeGoal?.id
              ? "bg-green-600 text-white hover:bg-green-500"
              : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
          }`}
        >
          {goal.id === activeGoal?.id ? "Tracking This Goal" : "Track This Goal"}
        </button>

        <button
          className="hover:cursor-pointer hover:scale-110 transition-all duration-200"
          onClick={() => setModalVisibility(!isModalOpen)}
        >
          <IconX />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-semibold text-white">{goal.name}</h3>

        <div className="bg-neutral-800 text-xs font-bold text-white px-2 py-1 rounded-full">
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
            title={`Are you sure you want to delete "${goal.name}"`}
            confirmText="Delete"
            confirmFn={async () => {
              try {
                if (user) {
                  await removeGoal(goal, user.id );

                }
              } catch (err) {
                setError('There was an error with deleting goal. Try again later!'); 
              }

              if (activeGoal === goal) setActiveGoal(null);
            }}
            toggleVisibility={() => setModalVisibility(!isModalOpen)}
          />
        )}
      </AnimatePresence>
      {error && <p className="text-red-600">{error}</p>}
    </motion.div>
  );
};

export default GoalsListItem;

const formatGoal = (goal: Goal) => {
  if (goal.type === 'SESSION') {
    const { sets, duration } = goal;
    const totalMinutes = sets * duration;
    const totalFormatted = formatMinutesToHoursAndMinutes(totalMinutes);

    return `${sets} Set${sets > 1 ? "s" : ""} of ${duration} Minute${
      duration > 1 ? "s" : ""
    } or ${totalFormatted}`;
  }

  if (goal.type === 'STREAK') {
    return `${goal.days} Streak Day${goal.days > 1 ? "s" : ""}`;
  }

  return "";
};

export const formatMinutesToHoursAndMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hStr = hours > 0 ? `${hours}h` : "";
  const mStr = remainingMinutes > 0 ? `${remainingMinutes}m` : "";
  return [hStr, mStr].filter(Boolean).join(" ");
};

const GoalSummary = (goal: Goal) => `Goal type: ${formatGoal(goal)}`;

export function calculateProgress(goal: Goal) {
  if (goal.type === 'SESSION') {
    const completion = (goal.progress / (goal.duration * goal.sets)) * 100;

    return completion > 100 ? 100 : completion.toFixed(0);
  } else if (goal.type === 'STREAK') {

    const completion = (goal.progress / goal.days ) * 100;

    return completion > 100 ? 100 : completion.toFixed(0);
  }
}
