import { Input } from "../ui/auth-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userApi from "@/services/userApi";
import { useState } from "react";
import { useAuthStore } from "@/context/useAuthStore";
import ErrorResponse from "@/interfaces/ErrorResponse";
import { Label } from "../ui/auth-label";
import { passwordSchema } from "../SignUpForm";

const PasswordSection = () => {
  const user = useAuthStore((s) => s.user);
  const [successMessage, setSucessMessage] = useState<string | null>(null);

  const schema = z
    .object({
      currentPassword: z
        .string()
        .min(1, { message: "Please enter your current password" }),
      newPassword: passwordSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  type PasswordFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div>
      <h3 className="text-lg font-semibold mb-10">Change Password</h3>

      <form
        className="space-y-4"
        onSubmit={handleSubmit((data) => {
          userApi
            .put(`/users/${user?.id}/password`, data, {
              withCredentials: true,
            })
            .then(() => {
              reset();
              setSucessMessage("Password has been successfully changed!");

              setTimeout(() => {
                setSucessMessage(null);
              }, 3000);
            })
            .catch((err) => {
              const error = err.response.data as ErrorResponse;

              setError("root", { message: error.message });
            });
        })}
      >
        <div>
          <Label>Current Password</Label>
          <Input
            id="old-password"
            type="password"
            placeholder="Enter current password"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="text-red-600">{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <Label>New Password</Label>
          <Input
            id="new-password"
            type="password"
            placeholder="Enter new password"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-red-600">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <Label>Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm new password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && !errors.newPassword && (
            <p className="text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex justify-end items-center gap-2">
          {errors.root && <p className="text-red-600">{errors.root.message}</p>}
          {successMessage && <p className="text-green-600">{successMessage}</p>}

          <button
            className="text-zinc-900 font-bold bg-white px-6 py-2 rounded-xl
               hover:cursor-pointer hover:bg-cyan-600 hover:text-white duration-300 ease-in-out"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordSection;
