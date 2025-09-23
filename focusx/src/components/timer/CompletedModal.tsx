import { IconConfetti } from "@tabler/icons-react";
import { motion } from "motion/react";

interface Props {
  onClose: () => void;
}

const CompletedModal = ({ onClose }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 bg-black/80  flex items-center justify-center z-50"
    >
      <div className="bg-neutral-900 rounded-2xl px-8 py-10 shadow-xl max-w-md w-full text-center border border-white/10">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-5xl">
            <IconConfetti className="w-12 h-12 text-yellow-400 animate-bounce" />
          </div>

          <h2 className="text-3xl font-bold text-white">Focus Completed</h2>

          <p className="text-base text-zinc-300">
            You've finished all your focus sets. Take a break or start another
            session when you're ready.
          </p>

          <button
            onClick={onClose}
            className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-zinc-500 to-zinc-600
                   text-white font-medium rounded-xl hover:scale-110 hover:cursor-pointer transition-transform duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CompletedModal;
