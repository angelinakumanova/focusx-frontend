import { useAuthStore } from "@/context/useAuthStore";
import userApi from "@/services/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/auth-label";
import { Input } from "../ui/auth-input";
import ErrorResponse from "@/interfaces/ErrorResponse";

const UsernameSection = () => {
  const { user, getUser } = useAuthStore();
  const [successMessage, setSucessMessage] = useState<string | null>(null);

  const usernameSchema = z.object({
    username: z.string().min(1, { message: "Please enter a valid username" }),
  });

  type UsernameFormData = z.infer<typeof usernameSchema>;

  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<UsernameFormData>({
    resolver: zodResolver(usernameSchema),
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Change Username</h3>

      <form
        onSubmit={handleSubmit((data) => {
          userApi
            .put(`/users/${user?.id}/${data.username}`, {
              withCredentials: true,
            })
            .then(() => {
              getUser();
              setSucessMessage("Username has been successfully changed!");

              setTimeout(() => {
                setSucessMessage(null);
              }, 3000);
            })
            .catch((err) => {
              const error = err.response.data as ErrorResponse;

              setError("username", { message: error.message });
            });
        })}
        className="flex justify-between items-center gap-2"
      >
        <div className="flex items-center gap-2 w-full">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter new username"
            className="w-full"
            {...register("username")}
          />
        </div>

        <button
          className="text-zinc-900 font-bold bg-white p-2 rounded-xl hover:cursor-pointer
               hover:bg-cyan-600 hover:text-white duration-300 ease-in-out"
        >
          Save
        </button>
      </form>
      {errors.username && (
        <p className="text-red-600">{errors.username.message}</p>
      )}
      {successMessage && !errors.username && (
        <p className="text-green-600">{successMessage}</p>
      )}
    </div>
  );
};

export default UsernameSection;
