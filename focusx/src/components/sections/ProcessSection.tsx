import { motion } from "motion/react";
import SectionDivider from "./SectionDivider";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useSectionStore } from "@/hooks/useSectionStore";

const ProcessSection = () => {
  const setActiveSection = useSectionStore((s) => s.setActiveSection);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const id = "process";

  useEffect(() => {
    if (inView) setActiveSection(id);
  }, [inView, id, setActiveSection]);

  return (
    <>
      <SectionDivider />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div id={id} ref={ref} className="p-4 lg:p-0 my-40 min-h-[50vh]">
          <div className="my-10">
            <h1 className="text-center font-bold text-6xl uppercase">
              FocusX in Action
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
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProcessSection;
