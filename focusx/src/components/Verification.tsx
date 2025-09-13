import userApi from "@/services/userApi";
import ErrorDisplay from "./ErrorDisplay";
import { useEffect, useState } from "react";

const Verification = () => {
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "error"
  );

  useEffect(() => {
    async function verify() {
      const verificationToken = localStorage.getItem("verification_token");

      if (verificationToken) {
        setStatus('pending');

        try {
          await userApi.post(
            `/auth/verify`,
            {}, 
            {
              headers: {
                Authorization: "Bearer " + verificationToken,
              },
            }
          );

          localStorage.removeItem('verification_token');
          localStorage.removeItem('pending_email');

          setStatus('success');

          setTimeout(() => {
            window.location.href = "/home";
          }, 5000);
        } catch {
          setStatus("error");
        }
      }
    }

    verify();
  }, []);

  if (status === 'success') {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-3xl mb-3">Your account has been verified! <span className="font-bold">Welcome to FocusX!</span></p>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-3xl font-semibold mb-3">Verifying your account...</p>
      </div>
    );
  }

  if (status === "error") {
    return <ErrorDisplay />;
  }


};

export default Verification;
