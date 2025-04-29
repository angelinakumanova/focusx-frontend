import { motion } from "motion/react";
import { TiTick } from "react-icons/ti";

interface Props {
  children: string;
}

const MotionText = motion.create("p");

const BenefitsListItem = ({ children }: Props) => (
  <MotionText
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="flex items-center"
  >
    <TiTick />
    <span className="text-2xl font-bold">{children}</span>
  </MotionText>
);

export default BenefitsListItem;
