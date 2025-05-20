import { useState } from "react";
import { CheckboxToggle } from "./CheckboxToggle";
import Input from "./Input";
import PopUpModal from "./PopUpModal";
import { AnimatePresence } from "motion/react";

const Settings = () => {
  const [isModalOpen, setModalVisibility] = useState(false);

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

            <form>
              <Input
                id="username"
                label="Username"
                type="text"
                placeholder="Enter new username"
              >
                <button className="text-zinc-900 font-bold bg-white p-2 rounded-xl hover:cursor-pointer hover:bg-green-600 hover:text-white duration-300 ease-in-out">
                  Save
                </button>
              </Input>
            </form>
          </div>

          <hr className="opacity-20 my-6" />

          {/* Password Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Change Password</h3>

            <Input
              label="Old Password"
              id="old-password"
              type="password"
              placeholder="Enter old password"
            />
            <Input
              label="New Password"
              id="new-password"
              type="password"
              placeholder="Enter new password"
            />
            <Input
              label="Confirm Password"
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
            />

            <div className="flex justify-end">
              <button className="text-zinc-900 font-bold bg-white px-6 py-2 rounded-xl hover:cursor-pointer hover:bg-green-600 hover:text-white duration-300 ease-in-out">
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
