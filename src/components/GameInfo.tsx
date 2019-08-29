import React, { FC } from 'react';
import { color } from '../utils/color';
import { Timer } from './Timer';
import { TileCounter } from './TileCounter';
import { PauseButton } from './PauseButton';

//Difficulty
//TilesLeft

//Timer
//OpenMenu

export const GameInfo: FC = () => {
  return (
    <div
      style={{
        background: color.background,
        height: '10vh',
        padding: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <TileCounter></TileCounter>
      <Timer />
      <PauseButton />
    </div>
  );
};
