import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { GameState, GameStatus } from '../../state/gameReducer';
import { Tile } from './Tile';

export const viewBox = { minX: -50, minY: -100, width: 3200, height: 3000 };

const variants = {
  initial: {
    width: '100%',
    filter: 'blur(0px) grayscale(0%)'
  },
  paused: {
    filter: 'blur(5px) grayscale(50%)'
  }
};

export const Board: FC = () => {
  const gridHeight = useSelector((s: GameState) => s.gridHeight);
  const gridWidth = useSelector((s: GameState) => s.gridWidth);
  const isPaused = useSelector((s: GameState) => {
    return !s.timer.isRunning && s.status === GameStatus.STARTED;
  });

  return (
    <motion.svg
      viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="xMinYMid meet"
      variants={variants}
      initial="initial"
      animate={isPaused ? 'paused' : 'initial'}
      exit="out"
    >
      {Array.from({ length: gridHeight * gridWidth }).map((_, i) => {
        return (
          <Tile
            key={i}
            index={i}
            x={i % gridWidth}
            y={Math.floor(i / gridWidth)}
          />
        );
      })}
    </motion.svg>
  );
};
