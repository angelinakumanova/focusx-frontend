"use client";
import { Input } from "@/components/ui/auth-input";
import { Label } from "@/components/ui/auth-label";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { BottomGradient } from "./BottomGradient";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/services/apiClient";

const inputStyle =
  "text-white bg-zinc-700 placeholder:text-white placeholder:opacity-90";
const labelStyle = "text-white font-bold text-base";

const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm();

  return (
    <>
      <div className="flex justify-center">
        <Logo className="flex-col mt-10 text-xl opacity-90" />
      </div>

      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-neutral-200 text-center">
          Ready to Focus? Log In.
        </h2>

        <form
          className="mx-auto w-full max-w-md  drop-shadow-2xl drop-shadow-chart-3 my-8 bg-zinc-900 rounded-none p-4 md:rounded-2xl md:p-8 "
          onSubmit={handleSubmit((data) => {

            axiosInstance
              .post("/login", data)
              .then((res) => {
                reset();
                console.log(res);
                
              })
              .catch((error) => console.log(error));
          })}
        >
          <div className="mb-4">
            <Label htmlFor="username" className={labelStyle}>
              Username
            </Label>
            <Input id="username" type="text" className={inputStyle} {...register('username')} />
          </div>

          <div className="mb-4">
            <Label htmlFor="password" className={labelStyle}>
              Password
            </Label>
            <Input id="password" type="password" className={inputStyle} {...register('password')} />
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
