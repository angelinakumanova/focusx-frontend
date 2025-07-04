import { Link } from "react-router-dom";

const ErrorDisplay = () => {
  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-80 lg:px-8 text-center">
      <p className="text-3xl font-bold text-white">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-6 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="group bg-white p-2 px-5 rounded-full mt-10 flex items-center justify-center gap-x-6 border hover:border-white  hover:bg-zinc-900 transition-all duration-300">
        <Link to="/" className="text-sm font-bold text-zinc-900 group group-hover:text-white">
          Go back to home page
        </Link>
      </div>
    </div>
  );
};

export default ErrorDisplay;
