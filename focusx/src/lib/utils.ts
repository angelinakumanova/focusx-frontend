import { clsx, type ClassValue } from "clsx"
import { useEffect } from "react";
import { useBlocker } from "react-router-dom";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useNavigationPrompt(shouldBlock: boolean) {
  const blocker = useBlocker(shouldBlock);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirm = window.confirm("You’ll lose your focus session. Continue?");
      if (confirm) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);
}
