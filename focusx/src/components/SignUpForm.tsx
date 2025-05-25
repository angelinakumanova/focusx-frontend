"use client";
import { Input } from "@/components/ui/auth-input";
import { Label } from "@/components/ui/auth-label";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { BottomGradient } from "./BottomGradient";
import Logo from "./Logo";

export default function SignUpForm() {
  const schema = z
    .object({
      username: z
        .string({ message: "Please enter a username" })
        .min(1, { message: "Please enter a username" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z.string().min(6),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center">
        <Logo className="flex-col mt-10 text-xl opacity-90" />
      </div>

      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-neutral-200 text-center">
          Sign Up and Unlock Your Full Potential
        </h2>

        <form
          className="mx-auto w-full max-w-md drop-shadow-2xl drop-shadow-chart-3
          my-8 bg-zinc-900 rounded-none p-4 md:rounded-2xl md:p-8"
          onSubmit={handleSubmit((data) => {
            api
              .post("/auth/register", data)
              .then(() => {
                reset();
                navigate("/login");
              })
              .catch((error) => console.log(error));
          })}
        >
          <div className="mb-4">
            <Label htmlFor="username" >
              Username
            </Label>
            <Input
              id="username"
              placeholder="johnDoe"
              type="text"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-600">{errors.username.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <Label htmlFor="email" >
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="john.doe@example.com"
              type="email"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="password" >
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-8">
            <Label htmlFor="confirmPassword" >
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            className="hover:cursor-pointer flex text-base items-center justify-center gap-2
          font-bold group/btn relative border border-gray-600 drop-shadow-md
          drop-shadow-chart-3 h-10 w-full rounded-md text-white
          shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] "
            type="submit"
          >
            Sign up <IconArrowRight height={"20px"} />
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
