import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLeaveGameAction } from '../../state/gameActions';
import { GameState } from '../../state/gameReducer';
import { color } from '../../utils/color';
import { DigitalClock, formatTime } from './Timer';

export const Results: FC<{ isWon: boolean }> = ({ isWon }) => {
  const timer = useSelector((s: GameState) => s.timer);
  const time = formatTime(timer.pausedAt - timer.startedAt);
  const dispatch = useDispatch();
  const toMenu = () => dispatch(createLeaveGameAction());

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <h2
        style={{
          whiteSpace: 'nowrap',
          fontFamily: 'squreSans',
          fontSize: 45,
          margin: '0 auto',
          userSelect: 'none',
          color: color.primary
        }}
      >
        {isWon ? 'CLEARED IN' : 'GAME OVER'}
      </h2>

      {isWon && <DigitalClock time={time} />}
      <motion.h2
        onClick={toMenu}
        initial={{
          whiteSpace: 'nowrap',
          fontFamily: 'squreSans',
          fontSize: 30,
          margin: '0 auto',
          marginTop: 20,
          userSelect: 'none',
          color: color.secondary,
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: color.secondary,
          padding: 3,
          scale: 1
        }}
        whileHover={{
          scale: 1.1
        }}
      >
        MENU
      </motion.h2>
    </div>
  );
};
