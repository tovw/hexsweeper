import { motion, MotionProps } from 'framer-motion';
import React, { FC } from 'react';

export const HexagonPoints = '300,130 225,260 75,260 0,130 75,0 225,0';

export const Hexagon: FC<MotionProps> = props => (
  <motion.polygon {...props} points={HexagonPoints} />
);
