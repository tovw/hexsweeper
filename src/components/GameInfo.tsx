import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { color } from '../utils/color';
import { PauseButton } from './PauseButton';
import { TileCounter } from './TileCounter';
import { Timer } from './Timer';

export const GameInfo: FC = () => {
  return (
    <motion.div
      style={{
        background: color.background,
        padding: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        height: '100%'
      }}
      initial={{
        x: 0,
        y: -1000
      }}
      animate={{
        x: 0,
        y: 0
      }}
    >
      <TileCounter></TileCounter>
      <Timer />
      <PauseButton />
    </motion.div>
  );
};
