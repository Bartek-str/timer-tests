import { useEffect, useState } from "react";

export const useCountDown = ({ seconds = 30 }: { seconds: number }) => {
  const [timeStarted, setTimeStarted] = useState(new Date().getTime());
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setTimeStarted(new Date().getTime());

    const timeout = setTimeout(() => setIsFinished(true), seconds * 1000);

    const interval = setInterval(() => {
      setTimeLeft(
        Math.ceil(
          (seconds * 1000 - (new Date().getTime() - timeStarted)) / 1000
        )
      );
      if (timeLeft === 0 || timeLeft < 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return {
    timeLeft,
    isFinished,
  };
};
