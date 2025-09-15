import { useGoalStore } from "@/hooks/useGoalStore";
import { IconCircleCheck, IconClock, IconFlame } from "@tabler/icons-react";
import { JSX, useEffect, useState } from "react";
import {
  calculateProgress,
  formatMinutesToHoursAndMinutes,
} from "./GoalsListItem";
import sessionApi from "@/services/sessionApi";
import { useAuthStore } from "@/context/useAuthStore";
import userApi from "@/services/userApi";

type GridItem = {
  title: string;
  subtitle: string;
  value: string;
  icon: JSX.Element;
  isProgress?: boolean;
  progressValue?: number;
};

const StatisticsGrid = () => {
  const activeGoal = useGoalStore((s) => s.activeGoal);

  const user = useAuthStore((s) => s.user);
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    if (!user) return;

    const fetchSessionDuration = async () => {
        try {
          const response = await sessionApi.get(`/${user.id}/today`, {
            headers: {
              "User-Timezone": userTimezone,
            },
          });
          setSessionDuration(response.data);
        } catch (err) {}
    };

    const fetchStreak = async () => {
        try {
          const response = await userApi.get(`/users/${user.id}/streak`, {
            headers: {
              "timezone": userTimezone,
            },
          });
          setStreak(response.data);
          
        } catch (err) {}
      };
      
      fetchSessionDuration();
      fetchStreak();
  }, []);

  const lastSession = {
    title: "Today's Focus",
    subtitle: "Total Duration",
    value:
      sessionDuration !== 0 && sessionDuration
        ? formatMinutesToHoursAndMinutes(sessionDuration)
        : "--",
    icon: <IconClock className="w-5 h-5 text-neutral-500" />,
  };

  const currentStreak = {
    title: "Current Streak",
    subtitle: "Days",
    value: streak !== 0 ? `${streak} Days` : "--",
    icon: <IconFlame className="w-5 h-5 text-orange-500" />,
  };

  const goal = {
    title: "Goal Progress",
    subtitle: activeGoal ? activeGoal.title : "No Active Goal",
    value: activeGoal ? `${calculateProgress(activeGoal)}%` : "--",
    icon: <IconCircleCheck className="w-5 h-5 text-green-500" />,
    isProgress: true,
    progressValue: activeGoal ? calculateProgress(activeGoal) : 0,
  };

  const items: GridItem[] = [lastSession, currentStreak, goal];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      {items.map((item, i) => (
        <div
          key={i}
          className="relative bg-neutral-900 p-5 rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-neutral-500 to-neutral-700 rounded-l-xl" />

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
