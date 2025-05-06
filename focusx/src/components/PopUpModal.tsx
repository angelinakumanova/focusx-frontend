import { motion } from "motion/react";

interface Props {
  title: string;
  subtitle?: string;
  confirmText: string;
  toggleVisibility: () => void;
  confirmFn: () => void;
}

const PopUpModal = ({
  title,
  subtitle,
  confirmText,
  toggleVisibility,
  confirmFn,
}: Props) => {
  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0, y: -10 }}
      exit={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
    >
      <div className="text-left bg-neutral-900 text-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-3 ">{title}</h2>
        <p className="text-sm text-gray-400 mb-6">
          {subtitle || 'This action cannot be undone. Are you sure you want to continue?'}
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer transition-colors text-sm"
            onClick={() => toggleVisibility()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 hover:cursor-pointer transition-colors text-sm"
            onClick={() => {
              toggleVisibility();
              confirmFn();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PopUpModal;
