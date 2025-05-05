import { motion } from "motion/react";
import { FlipWords } from "../ui/flip-words";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useSectionStore } from "@/hooks/useSectionStore";
import { DotBackground } from "../ui/dot-background";

const LandingSection = () => {
  const setActiveSection = useSectionStore((s) => s.setActiveSection);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const id = "home";

  useEffect(() => {
    if (inView) setActiveSection(id);
  }, [inView, id, setActiveSection]);

  return (
    <>
      <DotBackground />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="my-32 lg:my-56 flex justify-center min-h-[20vh]"
      >
        <div id={id} ref={ref} className="max-w-full lg:max-w-xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold">
            <FlipWords
              words={["Build focus.", "Win rewards.", "Own growth."]}
              duration={1500}
            />
          </h1>

          <p className="p-1 md:p-0 opacity-80 text-base md:text-lg mt-2">
            Unlock your potential and master the art of concentration with the
            tool designed to transform how you work, study, and create.
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default LandingSection;
