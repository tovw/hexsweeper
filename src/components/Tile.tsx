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

const variants = {
  '0': (delay: number) => ({
    opacity: 0,
    scale: 2,
    transition: { duration: 0.5, delay: delay / 10 }
  }),
  '1': (delay: number) => ({
    fill: toColor(1),
    transition: { delay: delay / 10 }
  }),
  '2': (delay: number) => ({
    fill: toColor(2),
    transition: { delay: delay / 10 }
  }),
  '3': (delay: number) => ({
    fill: toColor(3),
    transition: { delay: delay / 10 }
  }),
  '4': (delay: number) => ({
    fill: toColor(4),
    transition: { delay: delay / 10 }
  }),
  '5': (delay: number) => ({
    fill: toColor(5),
    transition: { delay: delay / 10 }
  }),
  '6': (delay: number) => ({
    fill: toColor(6),
    transition: { delay: delay / 10 }
  }),
  '7': () => ({
    fill: toColor(7)
  })
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
        variants={variants}
        custom={rippleDelay}
        animate={String(neigbouringMineCount)}
        style={{
          originX: 0.5,
          originY: 0.5
        }}
        initial={{ fill: toColor(), opacity: 1 }}
      ></Hexagon>

      <motion.text
        style={{
          x: '150',
          y: '200',
          textAnchor: 'middle',
          fill: 'black',
          stroke: 'black',
          fontSize: '150',
          userSelect: 'none'
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: neigbouringMineCount ? 1 : 0,
          transition: { delay: rippleDelay && rippleDelay / 10 }
        }}
      >
        {!!neigbouringMineCount && toRoman(neigbouringMineCount)}
      </motion.text>
    </motion.g>
  );
};
