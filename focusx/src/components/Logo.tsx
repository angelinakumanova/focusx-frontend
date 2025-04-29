import logo from "../assets/white-logo.png";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

const Logo = ({className}: Props) => {
  return (
    
      <Link to={"/"} className={`flex gap-2 items-center ${className}`}>
        <img src={logo} className="w-12" />
        <p className="font-bold">FocusX</p>
      </Link>
  );
};

export default Logo;
