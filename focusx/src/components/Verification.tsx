import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useSearchParams } from "react-router-dom";
import userApi from "@/services/userApi";

const Verification = () => {
  const [status, setStatus] = useState("verifying");
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");


  useEffect(() => {
    async function verify() {
      if (code) {
        try {
          await userApi.post(`/auth/verify?code=${code}`);
          setStatus("success");

          setTimeout(() => {
            window.location.href = "/home";
          }, 5000);
        } catch {
          setStatus("error");
        }
      } else {
        setStatus("error");
      }
    }

    verify();
  }, [code]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        {status === "verifying" && <Spinner width="w-16" />}
        <h1 className="text-4xl font-bold uppercase">
          {status === "success"
            ? "Your account has been verified"
            : "Invalid or expired link"}
        </h1>
      </div>
    </div>
  );
};

export default Verification;
