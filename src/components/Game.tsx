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
  const status = useSelector((s: GameState) => s.status);

  const isMenu = status === GameStatus.MENU;
  const isOver = status === GameStatus.WON || status === GameStatus.LOST;
  return (
    <motion.div
      style={{
        maxWidth: '600px',
        maxHeight: '100vh',
        margin: '0 auto',
        overflow: 'hidden'
      }}
      animate={isOver ? { maxWidth: '500px' } : { maxWidth: '600px' }}
    >
      <motion.div
        style={{ height: '10vh', position: 'relative', marginBottom: '15px' }}
        animate={isOver ? { height: '25vh' } : { height: '10vh' }}
      >
        <AnimatePresence>{isMenu && <Header>HEXES</Header>}</AnimatePresence>
        {!isMenu && !isOver && <GameInfo />}
        {isOver && <Results isWon={status === GameStatus.WON} />}
      </motion.div>
      {isMenu && <Menu />}
      {!isMenu && <Board />}
    </motion.div>
  );
};
