import React, { FC } from 'react';
import { Hexagon } from './Hexagon';
import { useSelector, useDispatch } from 'react-redux';
import { GameState } from '../state/gameReducer';
import { motion } from 'framer-motion';
import { ActionTypes } from '../state/gameActions';

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
      return 'white';
    case 0:
      return '#888';
    case 1:
      return 'pink';
    case 2:
      return 'red';
    case 3:
      return 'crimson';
    case 4:
      return 'yellow';
    case 5:
      return 'green';
    case 6:
      return 'blue';

    default:
      return 'orange';
  }
};

export const Tile: FC<TileProps> = ({ x, y, index }) => {
  const neigbouringMineCount = useSelector<
    { game: GameState },
    number | undefined
  >(s => s.game.neighbourMineCounts[index]);

  const dispatch = useDispatch();
  const flip = () =>
    dispatch({ type: ActionTypes.FLIP_TILE_AT_INDEX, tileIndex: index });

  return (
    <motion.g
      style={{ ...indexToGridCoordinateTransform(x, y) }}
      onClick={flip}
    >
      <Hexagon
        style={{ fill: toColor(neigbouringMineCount) }}
        initial={{}}
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
