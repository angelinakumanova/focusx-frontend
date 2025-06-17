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
  goals: [] as Goal[],
  activeGoal: null,
  addGoal: async (goal, userId) => {
    await goalApi.post(`/${userId}`, goal);
    const res = await goalApi.get<Goal[]>(`/${userId}`);
    set({ goals: res.data });
  },

  removeGoal: async (goal, userId) => {
    await goalApi.delete(`/${goal.id}`);
    await fetchGoals(userId);
  },
  setActiveGoal: (goal) => set({ activeGoal: goal }),
  setGoals: (goals) => set({ goals }),
}));

export async function fetchGoals(userId: string) {
  return goalApi.get<Goal[]>(`/${userId}`).then((res) => {
    useGoalStore.setState({ goals: res.data });
  });
}
