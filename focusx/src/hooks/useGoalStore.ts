import Goal from "@/interfaces/Goal";
import goalApi from "@/services/goalApi";
import { create } from "zustand";

type GoalStore = {
  goals: Goal[];
  activeGoal: Goal | null;
  addGoal: (goal: Goal, userId: string) => void;
  removeGoal: (goal: Goal, userId: string) => void;
  setActiveGoal: (goal: Goal | null) => void;
  setGoals: (goals: Goal[]) => void;
};

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  activeGoal: null,
  addGoal: async (goal, userId) => {
    await goalApi.post(`/${userId}`, goal);
    await fetchGoals(userId);
  },

  removeGoal: async (goal, userId) => {
    await goalApi.delete(`/${goal.id}`);
    await fetchGoals(userId);
  },
  setActiveGoal: async (goal) => {
    set({ activeGoal: goal });
    await goalApi.put(`/${goal?.id}/track`);
  },
  setGoals: (goals) => set({ goals }),
}));

export async function fetchGoals(userId: string) {
  const res = await goalApi.get(`/${userId}`);
  const data = res.data;
  
  if (Array.isArray(data)) {
    useGoalStore.setState({ goals: data });
    await fetchTrackingGoal(userId);
    
  } 
  // else {
  //   useGoalStore.setState({ goals: [] });
  //   useGoalStore.setState({ activeGoal: null })
  // }
}

async function fetchTrackingGoal(userId: string) {
  const res = await goalApi.get(`/${userId}/tracking-goal`);
  const goal = res.data as Goal;

  useGoalStore.setState({ activeGoal: goal});
  localStorage.setItem("goal", JSON.stringify(goal));
  
}

