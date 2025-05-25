import { useAuthStore } from "@/context/useAuthStore";
import ErrorResponse from "@/interfaces/ErrorResponse";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckboxToggle } from "./CheckboxToggle";
import PopUpModal from "./PopUpModal";
import { Input } from "./ui/auth-input";
import { Label } from "./ui/auth-label";

const Settings = () => {
  const { user, getUser } = useAuthStore();
  const [successMessage, setSucessMessage] = useState<string | null>(null);

  const [isModalOpen, setModalVisibility] = useState(false);

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
    <div className="bg-neutral-950 p-4 md:p-10 overflow-y-auto lg:min-w-5xl mx-auto text-neutral-200  space-y-12 ">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-neutral-400">
          Manage your preferences and account options.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-4 bg-neutral-800 rounded-2xl p-6">
          <CheckboxToggle
            label="Email Reminders"
            checked={true}
            onChange={(val) => val}
          />

          <CheckboxToggle
            label="Streak Reminders"
            checked={true}
            onChange={(val) => val}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Account</h2>
        <div className="space-y-6 bg-neutral-800 rounded-2xl p-6">
          {/* Username Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Change Username</h3>

            <form
              onSubmit={handleSubmit((data) => {
                api
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

          <hr className="opacity-20 my-6" />

          {/* Password Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Change Password</h3>

            <Input
              id="old-password"
              type="password"
              placeholder="Enter old password"
            />
            <Input
              id="new-password"
              type="password"
              placeholder="Enter new password"
            />
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
            />

            <div className="flex justify-end">
              <button
                className="text-zinc-900 font-bold bg-white px-6 py-2 rounded-xl
               hover:cursor-pointer hover:bg-cyan-600 hover:text-white duration-300 ease-in-out"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </section>

      <hr className="opacity-40" />

      <section>
        <h2 className="text-2xl font-bold">Delete Account</h2>
        <p className="text-sm mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          onClick={() => setModalVisibility(true)}
          className="font-bold px-6 py-2 rounded-xl border-2 border-zinc-400 bg-white text-zinc-900 hover:bg-red-700 hover:border-red-700
      hover:text-white hover:cursor-pointer duration-300 ease-in-out"
        >
          Delete Account
        </button>

        <AnimatePresence>
          {isModalOpen && (
            <PopUpModal
              title="Are you sure you want to delete your account?"
              confirmText="Delete"
              toggleVisibility={() => setModalVisibility(false)}
              confirmFn={() => console.log("It's deleted.")}
            />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Settings;
