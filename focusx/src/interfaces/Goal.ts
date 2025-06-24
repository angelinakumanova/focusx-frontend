export const typeEnums = ["SESSION", "STREAK"] as const;

export default interface Goal {
  id: string;
  title: string;
  type: (typeof typeEnums)[number];
  sets: number;
  duration: number;
  days: number;
  progress: number;
  reward: string;
}
