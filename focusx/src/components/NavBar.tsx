import { motion } from "motion/react";
import Logo from "./Logo";
import { Button } from "./ui/moving-border";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { useSectionStore } from "@/hooks/useSectionStore";

const style =
  "px-3 font-bold transition-all duration-300 ease-in-out hover:cursor-pointer hover:rounded-full hover:bg-[#3f3f46]";

const NavBar = () => {
  const activeSection = useSectionStore((s) => s.activeSection);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex p-5 justify-between"
    >
      <Logo />

      <div className="hidden md:flex gap-7 whitespace-nowrap shadow-[0_1px_15px_gray] fixed z-50 left-[50%] translate-x-[-50%] p-2 px-10 rounded-full bg-[#18181b] ">
        <LinkScroll
          to="home"
          smooth={true}
          duration={1000}
          offset={-500}
          spy={true}
        >
          <div
            className={`${style} + ${
              activeSection === "home" ? " bg-[#3f3f46] rounded-full" : ""
            }`}
          >
            Home
          </div>
        </LinkScroll>

        <LinkScroll
          to="benefits"
          smooth={true}
          offset={-100}
          duration={1000}
          spy={true}
        >
          <div
            className={`${style} + ${
              activeSection === "benefits" ? " bg-[#3f3f46] rounded-full" : ""
            }`}
          >
            Why FocusX?
          </div>
        </LinkScroll>

        <LinkScroll
          to="process"
          smooth={true}
          duration={1000}
          activeClass="active-link"
          spy={true}
        >
          <div
            className={`${style} + ${
              activeSection === "process" ? " bg-[#3f3f46] rounded-full" : ""
            }`}
          >
            The Process
          </div>
        </LinkScroll>
      </div>

      <Link to={"/register"}>
        <Button
          className="bg-[#111111] font-bold text-base cursor-pointer "
          containerClassName="h-10 w-28 lg:w-40 hover:shadow-md hover:shadow-gray-500 animation duration-300 ease-in-out"
        >
          Join now!
        </Button>
      </Link>
    </motion.div>
  );
};

export default NavBar;

function scrollToCenter(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}
