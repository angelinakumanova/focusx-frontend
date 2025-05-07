import { useFocusTimer } from "@/hooks/useFocusTimer";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import PopUpModal from "../PopUpModal";
import CompletedModal from "./CompletedModal";
import TimeSelect from "./TimeSelect";

const FocusTimer = () => {
  const [minutes, setMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);
  const [sets, setSets] = useState<number>(4);

  const [isModalOpen, setModalVisibility] = useState(false);

  const {
    isRunning,
    currentSet,
    onBreak,
    formatTime,
    timeLeft,
    isPaused,
    pauseResumeTimer,
    startTimer,
    stopTimer,
    isCompleted,
    setIsCompleted
  } = useFocusTimer({ minutes, breakMinutes, sets });

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
              onClick={pauseResumeTimer}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer rounded-xl font-semibold transition text-white text-sm"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={() => {
                setModalVisibility(!isModalOpen);
                pauseResumeTimer();
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
                confirmFn={stopTimer}
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
          <CompletedModal onClose={() => setIsCompleted(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FocusTimer;

