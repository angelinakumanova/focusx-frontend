import Goal from "./Goal";

export default interface StreakGoal extends Goal {
    type: 'Streak';
    streakDays: number;
}