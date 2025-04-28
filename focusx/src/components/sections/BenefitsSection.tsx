import { motion } from "motion/react";
import BenefitsList from "./BenefitsList";
import SectionDivider from "./SectionDivider";

const BenefitsSection = () => {
  return (
    <>
      <SectionDivider id="benefits-section" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        
      >
        <div className="my-40 min-h-[50vh]">
          <div className="my-10">
            <h1 className="text-center font-bold text-6xl uppercase">
              Sharpen Your Focus, Amplify Your Results
            </h1>
            <p className="text-xl text-center opacity-80">
              Get addicted to progress, not distraction.
            </p>
          </div>

          <div className="text-xl max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl">Why FocusX? </h1>
            <p>
              It is a powerful tool designed to help individuals unlock their
              potential by enhancing their focus and productivity. Users can set
              up personalized rewards for milestones reached, making progress
              more enjoyable and tangible. With this unique approach, FocusX
              transforms your productivity journey into one that's not only
              effective but also rewarding.
            </p>

            <BenefitsList />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BenefitsSection;
