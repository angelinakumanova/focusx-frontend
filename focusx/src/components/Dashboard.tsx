import { motion } from "framer-motion";
import GoalForm from "./GoalForm";
import GoalsList from "./GoalsList";
import StatisticsGrid from "./StatisticsGrid";
import { useAuthStore } from "@/context/useAuthStore";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="bg-neutral-950 text-gray-100 min-h-screen w-full px-6 py-10 sm:px-10 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl font-bold sm:text-4xl  mb-2">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          What will you focus on today?
        </p>
      </motion.div>

      {/* Overview Grid */}
      <StatisticsGrid />

      {/* Goals List */}
      <GoalsList />

      <hr className="my-8 opacity-50" />

      {/* New Goal Form */}
      <GoalForm />
    </div>
  );
}
