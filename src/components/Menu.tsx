import { motion, MotionProps } from 'framer-motion';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  createNewGameAction,
  createToggleDifficultyAction
} from '../state/gameActions';
import { color } from '../utils/color';
import { HexagonUp } from './Hexagon';
import { DifficultyHexes, PlayIcon } from './Icons';

export const Menu: FC = () => {
  const dispatch = useDispatch();

  const toggleDifficulty = () => dispatch(createToggleDifficultyAction());
  const newGame = () => dispatch(createNewGameAction());

  return (
    <motion.svg
      viewBox="0 0 800 800"
      preserveAspectRatio="xMinYMid meet"
      key="menu"
      style={{
        width: '100%',
        maxWidth: '50rem',
        height: 'auto',
        rotate: 0,
        originX: 0.5,
        originY: 0.5,
        scale: 1
      }}
    >
      <MenuItem
        inFrom={{ x: -300, y: 150 }}
        to={{ x: 115, y: 150 }}
        Icon={PlayIcon}
        onClick={newGame}
        key="menuitem1"
      />
      <MenuItem
        inFrom={{ x: 800, y: 150 }}
        to={{ x: 425, y: 150 }}
        Icon={DifficultyHexes}
        onClick={toggleDifficulty}
        key="menuitem2"
      />
    </motion.svg>
  );
};

interface Coord {
  x: number;
  y: number;
}

interface MenuItemProps {
  inFrom: Coord;
  to: Coord;
  Icon: React.FunctionComponent<MotionProps>;
  onClick: () => void;
}

const menuItemVariants = {
  in: ({ to }: { to: Coord; inFrom: Coord }) => ({
    translateX: to.x,
    translateY: to.y,
    transition: { duration: 1, type: 'spring', delay: 1.5 }
  }),
  out: ({ inFrom }: { to: Coord; inFrom: Coord }) => ({
    translateX: inFrom.x,
    translateY: inFrom.y,
    transition: { duration: 0.5 }
  })
};

const MenuItem: React.FC<MenuItemProps & MotionProps> = ({
  inFrom,
  to,
  Icon,
  onClick,

  ...rest
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.g
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        translateX: inFrom.x,
        translateY: inFrom.y,
        cursor: 'pointer'
      }}
      variants={menuItemVariants}
      custom={{ inFrom, to }}
      animate={'in'}
      exit={'out'}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      {...rest}
    >
      <HexagonUp
        initial={{ fill: color.primary }}
        animate={{ fill: isHovered ? color.primary : color.primary }}
      />
      <Icon />
    </motion.g>
  );
};
