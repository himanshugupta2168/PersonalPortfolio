import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  const [arrive, setArrive] = useState(false);

  const animationVariants = {
    initial: {
      y: '+100%', // Offscreen left
    },
    animate: {
      y: 0, // Move to the center
      transition: {
        duration: 1, // Animation duration
        type: 'tween', // Type of transition
        ease: 'easeInOut', // Easing function
      },
    },
    exit: {
      y: '-100%', // Move back offscreen left
      transition: {
        duration: 1,
        type: 'tween',
        ease: 'easeInOut',
      },
    },
  };

  const childAnimationVariant = {
    initial: {
      x: '-300%',
    },
    animate: {
      x: 0,
      transition: {
        duration: 1.5,
        type: 'spring',
        ease: 'easeInOut',
      },
    },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 1, // Delay between each child element
        delayChildren: 1,
      },
    },
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setArrive(!arrive);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate={arrive ? 'exit' : 'animate'}
      variants={animationVariants}
      className="w-full min-h-[100vh] overflow-y-hidden bg-black bg-cover absolute top-0 left-0 flex justify-center items-center z-10"
    >
      <motion.div variants={stagger} className="text-white flex flex-col gap-10">
        <motion.h3 variants={childAnimationVariant} className='text-[50px] text-center lg:text-9xl md:text-6xl'>Web Developer</motion.h3>
        <motion.h3 variants={childAnimationVariant} className='text-[50px] text-center lg:text-9xl md:text-6xl'>UI/UX Designer</motion.h3>
        <motion.h3 variants={childAnimationVariant} className='text-[50px] text-center lg:text-9xl md:text-6xl'>Freelancer</motion.h3>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
