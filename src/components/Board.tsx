import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { GameState, GameStatus } from '../state/gameReducer';
import { color } from '../utils/color';
import { Tile } from './Tile';

export const viewBox = { minX: -50, minY: -100, width: 3200, height: 3000 };

export const Board: FC = () => {
  const gridHeight = useSelector<{ game: GameState }, number>(
    s => s.game.gridHeight
  );
  const gridWidth = useSelector<{ game: GameState }, number>(
    s => s.game.gridWidth
  );
  const isPaused = useSelector<{ game: GameState }, boolean>(s => {
    return !s.game.timer.isRunning && s.game.status === GameStatus.STARTED;
  });

  const rows = Array.from({ length: gridHeight * gridWidth });

  return (
    <svg
      viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="xMinYMid meet"
      style={{
        width: '100%',
        maxWidth: '50rem',
        height: 'auto',
        background: color.background,
        filter: isPaused ? 'blur(5px) grayscale(50%)' : ''
      }}
    >
      {rows.map((_, i) => {
        return (
          <Tile
            key={i}
            index={i}
            x={i % gridWidth}
            y={Math.floor(i / gridWidth)}
          />
        );
      })}
    </svg>
  );
};
