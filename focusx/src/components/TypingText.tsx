import { motion } from "motion/react";

interface Props {
  text: string;
  className?: string;
}

const TypingText = ({ text, className }: Props) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2 * i,
      },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.4 }}
    >
      {letters.map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TypingText;
