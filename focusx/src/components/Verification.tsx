import userApi from "@/services/userApi";
import ErrorDisplay from "./ErrorDisplay";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";

const Verification = () => {
  const [status, setStatus] = useState<
    "loading" | "pending" | "success" | "invalid" | "error"
  >("loading");

  const [searchParams] = useSearchParams();
  const verificationCode = searchParams.get("verificationCode");

  useEffect(() => {
    async function verify() {
      console.log(verificationCode);

      if (verificationCode) {
        setStatus("pending");

        try {
          await userApi.post(
            `/auth/verify?verificationCode=${verificationCode}`
          );

          setStatus("success");

          setTimeout(() => {
            window.location.href = "/login";
          }, 5000);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
              setStatus("invalid");
              return;
            }
          }

          setStatus("error");
        }
      }
    }

    verify();
  }, []);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "pending") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-3xl font-semibold mb-3 uppercase">Verifying your account...</p>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-3xl font-semibold mb-3 uppercase">Invalid or expired link</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-3xl mb-3">
          Your account has been verified!{" "}
          <span className="font-bold">Welcome to FocusX!</span>
        </p>
      </div>
    );
  }

  if (status === "error") {
    return <ErrorDisplay />;
  }
};

export default Verification;
