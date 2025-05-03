import { CheckboxToggle } from "./CheckboxToggle";
import Input from "./Input";

const Settings = () => {
  return (
    <div className="bg-neutral-950 p-4 md:p-10  text-neutral-200 space-y-12 ">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-neutral-400">
          Manage your preferences and account options.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Account</h2>
        <div className="space-y-6 bg-neutral-800 rounded-2xl p-6">
          {/* Username Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Change Username</h3>

            <Input
              id="username"
              label="Username"
              type="text"
              placeholder="Enter new username"
            >
              <button className="text-zinc-900 font-bold bg-white p-2 rounded-xl hover:cursor-pointer hover:bg-cyan-600 hover:text-white duration-300 ease-in-out">
                Save
              </button>
            </Input>
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
              <button className="text-zinc-900 font-bold bg-white px-6 py-2 rounded-xl hover:cursor-pointer hover:bg-cyan-600 hover:text-white duration-300 ease-in-out">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Settings;
