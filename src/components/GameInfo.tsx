import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { GameState } from '../state/gameReducer';
import { color } from '../utils/color';
import { Timer } from './Timer';

//Difficulty
//TilesLeft

//Timer
//OpenMenu

const getNonMinesLeft = ({
  gridWidth,
  gridHeight,
  totalMineCount,
  neighbourMineCounts
}: GameState): number =>
  gridHeight * gridWidth -
  Object.keys(neighbourMineCounts).length -
  totalMineCount;

export const GameInfo: FC = () => {
  const nonMinesLeft = useSelector<{ game: GameState }, number>(s =>
    getNonMinesLeft(s.game)
  );

  return (
    <div
      style={{
        background: color.tile,
        height: '10vh'
      }}
    >
      {nonMinesLeft}
      <Timer />
    </div>
  );
};
