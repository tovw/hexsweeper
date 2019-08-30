import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createToggleTimerAction } from '../state/gameActions';
import { GameState, GameStatus } from '../state/gameReducer';
import { color } from '../utils/color';
import { Hexagon } from './Hexagon';
import { motion } from 'framer-motion';

export const PauseButton: FC = () => {
  const dispatch = useDispatch();
  const toggleTimer = () => dispatch(createToggleTimerAction());

  const isRunning = useSelector<{ game: GameState }, boolean>(
    s => s.game.timer.isRunning
  );
  const isGameStarted = useSelector<{ game: GameState }, boolean>(
    s => s.game.status === GameStatus.STARTED
  );

  return (
    <svg
      viewBox="0 0 300 260"
      preserveAspectRatio="xMinYMin meet"
      style={{
        height: '100%'
      }}
    >
      {isGameStarted && (
        <g
          onClick={toggleTimer}
          style={{
            cursor: 'pointer'
          }}
        >
          <Hexagon style={{ fill: color.primary, alignSelf: 'flex-end' }} />
          {isRunning && (
            <rect
              x="100"
              y="80"
              height="100"
              width="40"
              fill={color.background}
            ></rect>
          )}
          {isRunning && (
            <rect
              x="160"
              y="80"
              height="100"
              width="40"
              fill={color.background}
            ></rect>
          )}
          {!isRunning && (
            <motion.polygon
              points="120,80 220,130 120,180"
              fill={color.background}
              animate={{
                scale: [1, 1.3],
                fill: [color.background, color.secondary],
                transition: {
                  duration: 3,
                  yoyo: Infinity
                }
              }}
            ></motion.polygon>
          )}
        </g>
      )}
    </svg>
  );
};
