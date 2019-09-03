import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFlipAction } from '../../state/gameActions';
import { GameState, NeighbourMineCount } from '../../state/gameReducer';
import { color, mineCountColorMap } from '../../utils/color';
import { toRoman } from '../../utils/toRoman';
import { Hexagon } from '../svgShapes/Hexagon';

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

const hexagonVariants: Record<NeighbourMineCount & 'initial', unknown> = {
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

export const Tile: FC<TileProps> = ({ x, y, index }) => {
  const neighbouringMineCount = useSelector(
    (s: GameState) => s.neighbourMineCounts[index]
  );

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
      whileHover={neighbouringMineCount === undefined ? 'hover' : 'dealtTo'}
      style={{
        cursor: neighbouringMineCount === undefined ? 'pointer' : 'default'
      }}
      onClick={flip}
    >
      <Hexagon
        variants={hexagonVariants}
        custom={rippleDelay}
        animate={`${neighbouringMineCount}`}
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
        animate={neighbouringMineCount ? 'visible' : 'hidden'}
      >
        {!!neighbouringMineCount &&
          neighbouringMineCount !== 'MINE' &&
          toRoman(neighbouringMineCount)}
      </motion.text>
    </motion.g>
  );
};
