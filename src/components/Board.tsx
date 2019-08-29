import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { GameState } from '../state/gameReducer';
import { color, mineCountColorMap } from '../utils/color';
import { Tile } from './Tile';
import { motion } from 'framer-motion';

export const viewBox = { minX: -50, minY: -100, width: 3200, height: 3000 };

export const Board: FC = () => {
  const gridHeight = useSelector<{ game: GameState }, number>(
    s => s.game.gridHeight
  );
  const gridWidth = useSelector<{ game: GameState }, number>(
    s => s.game.gridWidth
  );
  const rows = Array.from({ length: gridHeight * gridWidth });

  return (
    <svg
      viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="xMinYMid meet"
      style={{
        width: '100%',
        maxWidth: '50rem',
        height: 'auto',
        background: color.background
      }}
    >
      <motion.linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop
          offset="0%"
          style={{ stopColor: mineCountColorMap[1], stopOpacity: 1 }}
        />
        <stop
          offset="100%"
          style={{ stopColor: mineCountColorMap[6], stopOpacity: 1 }}
        />
      </motion.linearGradient>
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
