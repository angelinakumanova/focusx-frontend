import Goal from "./Goal";

export default interface SessionGoal extends Goal {
    type: 'Session';
    sets: number;
    minutesPerSet: number;
    completedMinutes: number;
}

