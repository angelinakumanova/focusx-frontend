"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import React from "react";
import { LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const inputStyle =
  "text-white bg-zinc-700 placeholder:text-white placeholder:opacity-90";
const labelStyle = "text-white font-bold text-base";

export default function SignUpForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <>
      <Logo containerClassName="mt-10 text-2xl" center={true} />
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-neutral-200 text-center">
          Sign Up and Unlock Your Full Potential
        </h2>

        <form
          className="mx-auto w-full max-w-md  drop-shadow-2xl drop-shadow-chart-3 my-8 bg-zinc-900 rounded-none p-4 md:rounded-2xl md:p-8 "
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <Label htmlFor="username" className={labelStyle}>
              Username
            </Label>
            <Input
              id="username"
              placeholder="johnDoe"
              type="text"
              className={inputStyle}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className={labelStyle}>
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="john.doe@example.com"
              type="email"
              className={inputStyle}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password" className={labelStyle}>
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className={inputStyle}
            />
          </div>

          <div className="mb-8">
            <Label htmlFor="confirmPassword" className={labelStyle}>
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              className={inputStyle}
            />
          </div>

          <button
            className="hover:cursor-pointer flex text-base items-center justify-center gap-2
          font-bold group/btn relative border border-gray-600 drop-shadow-md
          drop-shadow-chart-3 h-10 w-full rounded-md text-white
          shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] "
            type="submit"
          >
            Sign up <LuArrowRight />
            <BottomGradient />
          </button>

          <div className="text-center opacity-80 mt-10">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-bold transition-all duration-300 ease-in-out hover:text-cyan-300"
            >
              Login
            </Link>
          </div>
        </form>
      </motion.div>
    </>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
