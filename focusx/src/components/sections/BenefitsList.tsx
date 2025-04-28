import { motion } from "motion/react";
import BenefitsListItem from "./BenefitsListItem";

const MotionContainer = motion.create('div');

export default function BenefitsList() {
  return (
    <MotionContainer
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-20 ">
        <BenefitsListItem>Get rewarded for consistency</BenefitsListItem>
        <BenefitsListItem>Beat procrastination like a game</BenefitsListItem>
        <BenefitsListItem>Build momentum with daily wins</BenefitsListItem>
        <BenefitsListItem>Unlock your true potential</BenefitsListItem>
      </div>
    </MotionContainer>
  );
}
