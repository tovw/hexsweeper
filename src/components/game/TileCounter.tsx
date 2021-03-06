import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { GameState } from '../../state/gameReducer';
import { color } from '../../utils/color';
import { Hexagon } from '../svgShapes/Hexagon';

const getNonMinesLeft = ({
  gridWidth,
  gridHeight,
  difficulty,
  difficultyMineCounts,
  tileStates: neighbourMineCounts
}: GameState): number =>
  gridHeight * gridWidth -
  Object.keys(neighbourMineCounts).length -
  difficultyMineCounts[difficulty];

export const TileCounter: FC = () => {
  const nonMinesLeft = useSelector(getNonMinesLeft);
  return (
    <div style={{ flex: '0 1 20%' }}>
      <svg
        viewBox="0 0 300 260"
        preserveAspectRatio="xMinYMin meet"
        style={{
          height: '80%'
        }}
      >
        <motion.g>
          <Hexagon style={{ fill: color.primary }} />
          <motion.text
            style={{
              x: 150,
              y: 100,
              textAnchor: 'middle',
              fill: color.secondary,

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
        </motion.g>
      </svg>
    </div>
  );
};
