import { FlipWords } from "../ui/flip-words";

const LandingSection = () => {
  return (
    <>
      <div
        className="my-10 md:my-52 mx-32 md:mx-42 min-h-[20vh] grid grid-cols-1 md:grid-cols-2"
        // marginX={{ base: 10, md: 20 }}
        // marginY={{ base: 30, md: 60 }}
        // minHeight={"20vh"}
        // columns={{ base: 1, md: 2 }}
      >
        <div id="landing-section" className="max-w-full md:max-w-xl">
          <h1 className="text-5xl md:text-7xl font-bold"
          >
            <FlipWords
              words={["Build focus.", "Win rewards.", "Own growth."]}
              duration={1500}
            />
          </h1>

          <p className="opacity-80 text-base md:text-lg"
          // opacity={"80%"} fontSize={{ base: "md", md: "lg" }}
          >
            Unlock your potential and master the art of concentration with the
            tool designed to transform how you work, study, and create.
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingSection;
