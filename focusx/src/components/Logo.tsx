import logo from "../assets/white-logo.png";
import { Link } from "react-router-dom";

interface Props {
  containerClassName?: string;
  center?: boolean;
}

const Logo = ({ containerClassName, center }: Props) => {
  return (
    <div className={`w-2xs ${center ? 'mx-auto' : ''} ${containerClassName}`}>
      <Link to={"/"} className={`w-2xs flex gap-2 items-center ${center ? 'justify-center' : ''}`}>
        <img src={logo} className="w-12" />
        <p className="font-bold">FocusX</p>
      </Link>
    </div>
  );
};

export default Logo;
