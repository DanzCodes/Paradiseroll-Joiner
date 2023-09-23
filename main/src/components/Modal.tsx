import { useEffect } from "react";
import { IResponse } from "../api/accounts";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";

interface IModal {
  error: string;
  title: string;
  loading: boolean;
  firstText: string;
  secondText: string;
  description: string;
  response?: IResponse;
  element: React.ReactNode;
  setError: (...args: any) => void;
  firstEvent: (...args: any) => void;
  secondEvent: (...args: any) => void;
  setModal: (value: boolean) => void;
}

const Modal = ({
  title,
  description,
  element,
  error,
  setError,
  loading,
  response,
  firstText,
  secondText,
  setModal,
  firstEvent,
  secondEvent,
}: IModal) => {
  useEffect(() => {
    const interval = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(interval);
  }, [error]);

  return (
    <div className="fixed flex items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div
        className="absolute bg-[rgba(0,0,0,0.5)] w-full h-full"
        onClick={() => setModal(false)}
      ></div>
      <div className="relative w-full max-w-md max-h-full">
        {loading ? (
          <>
            <div className="flex flex-col text-white gap-y-4 justify-center items-center dark:bg-gray-700 p-8 rounded-xl">
              <b className="text-4xl text-sky-500 animate-spin">
                <AiOutlineLoading3Quarters />
              </b>
              <h2>Loading...</h2>
            </div>
          </>
        ) : (
          <div className="relative flex flex-col gap-y-4 text-white bg-white rounded-lg shadow p-4 dark:bg-gray-700">
            {response ? (
              <>
                <div className="flex flex-col gap-y-6 justify-center items-center">
                  <h3 className="text-xl font-semibold">{response.message}</h3>
                  <button
                    onClick={() => setModal(false)}
                    className="flex justify-center font-semibold items-center gap-x-2 px-4 py-2 hover:bg-transparent border hover:text-sky-500 border-sky-500 rounded-lg bg-sky-500 duration-300 ease-out"
                  >
                    Exit
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 font-bold text-2xl bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 ml-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setModal(false)}
                  >
                    <AiOutlineClose />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {description}
                  </p>
                  <div className="text-red-500 font-semibold text-lg">
                    {error && error}
                  </div>
                  {element}
                </div>
                <div className="grid grid-cols-2 items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={firstEvent}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {firstText}
                  </button>
                  <button
                    type="button"
                    onClick={secondEvent}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    {secondText}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
