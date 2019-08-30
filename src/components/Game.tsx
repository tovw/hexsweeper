import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { GameState, GameStatus } from '../state/gameReducer';
import { Board } from './Board';
import { GameInfo } from './GameInfo';
import { Header } from './Header';
import { Menu } from './Menu';
import { AnimatePresence, motion } from 'framer-motion';
import { Results } from './Result';

export const Game: FC = () => {
  const status = useSelector<{ game: GameState }, number>(s => s.game.status);

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
