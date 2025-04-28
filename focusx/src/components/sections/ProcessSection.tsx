import { motion } from "motion/react";

const ProcessSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div
      // marginY={40} minHeight={"50vh"}
       id="process-section"
      >
        <h1
          // textAlign={"center"}
          // fontWeight={"bold"}
          // size={"6xl"}
          // textShadow={"2xl"}
          // textTransform={"uppercase"}
        >
          The Process
        </h1>

        <div 
        // fontSize={"xl"}
        >
          <h1
          //  fontWeight={"bold"} size={"2xl"}
           >
            Why FocusX?{" "}
          </h1>
          <p >

            It is a powerful tool designed to help individuals unlock their
            potential by enhancing their focus and productivity. Users can set
            up personalized rewards for milestones reached, making progress more
            enjoyable and tangible. With this unique approach, FocusX transforms
            your productivity journey into one that's not only effective but
            also rewarding.
          </p>

          
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessSection;
