import { useSectionStore } from "@/hooks/useSectionStore";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import SectionDivider from "./SectionDivider";
import ProcessCarousel from "./ProcessCarousel";

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
        className="hidden md:block"
      >
        <div id={id} ref={ref} className="p-4 lg:p-0 my-40 min-h-[50vh]">
          <div className="my-10">
            <h1 className="text-center font-bold text-6xl uppercase">
              FocusX in Action
            </h1>
            <p className="text-xl text-center opacity-80">
              Peek inside the system that keeps you coming back.
            </p>
          </div>

          <ProcessCarousel />
        </div>
      </motion.div>
    </>
  );
};

export default ProcessSection;
