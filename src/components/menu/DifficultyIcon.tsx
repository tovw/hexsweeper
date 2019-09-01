import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { Difficulty, GameState } from '../../state/gameReducer';
import { color } from '../../utils/color';
import { Hexagon } from '../svgShapes/Hexagon';

const positions = {
  1: [{ x: -20, y: 20 }, { x: 5, y: 45 }, { x: 30, y: 70 }],
  2: [{ x: -20, y: 20 }, { x: -45, y: -5 }, { x: -20, y: 20 }],
  3: [{ x: -20, y: 20 }, { x: -45, y: -5 }, { x: -70, y: -30 }]
};

const variants = {
  initial: ({ key, selected }: { key: 1 | 2 | 3; selected: Difficulty }) => ({
    translateX: positions[key][selected].x,
    translateY: positions[key][selected].y,
    stroke: color.text,
    strokeWidth: 20,
    fill: color.secondary
  }),
  animate: ({ key, selected }: { key: 1 | 2 | 3; selected: Difficulty }) => ({
    translateX: positions[key][selected].x,
    translateY: positions[key][selected].y
  })
};

export const DifficultyIcon: React.FC = () => {
  const selected = useSelector((s: GameState) => s.difficulty);
  return (
    <motion.g initial={{ scale: 0.35 }}>
      <Hexagon
        initial={variants.initial({ key: 1, selected })}
        animate={variants.animate({ key: 1, selected })}
      ></Hexagon>
      <Hexagon
        initial={variants.initial({ key: 2, selected })}
        animate={variants.animate({ key: 2, selected })}
      ></Hexagon>
      <Hexagon
        initial={variants.initial({ key: 3, selected })}
        animate={variants.animate({ key: 3, selected })}
      ></Hexagon>
    </motion.g>
  );
};
