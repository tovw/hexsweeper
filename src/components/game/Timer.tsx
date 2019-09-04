import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GameState } from '../../state/gameReducer';
import { color } from '../../utils/color';

export const formatTime = (nanoSeconds: number) => {
  const seconds = Math.floor(nanoSeconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const leftOverSeconds = seconds % 60;
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    leftOverSeconds < 10 ? '0' + leftOverSeconds : leftOverSeconds
  }`;
};

export const useElapsedTime = () => {
  const { startedAt, isRunning, pausedAt } = useSelector(
    (s: GameState) => s.timer
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(
        () => setElapsedTime(Date.now() - startedAt),
        1000
      );
      return () => clearInterval(interval);
    } else {
      setElapsedTime(pausedAt - startedAt);
    }
  }, [startedAt, isRunning, pausedAt]);
  return elapsedTime;
};

export const useFormattedElapsedTime = () => formatTime(useElapsedTime());

export const DigitalClock: FC<{ time: string }> = ({ time }) => (
  <div
    style={{
      color: color.primary,
      justifySelf: 'center',
      alignSelf: 'center',
      flex: '1 1 auto'
    }}
  >
    <motion.h2
      style={{
        userSelect: 'none',
        fontFamily: 'digital',
        fontSize: 70,
        margin: '0 0',
        textAlign: 'center'
      }}
    >
      {time}
    </motion.h2>
  </div>
);

export const Timer: FC = () => {
  const time = useFormattedElapsedTime();
  return <DigitalClock time={time} />;
};
