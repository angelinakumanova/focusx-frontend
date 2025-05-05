import Goal from "@/interfaces/Goal";
import { create } from "zustand";

type GoalStore = {
  goals: Goal[];
  activeGoal: Goal | null;
  addGoal: (goal: Goal) => void;
  removeGoal: (goal: Goal) => void;
  setActiveGoal: (goal: Goal) => void;
};

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [
    {
      title: "Test",
      type: "Session",
      reward: "Chocolate",
      sets: 5,
      minutesPerSet: 50,
    },
  ],
  activeGoal: null,
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  removeGoal: (goal) =>
    set((state) => ({ goals: state.goals.filter((g) => g !== goal) })),
  setActiveGoal: (goal) => set({ activeGoal: goal }),
}));
