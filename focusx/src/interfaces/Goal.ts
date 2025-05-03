export default interface Goal {
    title: string;
    type: "Session" | "Streak";
    streakDays?: number;
    sets?: number;
    minutesPerSet?: number;
    reward: string;
    isActive: boolean;
}

export function calculateProgress(goal: Goal): number {
    if (goal.type === "Streak" && goal.streakDays !== undefined) {
      return goal.streakDays; // Return streak days as progress for Streak goals
    }
  
    if (goal.type === "Session" && goal.sets !== undefined && goal.minutesPerSet !== undefined) {
      return goal.sets * goal.minutesPerSet; // Return total minutes as progress for Session goals
    }
  
    return 0; 
  }
