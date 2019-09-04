import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { GameState, GameStatus } from '../state/gameReducer';
import { Board } from './game/Board';
import { GameInfo } from './game/GameInfo';
import { GameResult } from './game/GameResult';
import { Header } from './menu/Header';
import { Menu } from './menu/Menu';

export const Game: FC = () => {
  const status = useSelector((s: GameState) => s.status);

  const isMenu = status === GameStatus.MENU;
  const isWon = status === GameStatus.WON;
  const isLost = status === GameStatus.LOST;
  const isOver = isWon || isLost;
  return (
    <motion.div
      initial={{
        maxWidth: '600px',
        maxHeight: '100vh',
        margin: '0 auto',
        overflow: 'hidden',
        minWidth: '350px'
      }}
      animate={{ maxWidth: isOver ? '500px' : '600px' }}
    >
      <motion.div
        initial={{
          height: '100px',
          position: 'relative',
          marginBottom: '15px'
        }}
        animate={{ height: isWon ? '150px' : '100px' }}
      >
        <AnimatePresence>{isMenu && <Header>HEXES</Header>}</AnimatePresence>
        {!isMenu && !isOver && <GameInfo />}
        {isOver && <GameResult isWon={status === GameStatus.WON} />}
      </motion.div>

      <AnimatePresence>{isMenu && <Menu />}</AnimatePresence>
      {!isMenu && <Board />}
    </motion.div>
  );
};
