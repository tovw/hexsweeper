import { motion, MotionProps } from 'framer-motion';
import React, { FC } from 'react';
import { color } from '../../utils/color';
import { HexagonUp } from '../svgShapes/Hexagon';

export interface Coord {
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
  initial: ({ inFrom }: { to: Coord; inFrom: Coord }) => ({
    scale: 1,
    translateX: inFrom.x,
    translateY: inFrom.y,
    cursor: 'pointer'
  }),
  in: ({ to }: { to: Coord; inFrom: Coord }) => ({
    translateX: to.x,
    translateY: to.y,
    transition: { duration: 1, type: 'spring', delay: 1.5 }
  }),
  out: ({ inFrom }: { to: Coord; inFrom: Coord }) => ({
    translateX: inFrom.x,
    translateY: inFrom.y,
    transition: { duration: 0.3 }
  }),
  hover: () => ({
    scale: 1.1
  }),
  tap: () => ({
    scale: 0.95
  })
};

export const MenuItem: FC<MenuItemProps & MotionProps> = ({
  inFrom,
  to,
  Icon,
  onClick
}) => {
  return (
    <motion.g
      variants={menuItemVariants}
      custom={{ inFrom, to }}
      exit={'out'}
      whileHover={'hover'}
      whileTap={'tap'}
      onClick={onClick}
    >
      <HexagonUp initial={{ fill: color.primary }} />
      <Icon />
    </motion.g>
  );
};
