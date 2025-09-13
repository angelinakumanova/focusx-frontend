"use client";
import { Input } from "@/components/ui/auth-input";
import { Label } from "@/components/ui/auth-label";
import { useAuthStore } from "@/context/useAuthStore";
import { motion } from "motion/react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BottomGradient } from "./BottomGradient";
import Logo from "./Logo";
import axios from "axios";
import Spinner from "./Spinner";
import { useState } from "react";

type LoginFormInput = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (data: FieldValues) => {
    setLoading(true);

    try {
      await login(data);
      navigate("/home");
    } catch (err) {
      setLoading(false);

      if (axios.isAxiosError(err)) {
        const message = err.response?.data.message;

        if (message) {
          setError("root", { message });
          return;
        }
        setError("root", {
          message: "An unexpected error occured. Try again.",
        });
      }
    }
  };

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
          onSubmit={handleSubmit((data) => handleLogin(data))}
        >
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" {...register("username")} />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
          </div>

          {errors.root && (
            <p className="text-red-600 -mt-2 mb-1">{errors.root.message}</p>
          )}

          <button
            className="hover:cursor-pointer flex text-base items-center justify-center gap-2
          font-bold group/btn relative border border-gray-600 drop-shadow-md
          drop-shadow-chart-3 h-10 w-full rounded-md text-white
          shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] "
            type="submit"
          >
            Log In
            <BottomGradient />
            {isLoading && <Spinner width="w-4" />}
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
