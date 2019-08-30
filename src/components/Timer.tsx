import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GameState } from '../state/gameReducer';
import { color } from '../utils/color';

export const formatTime = (nanoSeconds: number) => {
  const seconds = Math.floor(nanoSeconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const leftOverSeconds = seconds % 60;

  return `${minutes < 10 ? '0' + minutes : minutes}:${
    leftOverSeconds < 10 ? '0' + leftOverSeconds : leftOverSeconds
  }`;
};

export const Timer: FC = () => {
  const startedAt = useSelector<{ game: GameState }, number>(
    s => s.game.timer.startedAt
  );
  const isRunning = useSelector<{ game: GameState }, boolean>(
    s => s.game.timer.isRunning
  );

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(
        () => setElapsedTime(Date.now() - startedAt),
        1000
      );
      return () => clearInterval(interval);
    }
  }, [startedAt, isRunning]);

  return (
    <div style={{ height: '100%', alignSelf: 'center' }}>
      <h2
        style={{
          fontFamily: 'digital',
          fontSize: 70,
          margin: '0 auto',
          userSelect: 'none',
          color: color.primary
        }}
      >
        {formatTime(elapsedTime)}
      </h2>
    </div>
  );
};
