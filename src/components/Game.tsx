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
      initial={{
        maxWidth: 600,
        maxHeight: '100vh',
        margin: '0 auto',
        overflow: 'hidden',
        minWidth: '350px'
      }}
      animate={{ maxWidth: isOver ? 500 : 600 }}
    >
      <motion.div
        initial={{ height: 100, position: 'relative', marginBottom: 15 }}
        animate={{ height: isOver ? 150 : 100 }}
      >
        <AnimatePresence>{isMenu && <Header>HEXES</Header>}</AnimatePresence>
        {!isMenu && !isOver && <GameInfo />}
        {isOver && <Results isWon={status === GameStatus.WON} />}
      </motion.div>

      <AnimatePresence>{isMenu && <Menu />}</AnimatePresence>
      {!isMenu && <Board />}
    </motion.div>
  );
};
