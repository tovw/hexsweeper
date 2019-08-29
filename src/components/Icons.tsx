import { motion, MotionProps } from 'framer-motion';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { GameState } from '../state/gameReducer';
import { color } from '../utils/color';
import { Hexagon } from './Hexagon';

const playPoints = '0,0 300,150 0,300';

export const PlayIcon: React.FC<MotionProps> = (props: MotionProps) => {
  return (
    <motion.polygon
      points={playPoints}
      initial={{
        scale: 0.3,
        translateX: 0,
        translateY: 0,
        fill: color.secondary,
        strokeWidth: '20px',
        stroke: color.text
      }}
      {...props}
    />
  );
};

export const DifficultyHexes: React.FC<MotionProps> = props => {
  const selected = useSelector<{ game: GameState }, 0 | 1 | 2>(
    s => s.game.difficulty
  );

  const positions = {
    1: [{ x: -20, y: 20 }, { x: 5, y: 45 }, { x: 30, y: 70 }],
    2: [{ x: -20, y: 20 }, { x: -45, y: -5 }, { x: -20, y: 20 }],
    3: [{ x: -20, y: 20 }, { x: -45, y: -5 }, { x: -70, y: -30 }]
  };

  return (
    <motion.g
      initial={{ scale: 0.35, rotate: 0 }}
      animate={{ rotate: selected }}
      {...props}
    >
      <Hexagon
        initial={{
          translateX: -20,
          translateY: 20,
          stroke: color.text,
          strokeWidth: 20,
          fill: color.secondary
        }}
        animate={{
          translateX: positions[1][selected].x,
          translateY: positions[1][selected].y
        }}
      ></Hexagon>
      <Hexagon
        initial={{
          translateX: -20,
          translateY: 20,
          stroke: color.text,
          strokeWidth: 20,
          fill: color.secondary
        }}
        animate={{
          translateX: positions[2][selected].x,
          translateY: positions[2][selected].y
        }}
      ></Hexagon>
      <Hexagon
        initial={{
          translateX: -20,
          translateY: 20,
          stroke: color.text,
          strokeWidth: 20,
          fill: color.secondary
        }}
        animate={{
          translateX: positions[3][selected].x,
          translateY: positions[3][selected].y
        }}
      ></Hexagon>
    </motion.g>
  );
};
