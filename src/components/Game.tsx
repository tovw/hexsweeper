import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { GameState, GameStatus } from '../state/gameReducer';
import { Board } from './game/Board';
import { GameInfo } from './game/GameInfo';
import { Results } from './game/Result';
import { Header } from './menu/Header';
import { Menu } from './menu/Menu';

export const Game: FC = () => {
  const status = useSelector<GameState, number>(s => s.status);

  const over = status === GameStatus.WON || status === GameStatus.LOST;
  return (
    <motion.div
      style={{
        maxWidth: '600px',
        maxHeight: '100vh',
        margin: '0 auto',
        overflow: 'hidden'
      }}
      animate={over ? { maxWidth: '500px' } : { maxWidth: '600px' }}
    >
      <motion.div
        style={{ height: '10vh', position: 'relative', marginBottom: '15px' }}
        animate={over ? { height: '25vh' } : { height: '10vh' }}
      >
        <AnimatePresence>
          {status === GameStatus.MENU && <Header>HEXES</Header>}
        </AnimatePresence>
        {status !== GameStatus.MENU && !over && <GameInfo />}
        {over && <Results isWon={status === GameStatus.WON} />}
      </motion.div>
      {status === GameStatus.MENU && <Menu />}
      {status !== GameStatus.MENU && <Board />}
    </motion.div>
  );
};
