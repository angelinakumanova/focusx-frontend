
import Logo from "./Logo";
import { Button } from "./ui/moving-border";
import { Link } from "react-router-dom";

const style = 'px-3 font-bold transition-all duration-300 ease-in-out hover:cursor-pointer hover:rounded-full hover:bg-[#3f3f46]'

const NavBar = () => {
  return (
   
    <div className="flex p-5 justify-between">
      <Logo />

      <div className="md:flex gap-7 shadow-[0_1px_15px_gray] fixed z-50 left-[50%] translate-x-[-50%] p-2 px-10 rounded-full bg-[#18181b] "
  
      >
        {/* <LinkScroll
          to="landing-section"
          smooth={true}
          duration={1000}
          offset={-500}
          activeClass="active-nav"
          spy={true}
        > */}
          <div className={style}>Home</div>
        {/* </LinkScroll> */}

        {/* <LinkScroll
          to="benefits-section"
          smooth={true}
          offset={100}
          duration={1000}
          activeClass="active-nav"
          spy={true}
        > */}
          <div className={style}>
            Why FocusX?
          </div>
        {/* </LinkScroll> */}

        {/* <LinkScroll
          to="process-section"
          smooth={true}
          duration={1000}
          activeClass="active-link"
          spy={true}
          onSetActive={() => console.log("Working!")}
        > */}
          <div className={style} >
            The Process
          </div>
        {/* </LinkScroll> */}
      </div>

      <Link to={"/register"}>
        <Button
          className="bg-transparent font-bold text-base cursor-pointer"
          containerClassName="h-10 hover:shadow-md hover:shadow-gray-500 animation duration-300 ease-in-out"
        >
          Join now!
        </Button>
      </Link>
    </div>
  );
};

export default NavBar;
