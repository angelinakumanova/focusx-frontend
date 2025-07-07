import { useAuthStore } from "@/context/useAuthStore";
import userApi from "@/services/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/auth-label";
import { Input } from "../ui/auth-input";
import ErrorResponse from "@/interfaces/ErrorResponse";
import axios from "axios";

const UsernameSection = () => {
  const { user, getUser } = useAuthStore();
  const [successMessage, setSucessMessage] = useState<string | null>(null);

  const usernameSchema = z.object({
    username: z.string()
    // .min(1, { message: "Please enter a valid username"}),

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
            .put(`/users/${user?.id}/username`, {username: data.username}, {
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
              if (axios.isAxiosError(err)) {
                const response = err.response?.data as ErrorResponse;
                console.log(response);
                
                const fieldErrors = response.fieldErrors;

                if (!fieldErrors) {
                  setError("root", {
                    message: response.message,
                  });
                  return;
                }

                for (let error of fieldErrors) {
                  
                  const validFields = [
                    "username",
                  ] as const;
                  type FormField = (typeof validFields)[number];

                  if (validFields.includes(error.field as FormField)) {
                    setError(error.field as FormField, {
                      message: error.message,
                    });
                  }

                  return;
                }

                setError("root", {
                  message:
                    "There was an error with changing your username. Please try again!",
                });
              }
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
      {errors.root && (
        <p className="text-red-600">{errors.root.message}</p>
      )}
      {successMessage && !errors.username && (
        <p className="text-green-600">{successMessage}</p>
      )}
    </div>
  );
};

export default UsernameSection;
