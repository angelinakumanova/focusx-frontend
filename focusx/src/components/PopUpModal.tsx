import { motion } from "motion/react";

interface Props {
  title: string;
  confirmText: string;
  cancelText: string;
  toggleVisibility: () => void;
  isOpen: boolean;
}

const PopUpModal = ({
  title,
  confirmText,
  cancelText,
  toggleVisibility,
  isOpen,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-neutral-900 text-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="text-sm text-gray-400 mb-6">
          This action cannot be undone. Are you sure you want to continue?
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition-colors text-sm"
            onClick={toggleVisibility}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors text-sm"
            onClick={toggleVisibility}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PopUpModal;
