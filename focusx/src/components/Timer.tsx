import { useEffect, useState } from "react";

export const FocusTimer: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);
  const [sets, setSets] = useState<number>(4);

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [onBreak, setOnBreak] = useState<boolean>(false);

  const startTimer = () => {
    setTimeLeft(minutes * 60);
    setIsRunning(true);
    setCurrentSet(1);
    setOnBreak(false);
  };

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      if (!onBreak) {
        if (currentSet < sets) {
          setOnBreak(true);
          setTimeLeft(breakMinutes * 60);
        } else {
          setIsRunning(false);
        }
      } else {
        setCurrentSet((s) => s + 1);
        setOnBreak(false);
        setTimeLeft(minutes * 60);
      }
    }
  }, [timeLeft, isRunning, onBreak, currentSet, sets, minutes, breakMinutes]);

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
          <button
            onClick={() => setIsRunning(false)}
            className="mt-10 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition text-white text-sm"
          >
            Stop Session
          </button>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6">Start a Focus Session</h2>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <TimeSelect label="Work (min)" value={minutes} onChange={setMinutes} options={[1, 15, 20, 25, 30, 35, 40, 45, 60]} />
            <TimeSelect label="Break (min)" value={breakMinutes} onChange={setBreakMinutes} options={[3, 5, 10, 15]} />
            <TimeSelect label="Sets" value={sets} onChange={setSets} options={[1, 2, 3, 4, 5]} />
          </div>
          <button
            onClick={startTimer}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 rounded-2xl text-lg font-semibold transition text-white"
          >
            Start Focus
          </button>
        </>
      )}
    </div>
  );
};

type TimeSelectProps = {
  label: string;
  value: number;
  onChange: (val: number) => void;
  options: number[];
};

const TimeSelect: React.FC<TimeSelectProps> = ({ label, value, onChange, options }) => (
  <div className="flex flex-col items-center">
    <label className="text-sm text-gray-400 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="bg-neutral-800 text-white rounded-lg px-4 py-2 focus:outline-none w-24 text-center"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
