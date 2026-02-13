import { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

export const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = differenceInSeconds(targetDate, new Date());
      return difference > 0 ? difference : 0;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    timeLeft,
    minutes,
    seconds,
    formatted: `${minutes}:${seconds.toString().padStart(2, '0')}`,
    isExpired: timeLeft === 0,
  };
};
