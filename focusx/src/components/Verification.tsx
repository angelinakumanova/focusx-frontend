import ErrorDisplay from "./ErrorDisplay";

const Verification = () => {
  const pendingEmail = localStorage.getItem('pendingEmail');


  // useEffect(() => {
  //   async function verify() {
  //     try {
  //       await userApi.post(`/auth/verify?code=${code}`);
  //       setStatus("success");

  //       setTimeout(() => {
  //         window.location.href = "/home";
  //       }, 5000);
  //     } catch {
  //       setStatus("error");
  //     }
  //   }

  //   verify();
  // }, [code]);

  if (!pendingEmail) {
    return <ErrorDisplay />;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-2xl p-4">
        <h1 className="text-xl font-semibold mb-3">
          A verification email has been sent
        </h1>

        <p className="text-md text-gray-300 mb-2">{`We’ve sent a verification link to ${localStorage.getItem(
          "pendingEmail"
        )}.
         Please check your inbox and click the link to activate your account.`}</p>
        <p className="text-xs font-bold text-gray-400 mb-6">
          Didn’t get the email? Check your spam folder or click below to resend
          it.
        </p>

        <div className="flex items-start flex-row-reverse justify-end gap-2">
          {/* {error && (
            <p className="text-right text-base mt-2 text-red-600 opacity-70">
              An error occured, please try again!
            </p>
          )} */}

          <button className="w-48 rounded-sm px-4 py-2 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer transition-colors text-sm">
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
