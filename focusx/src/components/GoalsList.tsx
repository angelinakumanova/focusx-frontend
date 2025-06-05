import { AnimatePresence } from "motion/react";
import GoalListItem from "./GoalsListItem";
import { useAuthStore } from "@/context/useAuthStore";
import { fetchGoals, useGoalStore } from "@/hooks/useGoalStore";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const GoalsList = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((s) => s.user);
  const goals = useGoalStore((s) => s.goals);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          await fetchGoals(user.id);
        } catch (error) {
          setError(
            "We can't load your goals right now. Please try again later."
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [goals]);

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-2">
        {!isLoading && (
          <h1 className="text-3xl font-bold text-center mb-10">
            {error
              ? error
              : goals.length > 0
              ? "Active Goals"
              : "No current active goals"}
          </h1>
        )}
        {isLoading && (
          <>
            <p className="font-bold">Loading..</p>
            <Spinner width="w-6" />
          </>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {goals?.map((goal, index) => (
          <GoalListItem goal={goal} key={index} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GoalsList;
