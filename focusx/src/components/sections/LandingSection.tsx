import { motion } from "motion/react";
import { FlipWords } from "../ui/flip-words";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useSectionStore } from "@/useSectionStore";

const LandingSection = () => {
  const setActiveSection = useSectionStore((s) => s.setActiveSection)
    const { ref, inView } = useInView({ threshold: 0.5 })
  
    const id = 'home';
  
    useEffect(() => {
      if (inView) setActiveSection(id)
    }, [inView, id, setActiveSection])

  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="my-10 md:my-68 mx-32 md:mx-42 min-h-[20vh] grid grid-cols-1 md:grid-cols-2"

      >
        <div id={id} ref={ref} className="max-w-full md:max-w-xl">
          <h1 className="text-5xl md:text-7xl font-bold"
          >
            <FlipWords
              words={["Build focus.", "Win rewards.", "Own growth."]}
              duration={1500}
            />
          </h1>

          <p className="opacity-80 text-base md:text-lg"
          >
            Unlock your potential and master the art of concentration with the
            tool designed to transform how you work, study, and create.
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default LandingSection;
