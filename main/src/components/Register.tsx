import { signup } from "../api/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContextStore } from "../store/userStore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { nickname, email, password, save } = userContextStore();

  const submitHandle = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!email || !password || !nickname) return setError("Complete the fields");
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return setError("Invalid email");

    setLoading(true);
    signup({ nickname, email, password })
      .then(({ data }) => {
        save({ id: data.id, accounts: data.accounts, isAuth: true });
        return navigate("/dashboard");
      })
      .catch(({ response: { data } }) => {
        return setError(data.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const time = setTimeout(() => setError(""), 3000);

    return () => clearTimeout(time);
  }, [error]);

  return (
    <div className="shadow-xl px-24 w-full py-12 rounded-lg bg-gray-800">
      {loading ? (
        <div className="flex flex-col gap-y-4 justify-center items-center">
          <b className="text-4xl text-sky-500 animate-spin">
            <AiOutlineLoading3Quarters />
          </b>
          <h2>Loading...</h2>
        </div>
      ) : (
        <form className="flex flex-col justify-center items-center text-white">
          <label className="text-2xl font-bold">Register</label>
          <div className="flex flex-col gap-y-6 w-full">
            <div className="h-6">
              <p
                className={`text-red-500 ${
                  error ? "opacity-1" : "opacity-0"
                } duration-300`}
              >
                {error}
              </p>
            </div>
            <div className="flex flex-col">
              <label>Nickname</label>
              <input
                type="text"
                id="email"
                onChange={(e) => save({ nickname: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Input your nickname"
                required
              />
            </div>
            <div className="flex flex-col">
              <label>E-mail</label>
              <input
                type="text"
                id="email"
                onChange={(e) => save({ email: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Input your email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => save({ password: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Input your password"
                required
              />
            </div>
            <button
              onClick={(e) => submitHandle(e)}
              className="bg-sky-700 w-full py-2 rounded-lg font-semibold hover:bg-sky-900 ease-out duration-200"
            >
              Sign up
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
