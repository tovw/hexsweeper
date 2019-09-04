import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  createNewGameAction,
  createToggleDifficultyAction
} from '../../state/gameActions';
import { color } from '../../utils/color';
import { GithubLogo } from '../svgShapes/GithubLogo';
import { PlayIcon } from '../svgShapes/PlayIcon';
import { DifficultyIcon } from './DifficultyIcon';
import { MenuItem } from './MenuItem';

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
      initial="initial"
      animate="in"
      exit="out"
    >
      <MenuItem
        inFrom={{ x: -300, y: 150 }}
        to={{ x: 115, y: 150 }}
        Icon={() => (
          <PlayIcon
            initial={{
              scale: 0.3,
              translateX: 0,
              translateY: 0,
              fill: color.secondary,
              strokeWidth: '20px',
              stroke: color.text
            }}
          ></PlayIcon>
        )}
        onClick={newGame}
      />
      <MenuItem
        inFrom={{ x: 800, y: 150 }}
        to={{ x: 425, y: 150 }}
        Icon={DifficultyIcon}
        onClick={toggleDifficulty}
      />
      <a
        href="https://github.com/tovw/hexsweeper"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MenuItem
          inFrom={{ x: 270, y: 810 }}
          to={{ x: 270, y: 410 }}
          Icon={GithubLogo}
          onClick={() => null}
        />
      </a>
    </motion.svg>
  );
};
