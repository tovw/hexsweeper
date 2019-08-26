import React, { FC } from 'react';
import { Tile } from './Tile';

export const Board: FC = () => {
  const gridWidth = 13;
  const gridHeight = 10;
  const rows = Array.from({ length: gridHeight * gridWidth });

  return (
    <svg
      viewBox="-50 -100 3200 3000"
      preserveAspectRatio="xMinYMid meet"
      style={{
        width: '100%',
        maxWidth: '50rem',
        height: 'auto',
        background: '#888'
      }}
    >
      {rows.map((_, i) => {
        return <Tile key={i} x={i % gridWidth} y={Math.floor(i / gridWidth)} />;
      })}
    </svg>
  );
};
