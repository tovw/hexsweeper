import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { createLeaveGameAction } from '../../state/gameActions';
import { color } from '../../utils/color';
import { Timer } from './Timer';

export const GameResult: FC<{ isWon: boolean }> = ({ isWon }) => {
  const dispatch = useDispatch();
  const toMenu = () => dispatch(createLeaveGameAction());

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-around'
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

      {isWon && <Timer />}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <motion.h2
          onClick={toMenu}
          initial={{
            whiteSpace: 'nowrap',
            fontFamily: 'squreSans',
            fontSize: 30,
            userSelect: 'none',
            color: color.secondary,
            borderWidth: 3,
            borderStyle: 'solid',
            borderColor: color.secondary,
            padding: 3,
            margin: 0,
            scale: 1,
            display: 'inline',
            cursor: 'pointer'
          }}
          whileHover={{
            scale: 1.1
          }}
        >
          MENU
        </motion.h2>
      </div>
    </div>
  );
};
