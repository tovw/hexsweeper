import React, { FC } from 'react';
import { Hexagon } from './Hexagon';
import { color } from '../utils/color';
import { useDispatch } from 'react-redux';
import { createPauseAction } from '../state/gameActions';

export const PauseButton: FC = () => {
  const dispatch = useDispatch();
  const pause = () => dispatch(createPauseAction());

  return (
    <svg
      viewBox="0 0 300 260"
      preserveAspectRatio="xMinYMin meet"
      style={{
        height: '100%'
      }}
    >
      <g onClick={pause}>
        <Hexagon style={{ fill: color.tile, alignSelf: 'flex-end' }} />
        <rect
          x="100"
          y="80"
          height="100"
          width="40"
          fill={color.background}
        ></rect>
        <rect
          x="160"
          y="80"
          height="100"
          width="40"
          fill={color.background}
        ></rect>
      </g>
    </svg>
  );
};
