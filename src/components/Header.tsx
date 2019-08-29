import { motion, useAnimation } from 'framer-motion';
import * as React from 'react';
import { color } from '../utils/color';

const final = {
  letterSpacing: '1rem',
  fontSize: 100,
  color: color.primary
};
const variants = {
  initial: (index: number) => ({
    x: index < 2 ? -1000 : 1000
  }),
  slideIn: (index: number) => ({
    x: 0,
    transition: { delay: index * 0.2, duration: 0.4 }
  }),
  final: final
};

const anchorVariants = {
  initial: {
    opacity: 0,
    color: color.primary,
    fontSize: '100px'
  },
  fadeIn: {
    opacity: 1,
    transition: { duration: 0.7 }
  },
  final: final
};

export const Header: React.FC<{
  children: string;
}> = ({ children }) => {
  const controls = useAnimation();

  React.useEffect(() => {
    const triggerAnimation = async () => {
      await controls.start('fadeIn');
      await controls.start('slideIn');
      controls.start('final');
    };
    triggerAnimation();
  }, [controls]);

  return (
    <motion.div
      style={{
        margin: 'auto',
        textAlign: 'center',
        background: color.secondary,
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {children.split('').map((c, i) => (
        <motion.div
          custom={i}
          animate={controls}
          variants={i === 2 ? anchorVariants : variants}
          initial={'initial'}
          key={i}
          style={{
            display: 'inline-block',
            fontSize: '4rem',
            fontFamily: 'Assasin',
            fontWeight: 'bold',
            letterSpacing: '2rem'
          }}
        >
          {c}
        </motion.div>
      ))}
    </motion.div>
  );
};
