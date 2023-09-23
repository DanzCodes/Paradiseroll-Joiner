import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col relative text-white justify-center items-center bg-[#111827] w-full h-[100vh]">
      <div className="home-background absolute w-full h-full"></div>
      <div className="flex flex-col w-4/5 md:w-1/3 items-center gap-y-12 z-10">
        <h1 className="font-bold text-5xl font-primary">RoJoiner</h1>
        <div className="flex gap-x-24">
          <button
            onClick={() => navigate("/register")}
            className="flex justify-center items-center w-32 gap-x-2 px-6 py-2 rounded-lg border hover:bg-sky-500 hover:text-white text-sky-500 border-sky-500 duration-300 ease-out"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="flex justify-center items-center w-32 gap-x-2 px-6 py-2 hover:bg-transparent border hover:text-sky-500 border-sky-500 rounded-lg bg-sky-500 duration-300 ease-out"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
