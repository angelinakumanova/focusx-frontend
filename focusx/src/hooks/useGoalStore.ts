import Goal from "@/interfaces/Goal";
import goalApi from "@/services/goalApi";
import { create } from "zustand";

type GoalStore = {
  goals: Goal[];
  activeGoal: Goal | null;
  addGoal: (goal: Goal, userId: string) => void;
  removeGoal: (goal: Goal) => void;
  setActiveGoal: (goal: Goal | null) => void;
  setGoals: (goals: Goal[]) => void;
};

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  activeGoal: null,
  addGoal: async (goal, userId) => {
    await goalApi
      .post(`/${userId}`, goal)
      .then(() => set((state) => ({ goals: [...state.goals, goal] })));
  },
  removeGoal: async (goal) => {
    await goalApi
      .delete(`/${goal.id}`)
      .then(() =>
        set((state) => ({ goals: state.goals.filter((g) => g !== goal) }))
      );
  },
  setActiveGoal: (goal) => set({ activeGoal: goal }),
  setGoals: (goals) => set({ goals }),
}));

export async function fetchGoals(userId: string) {
  goalApi.get<Goal[]>(`/${userId}`).then((res) => {
    console.log(res.data);

    useGoalStore.setState({ goals: res.data });
  });
}
