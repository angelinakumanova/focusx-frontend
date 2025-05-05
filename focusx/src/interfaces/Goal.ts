export const typeEnums = ["Session", "Streak"] as const;

export default interface Goal {
    title: string;
    type: (typeof typeEnums[number]);
    reward: string;
}
