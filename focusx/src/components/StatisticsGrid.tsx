import { useGoalStore } from "@/hooks/useGoalStore";
import { IconCircleCheck, IconClock, IconFlame } from "@tabler/icons-react";
import { JSX } from "react";

type GridItem = {
  title: string;
  subtitle: string;
  value: string;
  icon: JSX.Element;
  isProgress?: boolean;
  progressValue?: number;
};

const StatisticsGrid = () => {
  const activeGoal = useGoalStore(s => s.activeGoal);

  const lastSession = {
    title: "Last Focus Session",
    subtitle: "Total Duration (No Breaks Included)",
    value: "2 hrs",
    icon: <IconClock className="w-5 h-5 text-neutral-500" />,
  };

  const currentStreak = {
    title: "Current Streak",
    subtitle: "Days",
    value: "5 Days",
    icon: <IconFlame className="w-5 h-5 text-orange-500" />,
  };

  const goal = {
    title: "Goal Progress",
    subtitle: activeGoal ? activeGoal.title : "No Active Goal",
    value: activeGoal ? `50%` : "--",
    icon: <IconCircleCheck className="w-5 h-5 text-green-500" />,
    isProgress: true,
    progressValue: activeGoal ? 50 : 0,
  };

  const items: GridItem[] = [lastSession, currentStreak, goal];

 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
      {items.map((item, i) => (
        <div
          key={i}
          className="relative bg-neutral-900 p-5 rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          {/* Accent Border */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-neutral-500 to-neutral-700 rounded-l-xl" />

          {/* Icon Top-Right */}
          <div className="absolute top-4 right-4">{item.icon}</div>

          {/* Card Content */}
          <div className="pl-4 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-md font-semibold mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                {item.subtitle}
              </p>
            </div>

            <div className="mt-6">
              <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-lg py-3 text-center">
                <span className="text-2xl font-bold text-gray-100">
                  {item.value}
                </span>
              </div>

              {/* Optional Progress Bar */}
              {item.isProgress && (
                <div className="mt-3 h-2 bg-neutral-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-700"
                    style={{ width: `${item.progressValue || 0}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsGrid;
