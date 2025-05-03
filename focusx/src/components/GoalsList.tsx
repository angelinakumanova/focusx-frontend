import Goal from "@/interfaces/Goal";
import SessionGoal from "@/interfaces/SessionGoal";
import StreakGoal from "@/interfaces/StreakGoal";
import { IconGift } from "@tabler/icons-react";

interface Props {
  goals: Goal[];
  handleHighlightGoal: (index: number) => void;
}

const GoalsList = ({ goals, handleHighlightGoal }: Props) => {
//   const handleHighlightGoal = (index: number) => {
//     setGoals((prevGoals) =>
//       prevGoals.map((g, i) => ({
//         ...g,
//         isActive: i === index, // Only one active at a time
//       }))
//     );
//   };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">
        {goals.length > 1 ? "" : "No goals"}
      </h1>
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

          <p className="text-xs text-gray-500 mb-3">
            Goal type: {goal.type}
            {isSessionGoal(goal) &&
              ` • ${goal.sets} Set${goal.sets && goal.sets > 1 ? "s" : ""} of ${
                goal.minutesPerSet
              } Minute${
                goal.minutesPerSet && goal.minutesPerSet > 1 ? "s" : ""
              }`}
            {isStreakGoal(goal) &&
              ` • ${goal.streakDays} Streak Day${
                goal.streakDays && goal.streakDays > 1 ? "s" : ""
              }`}
          </p>

          <div className="mb-4">
            <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: '50%'}}
              />
            </div>
            <p className="text-right text-xs text-gray-500 mt-1">
              50% completed
            </p>
          </div>

          <div className="flex gap-2 items-center text-sm text-gray-400">
            <span className="font-medium flex items-center gap-2">
              <IconGift /> Reward:
            </span>
            <span className="text-white">{goal.reward}</span>
          </div>

      
        </div>
      ))}

   
    </div>
  );
};

export default GoalsList;


function isSessionGoal(goal: Goal): goal is SessionGoal {
    return goal.type === "Session";
  
}

function isStreakGoal(goal: Goal): goal is StreakGoal {
    return goal.type === 'Streak';
 }