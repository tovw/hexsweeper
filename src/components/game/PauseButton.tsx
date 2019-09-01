import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createToggleTimerAction } from '../../state/gameActions';
import { GameState, GameStatus } from '../../state/gameReducer';
import { color } from '../../utils/color';
import { Hexagon } from '../svgShapes/Hexagon';

const pauseBarVariants = {
  initial: (x: number) => ({
    fill: color.background,
    height: 100,
    width: 40,
    x,
    y: 80
  }),
  hover: () => ({
    fill: color.secondary
  })
};

export const PauseButton: FC = () => {
  const dispatch = useDispatch();
  const toggleTimer = () => dispatch(createToggleTimerAction());

  const isRunning = useSelector((s: GameState) => s.timer.isRunning);
  const isGameStarted = useSelector(
    (s: GameState) => s.status === GameStatus.STARTED
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
        <motion.g
          onClick={toggleTimer}
          style={{
            cursor: 'pointer'
          }}
          initial="initial"
          whileHover="hover"
        >
          <Hexagon style={{ fill: color.primary }} />
          {isRunning ? (
            <motion.g>
              <motion.rect
                variants={pauseBarVariants}
                custom={100}
              ></motion.rect>
              <motion.rect
                variants={pauseBarVariants}
                custom={160}
              ></motion.rect>
            </motion.g>
          ) : (
            <motion.polygon
              points="120,80 220,130 120,180"
              fill={color.background}
              animate={{
                scale: [1, 1.3],
                fill: [color.background, color.secondary],
                transition: {
                  duration: 1.2,
                  yoyo: Infinity
                }
              }}
            ></motion.polygon>
          )}
        </motion.g>
      )}
    </svg>
  );
};
