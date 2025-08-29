import { useAuthStore } from "@/context/useAuthStore";
import sessionApi from "@/services/sessionApi";
import { useEffect, useRef, useState } from "react";
import sessionAudio from "@/lib/audio";

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
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userId = useAuthStore.getState().user?.id;

  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [onBreak, setOnBreak] = useState(false);

  const onBreakRef = useRef(onBreak);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const playSound = () => {
    const audio = sessionAudio;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const tick = () => {
    const now = Date.now();

    if (endTimeRef.current) {
      const diff = Math.floor((endTimeRef.current - now) / 1000);

      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(timerRef.current!);
        timerRef.current = null;
        handleSessionEnd();
        document.title = 'FocusX';
      } else {
        setTimeLeft(diff);
        document.title =
          (onBreakRef.current ? "Break | " : "Focusing | ") + formatTime(diff);
      }
    }
  };

  const handleSessionEnd = () => {
    if (!onBreakRef.current) {
      postSession();

      if (currentSet < sets) {
        playSound();
        setOnBreak(true);
        setTimeLeft(breakMinutes * 60);
        endTimeRef.current =
          Math.ceil(Date.now() / 1000) * 1000 + breakMinutes * 60 * 1000;

        startTicking();
      } else {
        setOnBreak(true);
        setIsCompleted(true);
        setIsRunning(false);
        onComplete?.();
      }
    } else {
      playSound();
      setCurrentSet((s) => s + 1);
      setOnBreak(false);
      setTimeLeft(minutes * 60);
      endTimeRef.current =
        Math.ceil(Date.now() / 1000) * 1000 + minutes * 60 * 1000;

      startTicking();
    }
  };

  const startTicking = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(tick, 1000);
  };

  const startTimer = () => {
    playSound();
    const duration = minutes * 60;
    setTimeLeft(duration);
    endTimeRef.current = Math.ceil(Date.now() / 1000) * 1000 + duration * 1000;

    setIsRunning(true);
    setIsPaused(false);
    setCurrentSet(1);
    setOnBreak(false);
    setIsCompleted(false);
    startTicking();
  };

  const pauseResumeTimer = () => {
    setIsPaused((prev) => {
      if (!prev) {
        // Pausing
        const remaining = Math.max(0, endTimeRef.current! - Date.now());
        setTimeLeft(Math.floor(remaining / 1000));
        clearInterval(timerRef.current!);
        timerRef.current = null;
      } else {
        // Resuming
        endTimeRef.current =
          Math.ceil(Date.now() / 1000) * 1000 + timeLeft * 1000;
        startTicking();
      }
      return !prev;
    });
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    setCurrentSet(1);
    setIsCompleted(false);
    setOnBreak(false);
    clearInterval(timerRef.current!);
    timerRef.current = null;
    endTimeRef.current = null;

    document.title = 'FocusX';
  };

  const postSession = async () => {
    if (!userId) return;

    try {
      await sessionApi.post("", {
        minutes,
        userId,
        userTimezone,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const formatTime = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    onBreakRef.current = onBreak;
  }, [onBreak]);

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
