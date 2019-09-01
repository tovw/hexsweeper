import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  createNewGameAction,
  createToggleDifficultyAction
} from '../../state/gameActions';
import { DifficultyIcon } from './DifficultyIcon';
import { MenuItem } from './MenuItem';
import { StartGameIcon } from './StartGameIcon';

export const Menu: FC = () => {
  const dispatch = useDispatch();

  const toggleDifficulty = () => dispatch(createToggleDifficultyAction());
  const newGame = () => dispatch(createNewGameAction());

  return (
    <motion.svg
      viewBox="0 0 800 800"
      preserveAspectRatio="xMinYMid meet"
      style={{
        width: '100%',
        maxWidth: '50rem',
        height: 'auto',
        rotate: 0,
        originX: 0.5,
        originY: 0.5,
        scale: 1
      }}
    >
      <MenuItem
        inFrom={{ x: -300, y: 150 }}
        to={{ x: 115, y: 150 }}
        Icon={StartGameIcon}
        onClick={newGame}
      />
      <MenuItem
        inFrom={{ x: 800, y: 150 }}
        to={{ x: 425, y: 150 }}
        Icon={DifficultyIcon}
        onClick={toggleDifficulty}
      />
    </motion.svg>
  );
};

export interface Coord {
  x: number;
  y: number;
}
