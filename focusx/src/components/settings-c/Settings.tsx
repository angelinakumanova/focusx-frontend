import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { CheckboxToggle } from "../CheckboxToggle";
import PopUpModal from "../PopUpModal";
import UsernameSection from "./UsernameSection";
import PasswordSection from "./PasswordSection";
import api from "@/services/api";
import { useAuthStore } from "@/context/useAuthStore";

const Settings = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [isModalOpen, setModalVisibility] = useState(false);

  return (
    <div className="bg-neutral-950 p-4 md:p-10 overflow-y-auto lg:min-w-5xl mx-auto text-neutral-200  space-y-12 ">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-neutral-400">Manage your preferences and account.</p>
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
          <UsernameSection />

          <hr className="opacity-20 my-6" />

          <PasswordSection />
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
              confirmFn={() => {
                api
                  .put(`/users/${user?.id}/deactivate`)
                  .then(() => logout())
                  .catch(() => console.log("working"));
              }}
            />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Settings;
