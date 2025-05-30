import Spinner from "./Spinner";

const LoadingScreen = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <Spinner width="w-16" />
        <h1 className="text-4xl font-bold uppercase">Loading..</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
