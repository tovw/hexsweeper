import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { color } from '../utils/color';
import { PauseButton } from './PauseButton';
import { TileCounter } from './TileCounter';
import { Timer } from './Timer';

//Difficulty
//TilesLeft

//Timer
//OpenMenu

export const GameInfo: FC = () => {
  return (
    <motion.div
      style={{
        background: color.secondary,
        height: '10vh',
        padding: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      initial={{
        x: 1000,
        y: 0
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
