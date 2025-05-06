import { useEffect, useState } from "react";
import PopUpModal from "./PopUpModal";
import { IconConfetti } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";

export const FocusTimer: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);
  const [sets, setSets] = useState<number>(4);

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [onBreak, setOnBreak] = useState<boolean>(false);

  const [isModalOpen, setModalVisibility] = useState(false);

  const startTimer = () => {
    setTimeLeft(minutes * 60);
    setIsRunning(true);
    setIsPaused(false);
    setCurrentSet(1);
    setOnBreak(false);
  };

  useEffect(() => {
    if (!isRunning || isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning && !isPaused && !isCompleted) {
      if (!onBreak) {
        if (currentSet < sets) {
          setOnBreak(true);
          setTimeLeft(breakMinutes * 60);
        } else {
          setIsRunning(false);
          setIsCompleted(true); // ✅ mark completed
        }
      } else {
        setCurrentSet((s) => s + 1);
        setOnBreak(false);
        setTimeLeft(minutes * 60);
      }
    }
  }, [
    timeLeft,
    isRunning,
    isPaused,
    onBreak,
    currentSet,
    sets,
    minutes,
    breakMinutes,
    isCompleted,
  ]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // This shows the browser's default warning
    };

    if (isRunning) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isRunning]);

  const formatTime = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-screen bg-neutral-950 flex flex-col items-center justify-center text-center text-white px-4">
      {isRunning ? (
        <>
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">
            {onBreak ? "Break Time" : "Focus Time"} • Set {currentSet}/{sets}
          </p>
          <h1 className="text-[120px] font-bold font-mono leading-none drop-shadow-lg">
            {formatTime(timeLeft)}
          </h1>
          <div className="flex gap-4 mt-10">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer rounded-xl font-semibold transition text-white text-sm"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={() => {
                setModalVisibility(!isModalOpen);
                setIsPaused(true);
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 hover:cursor-pointer rounded-xl font-semibold transition text-white text-sm"
            >
              Stop Session
            </button>

            {isModalOpen && (
              <PopUpModal
                title="Are you sure you want to end the session?"
                subtitle="Your current progress will be discarded and can’t be recovered."
                confirmText="End Session"
                toggleVisibility={() => setModalVisibility(!isModalOpen)}
                confirmFn={() => setIsRunning(false)}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6">Start a Focus Session</h2>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <TimeSelect
              label="Work (min)"
              value={minutes}
              onChange={setMinutes}
            />
            <TimeSelect
              label="Break (min)"
              value={breakMinutes}
              onChange={setBreakMinutes}
            />
            <TimeSelect label="Sets" value={sets} onChange={setSets} />
          </div>
          <button
            onClick={startTimer}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 hover:cursor-pointer rounded-2xl text-lg font-semibold transition text-white"
          >
            Start Focus
          </button>
        </>
      )}

      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-zinc-800/95 flex items-center justify-center z-50"
          >
            <div className="text-center">
              <span className="flex flex-col justify-center items-center">
                <IconConfetti />
                <h2 className="text-4xl font-bold text-white mb-4">
                  Session Complete!
                </h2>
              </span>

              <p className="text-lg font-medium text-white mb-6">
                You've finished all sets. Great job!
              </p>
              <button
                onClick={() => setIsCompleted(false)}
                className="px-6 py-3 bg-white text-zinc-900 font-semibold rounded-lg hover:bg-gray-200 hover:cursor-pointer transition duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type TimeSelectProps = {
  label: string;
  value: number;
  onChange: (val: number) => void;
};

const TimeSelect: React.FC<TimeSelectProps> = ({ label, value, onChange }) => (
  <div className="flex flex-col items-center">
    <label className="text-sm text-gray-400 mb-1">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="bg-neutral-800 text-white rounded-lg px-4 py-2 focus:outline-none w-24 text-center"
    />
  </div>
);
