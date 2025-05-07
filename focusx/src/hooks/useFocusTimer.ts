import { useEffect, useRef, useState } from "react";

export interface FocusTimerOptions {
  minutes: number;
  breakMinutes: number;
  sets: number;
  onComplete?: () => void;
}

export const useFocusTimer = ({
  minutes,
  breakMinutes,
  sets,
  onComplete,
}: FocusTimerOptions) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [onBreak, setOnBreak] = useState(false);

  const sessionAudioRef = useRef(new Audio("/src/assets/sounds/session-start-and-break-sound.mp3"));

  const playSound = () => {
    const audio = sessionAudioRef.current;
    audio.currentTime = 0;
    audio.play().catch(() => {}); // catch autoplay errors
  };

  const startTimer = () => {
    playSound();
    setTimeLeft(minutes * 60);
    setIsRunning(true);
    setIsPaused(false);
    setCurrentSet(1);
    setOnBreak(false);
    setIsCompleted(false);
  };

  const pauseResumeTimer = () => {
    setIsPaused((prev) => !prev);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    setCurrentSet(1);
    setIsCompleted(false);
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
        playSound();
        if (currentSet < sets) {
          setOnBreak(true);
          setTimeLeft(breakMinutes * 60);
        } else {
          setIsCompleted(true);
          setIsRunning(false);
          onComplete?.();
        }
      } else {
        setCurrentSet((s) => s + 1);
        setOnBreak(false);
        setTimeLeft(minutes * 60);
      }
    }
  }, [timeLeft, isRunning, isPaused, isCompleted, onBreak, currentSet, sets, minutes, breakMinutes]);

  const formatTime = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return {
    timeLeft,
    isRunning,
    isPaused,
    isCompleted,
    currentSet,
    onBreak,
    formatTime,
    startTimer,
    pauseResumeTimer,
    stopTimer,
    setIsCompleted,
  };
};
