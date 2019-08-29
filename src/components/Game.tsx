import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { GameState, GameStatus } from '../state/gameReducer';
import { Board } from './Board';
import { GameInfo } from './GameInfo';
import { Header } from './Header';
import { Menu } from './Menu';

export const Game: FC = () => {
  const status = useSelector<{ game: GameState }, number>(s => s.game.status);

  return (
    <div
      style={{
        maxWidth: '50rem',
        margin: '0 auto',
        overflow: 'hidden'
      }}
    >
      {status === GameStatus.MENU && <Header>HEXES</Header>}
      {status !== GameStatus.MENU && <GameInfo />}
      <Menu visible={status === GameStatus.MENU} />
      {status !== GameStatus.MENU && <Board />}
    </div>
  );
};
