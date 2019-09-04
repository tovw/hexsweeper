import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFlipAction } from '../../state/gameActions';
import { GameState, TileState } from '../../state/gameReducer';
import { color, mineCountColorMap } from '../../utils/color';
import { Coord } from '../menu/MenuItem';
import { Hexagon } from '../svgShapes/Hexagon';

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

const wrapperVariants = {
  dealFrom: () => ({
    translateX: -600,
    translateY: -600,
    scale: 2
  }),
  dealTo: (to: { translateX: number; translateY: number; index: number }) => {
    return {
      translateX: to.translateX,
      translateY: to.translateY,
      scale: 1,

      transition: {
        delay: (130 - to.index) / 100 + 0.5
      }
    };
  },
  hover: () => ({
    scale: [1.05, 0.95],
    transition: {
      yoyo: Infinity
    }
  })
};

const hexagonVariants: Record<TileState & 'initial', unknown> = {
  initial: { fill: color.primary, opacity: 1 },
  0: (delay: number) => ({
    opacity: 0,
    scale: 2,
    transition: { duration: 0.5, delay: delay / 10 }
  }),
  1: (delay: number) => ({
    fill: mineCountColorMap[1],
    scale: 1,
    transition: { delay: delay / 10 }
  }),
  2: (delay: number) => ({
    fill: mineCountColorMap[2],
    scale: 1,
    transition: { delay: delay / 10 }
  }),
  3: (delay: number) => ({
    fill: mineCountColorMap[3],
    scale: 1,
    transition: { delay: delay / 10 }
  }),
  4: (delay: number) => ({
    fill: mineCountColorMap[4],
    scale: 1,
    transition: { delay: delay / 10 }
  }),
  5: (delay: number) => ({
    fill: mineCountColorMap[5],
    scale: 1,
    transition: { delay: delay / 10 }
  }),
  6: (delay: number) => ({
    fill: mineCountColorMap[6],
    scale: 1,
    transition: { delay: delay / 10 }
  }),
  MINE: () => ({
    fill: [color.primary, mineCountColorMap[7]],
    scale: [1, 1.5, 1]
  })
};

const countTextVariants = {
  hidden: () => ({
    opacity: 0,
    x: 150,
    y: 190,
    fill: color.text,
    stroke: color.text,
    fontSize: 150
  }),
  visible: (delay: number) => ({
    opacity: 1,
    transition: { delay: delay / 10 }
  })
};

interface TileProps extends Coord {
  index: number;
}

export const Tile: FC<TileProps> = ({ x, y, index }) => {
  const tileState = useSelector((s: GameState) => s.tileStates[index]);

  const rippleDelay = useSelector(
    (s: GameState) => s.rippleEffectDelays[index]
  );

  const dispatch = useDispatch();
  const flip = () => dispatch(createFlipAction(index));

  return (
    <motion.g
      variants={wrapperVariants}
      initial="dealFrom"
      animate="dealTo"
      custom={{
        ...indexToGridCoordinateTransform(x, y),
        index
      }}
      whileHover={tileState === undefined ? 'hover' : 'dealtTo'}
      style={{
        cursor: tileState === undefined ? 'pointer' : 'default'
      }}
      onClick={flip}
    >
      <Hexagon
        variants={hexagonVariants}
        custom={rippleDelay}
        animate={`${tileState}`}
        initial="initial"
      ></Hexagon>

      <motion.text
        style={{
          textAnchor: 'middle',
          userSelect: 'none'
        }}
        variants={countTextVariants}
        custom={rippleDelay}
        initial="hidden"
        animate={tileState ? 'visible' : 'hidden'}
      >
        {!!tileState && tileState !== 'MINE' && toRoman(tileState)}
      </motion.text>
    </motion.g>
  );
};
