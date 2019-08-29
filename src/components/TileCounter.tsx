import React, { FC } from 'react';
import { Hexagon } from './Hexagon';
import { color } from '../utils/color';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GameState } from '../state/gameReducer';

const getNonMinesLeft = ({
  gridWidth,
  gridHeight,
  totalMineCount,
  neighbourMineCounts
}: GameState): number =>
  gridHeight * gridWidth -
  Object.keys(neighbourMineCounts).length -
  totalMineCount;

export const TileCounter: FC = () => {
  const nonMinesLeft = useSelector<{ game: GameState }, number>(s =>
    getNonMinesLeft(s.game)
  );
  return (
    <svg
      viewBox="0 0 300 260"
      preserveAspectRatio="xMinYMin meet"
      style={{
        height: '100%'
      }}
    >
      <Hexagon style={{ fill: color.tile }} />
      <motion.text
        style={{
          x: 150,
          y: 100,
          textAnchor: 'middle',
          fill: color.background,
          stroke: color.background,
          fontSize: 70,
          userSelect: 'none',
          fontFamily: 'squreSans',
          fontWeight: 'bold'
        }}
      >
        FLIP
      </motion.text>
      <motion.text
        style={{
          x: 150,
          y: 225,
          textAnchor: 'middle',
          fill: color.background,
          stroke: color.background,
          fontSize: 170,
          userSelect: 'none',
          fontFamily: 'digital'
        }}
      >
        {nonMinesLeft}
      </motion.text>
    </svg>
  );
};
