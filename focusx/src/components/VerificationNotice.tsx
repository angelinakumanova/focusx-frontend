import userApi from "@/services/userApi";
import ErrorDisplay from "./ErrorDisplay";
import axios from "axios";
import { useState } from "react";

const VerificationNotice = () => {
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();
  const [isResent, setResent] = useState(false);
  const isPending = sessionStorage.getItem("pendingVerification");
  const email = sessionStorage.getItem("pendingEmail");

  return isPending === 'true' ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-2xl p-4">
        <h1 className="text-xl font-semibold mb-3">
          A verification email has been sent
        </h1>

        <p className="text-md text-gray-300 mb-2">{`We’ve sent a verification link to ${email}.
         Please check your inbox and click the link to activate your account.`}</p>
        <p className="text-xs font-bold text-gray-400 mb-6">
          Didn’t get the email? Check your spam folder or click below to resend
          it.
        </p>

        <div className="flex items-start flex-row-reverse justify-end gap-2">
          {error && (
            <p className="text-right text-base mt-2 text-red-600 opacity-80">
              {error}
            </p>
          )}

          {success && (
            <p className="text-right text-base mt-2 text-green-600 opacity-80">
              {success}
            </p>
          )}

          <button
            type="button"
            onClick={resendVerification}
            disabled={isResent}
            className={
              "w-48 rounded-sm px-4 py-2 bg-gray-700 transition-colors text-sm " +
              (isResent
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-600 hover:cursor-pointer")
            }
          >
            {isResent ? "Sent" : "Resend"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <ErrorDisplay />
  );

  async function resendVerification() {
    const email = sessionStorage.getItem("pendingEmail");

    try {
      await userApi.post("/auth/resend-verification", {
        email,
      });

      setSuccess("New verification link has been sent to your email!");
      setResent(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("An error occured, please try again!");
      }
    }
  }
};

export default VerificationNotice;
