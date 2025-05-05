import Goal from '@/interfaces/Goal';
import { create } from 'zustand'

type GoalStore = {
  goals: Goal[];
  activeGoal: Goal | null;
  addGoal: (goal: Goal) => void;
  setActiveGoal: (goal: Goal) => void;
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [{title: 'Test', type: 'Session', reward: 'Chocolate'}],
  activeGoal: null,
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  setActiveGoal: (goal) => set({ activeGoal: goal }),
}))
