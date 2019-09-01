import { motion, MotionProps } from 'framer-motion';
import React from 'react';

const playPoints = '0,0 300,150 0,300';
export const PlayIcon: React.FC<MotionProps> = (props: MotionProps) => {
  return <motion.polygon points={playPoints} {...props} />;
};
