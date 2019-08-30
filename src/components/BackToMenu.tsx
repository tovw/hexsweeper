import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { createLeaveGameAction } from '../state/gameActions';

import { color } from '../utils/color';
import { motion } from 'framer-motion';

export const BackToMenu: FC = () => {
  const dispatch = useDispatch();
  const toMenu = () => dispatch(createLeaveGameAction());

  return (
    <motion.h2
      onClick={toMenu}
      style={{
        whiteSpace: 'nowrap',
        fontFamily: 'squreSans',
        fontSize: 45,
        margin: '0 auto',
        userSelect: 'none',
        color: color.secondary
      }}
      whileHover={{
        color: color.primary
      }}
    >
      MENU
    </motion.h2>
  );
};
