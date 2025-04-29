"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { BottomGradient } from "./SignUpForm";

const inputStyle =
  "text-white bg-zinc-700 placeholder:text-white placeholder:opacity-90";
const labelStyle = "text-white font-bold text-base";

const LoginForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <Logo containerClassName="mt-10 text-2xl" center={true} />
      <motion.div
        className="mt-42"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-neutral-200 text-center">
          Ready to Focus? Log In.
        </h2>

        <form
          className="mx-auto w-full max-w-md  drop-shadow-2xl drop-shadow-chart-3 my-8 bg-zinc-900 rounded-none p-4 md:rounded-2xl md:p-8 "
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <Label htmlFor="username" className={labelStyle}>
              Username
            </Label>
            <Input id="username" type="text" className={inputStyle} />
          </div>

          <div className="mb-4">
            <Label htmlFor="password" className={labelStyle}>
              Password
            </Label>
            <Input id="password" type="password" className={inputStyle} />
          </div>

          <button
            className="hover:cursor-pointer flex text-base items-center justify-center gap-2
          font-bold group/btn relative border border-gray-600 drop-shadow-md
          drop-shadow-chart-3 h-10 w-full rounded-md text-white
          shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] "
            type="submit"
          >
            Log In
            <BottomGradient />
          </button>

          <div className="text-center opacity-80 mt-10">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="font-bold transition-all duration-300 ease-in-out hover:text-cyan-300"
            >
              Register
            </Link>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default LoginForm;
