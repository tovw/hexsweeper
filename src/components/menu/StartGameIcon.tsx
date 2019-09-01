import React, { FC } from 'react';
import { color } from '../../utils/color';
import { PlayIcon } from '../svgShapes/PlayIcon';

const variants = {
  initial: {
    scale: 0.3,
    translateX: 0,
    translateY: 0,
    fill: color.secondary,
    strokeWidth: '20px',
    stroke: color.text
  }
};

export const StartGameIcon: FC = () => {
  return <PlayIcon variants={variants}></PlayIcon>;
};
