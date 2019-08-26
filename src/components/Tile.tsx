import React, { FC } from 'react';
import { Hexagon } from './Hexagon';

interface TileProps {
  x: number;
  y: number;
}

//flat top 300*260 hexagon
const indexToGridCoordinateTransform = (x: number, y: number) => ({
  translateX: 235 * x,
  translateY: y * 275 + (x % 2 === 0 ? 70 : -70)
});

export const Tile: FC<TileProps> = ({ x, y }) => {
  return (
    <Hexagon
      style={{ ...indexToGridCoordinateTransform(x, y), fill: 'red' }}
      initial={{}}
    ></Hexagon>
  );
};
