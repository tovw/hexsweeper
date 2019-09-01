import { motion, MotionProps } from 'framer-motion';
import React, { FC } from 'react';

export const HexagonPoints = '300,130 225,260 75,260 0,130 75,0 225,0';
export const HexagonPointsUp = '130,0 260,75 260,225 130,300 0,225 0,75';

export const Hexagon: FC<MotionProps> = props => (
  <motion.polygon {...props} points={HexagonPoints} />
);

export const HexagonUp: FC<MotionProps> = props => (
  <motion.polygon {...props} points={HexagonPointsUp} />
);
