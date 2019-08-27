import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../state/gameActions';
import { GameState } from '../state/gameReducer';
import { Hexagon } from './Hexagon';

interface TileProps {
  x: number;
  y: number;
  index: number;
}

//flat top 300*260 hexagon
const indexToGridCoordinateTransform = (x: number, y: number) => ({
  translateX: 235 * x,
  translateY: y * 275 + (x % 2 === 0 ? 70 : -70)
});

const toRoman = (integer: number): string => {
  switch (integer) {
    case 1:
      return 'I';
    case 2:
      return 'II';
    case 3:
      return 'III';
    case 4:
      return 'IV';
    case 5:
      return 'V';
    case 6:
      return 'VI';
    default:
      return '';
  }
};

const toColor = (count?: number) => {
  switch (count) {
    case undefined:
      return '#fff';
    case 0:
      return '#888';
    case 1:
      return '#faa';
    case 2:
      return '#f99';
    case 3:
      return '#f77';
    case 4:
      return '#f55';
    case 5:
      return '#f33';
    case 6:
      return '#a11';
    default:
      return '#000';
  }
};

export const Tile: FC<TileProps> = ({ x, y, index }) => {
  const neigbouringMineCount = useSelector<
    { game: GameState },
    number | undefined
  >(s => s.game.neighbourMineCounts[index]);

  const rippleDelay = useSelector<{ game: GameState }, number | undefined>(
    s => s.game.rippleEffectDelays[index]
  );

  const dispatch = useDispatch();
  const flip = () =>
    dispatch({ type: ActionTypes.FLIP_TILE_AT_INDEX, tileIndex: index });

  return (
    <motion.g
      style={{ ...indexToGridCoordinateTransform(x, y) }}
      onClick={flip}
    >
      <Hexagon
        animate={{
          fill: toColor(neigbouringMineCount),
          transition: { delay: rippleDelay && rippleDelay / 10 }
        }}
        initial={{ fill: toColor() }}
      ></Hexagon>
      <text
        x="150"
        y="200"
        textAnchor="middle"
        fill="black"
        stroke="black"
        fontSize="150"
      >
        {!!neigbouringMineCount && toRoman(neigbouringMineCount)}
      </text>
    </motion.g>
  );
};
