import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createToggleTimerAction } from '../state/gameActions';
import { GameState } from '../state/gameReducer';
import { color } from '../utils/color';
import { Hexagon } from './Hexagon';

export const PauseButton: FC = () => {
  const dispatch = useDispatch();
  const pausePlay = () => dispatch(createToggleTimerAction());

  const isRunning = useSelector<{ game: GameState }, boolean>(
    s => s.game.timer.isRunning
  );

  return (
    <svg
      viewBox="0 0 300 260"
      preserveAspectRatio="xMinYMin meet"
      style={{
        height: '100%'
      }}
    >
      <g
        onClick={pausePlay}
        style={{
          cursor: 'pointer'
        }}
      >
        <Hexagon style={{ fill: color.primary, alignSelf: 'flex-end' }} />
        {isRunning && (
          <rect
            x="100"
            y="80"
            height="100"
            width="40"
            fill={color.background}
          ></rect>
        )}
        {isRunning && (
          <rect
            x="160"
            y="80"
            height="100"
            width="40"
            fill={color.background}
          ></rect>
        )}
        {!isRunning && (
          <polygon
            points="100,80 200,130 100,180"
            fill={color.background}
          ></polygon>
        )}
      </g>
    </svg>
  );
};
