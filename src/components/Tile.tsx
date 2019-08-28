import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFlipAction } from '../state/gameActions';
import { GameState } from '../state/gameReducer';
import { color, mineCountColorMap } from '../utils/color';
import { toRoman } from '../utils/toRoman';
import { viewBox } from './Board';
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

const wrapperVariants = {
  dealFrom: () => ({
    translateX: viewBox.width / 2 - 300,
    translateY: viewBox.height / 2 - 260
  }),
  dealTo: (to: { translateX: number; translateY: number; index: number }) => {
    return {
      translateX: to.translateX,
      translateY: to.translateY,
      transition: {
        delay: to.index / 100
      }
    };
  }
};

const hexagonVariants = {
  initial: { fill: color.tile, opacity: 1 },
  0: (delay: number) => ({
    opacity: 0,
    scale: 2,
    transition: { duration: 0.5, delay: delay / 10 }
  }),
  1: (delay: number) => ({
    fill: mineCountColorMap[1],
    transition: { delay: delay / 10 }
  }),
  2: (delay: number) => ({
    fill: mineCountColorMap[2],
    transition: { delay: delay / 10 }
  }),
  3: (delay: number) => ({
    fill: mineCountColorMap[3],
    transition: { delay: delay / 10 }
  }),
  4: (delay: number) => ({
    fill: mineCountColorMap[4],
    transition: { delay: delay / 10 }
  }),
  5: (delay: number) => ({
    fill: mineCountColorMap[5],
    transition: { delay: delay / 10 }
  }),
  6: (delay: number) => ({
    fill: mineCountColorMap[6],
    transition: { delay: delay / 10 }
  }),
  7: () => ({
    fill: mineCountColorMap[7]
  })
};

const countTextVariants = {
  hidden: () => ({ opacity: 0 }),
  visible: (delay: number) => ({
    opacity: 1,
    transition: { delay: delay / 10 }
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
      onClick={flip}
    >
      <Hexagon
        variants={hexagonVariants}
        custom={rippleDelay}
        animate={`${neigbouringMineCount}`}
        initial="initial"
      ></Hexagon>

      <motion.text
        style={{
          x: 150,
          y: 190,
          textAnchor: 'middle',
          fill: color.text,
          stroke: color.text,
          fontSize: 150,
          userSelect: 'none'
        }}
        variants={countTextVariants}
        custom={rippleDelay}
        initial="hidden"
        animate={neigbouringMineCount === undefined ? undefined : 'visible'}
      >
        {!!neigbouringMineCount && toRoman(neigbouringMineCount)}
      </motion.text>
    </motion.g>
  );
};
