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
import ErrorResponse from "@/interfaces/ErrorResponse";

export const passwordSchema = z
    .string()
    .min(12, {message: 'Password should be longer'})
    .max(64, {message: 'Password is too long'})
    .refine((pwd) => /[A-Z]/.test(pwd), {
      message: "Include at least 1 uppercase letter (A-Z)",
    })
    .refine((pwd) => /[a-z]/.test(pwd), {
      message: "Include at least 1 lowercase letter (a-z)",
    })
    .refine((pwd) => /[0-9]/.test(pwd), {
      message: "Include at least 1 number (0-9)",
    })
    .refine((pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd), {
      message: "Include at least 1 special character (!@#...)",
    });

export default function SignUpForm() {

  const schema = z
    .object({
      username: z
        .string({ message: "Please enter a username." })
        .max(20, { message: "Username must be 20 characters or less." })
        .regex(new RegExp("^[a-zA-Z0-9]+$"), {
          message: "Username must contain only letters & numbers.",
        }),
      email: z.string().email({ message: "Please enter a valid email" }),
      password: passwordSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords should match",
      path: ["confirmPassword"],
    });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
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
              .catch((error) => {
                const errorResponse = error.response.data as ErrorResponse;
                const fieldErrors = errorResponse.fieldErrors;

                if (fieldErrors) {
                  for (let err of fieldErrors) {
                    const validFields = [
                      "username",
                      "email",
                      "password",
                      "confirmPassword",
                    ] as const;
                    type FormField = (typeof validFields)[number];

                    if (validFields.includes(err.field as FormField)) {
                      setError(err.field as FormField, {
                        message: err.message,
                      });
                    }
                  }
                }
              });
          })}
        >
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
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
            <Label htmlFor="email">Email Address</Label>
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
            <Label htmlFor="password">Password</Label>
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
            <Label htmlFor="confirmPassword">Confirm password</Label>
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
