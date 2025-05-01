export default interface Goal {
    title: string;
    type: "Session" | "Streak";
    streakDays?: number;
    sets?: number;
    minutesPerSet?: number;
    reward: string;

}
