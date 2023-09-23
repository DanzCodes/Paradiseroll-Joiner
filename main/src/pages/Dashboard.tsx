import { useState } from "react";

import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import DashboardNav from "../components/dashboard/DashboardNav";

const Dashboard = () => {
  const [ section, setSection ] = useState("home");
  return (
    <div className="flex bg-[#212529] min-h-screen">
      <aside className="hidden sm:flex sm:flex-col">
        <ul className="flex-grow flex flex-col text-white bg-[#272b2f] px-4 py-6 gap-y-4">
          <li onClick={() => setSection("home")} className="flex items-center p-4 text-2xl text-sky-500 bg-[#1b1e22] hover:bg-[#22252a] hover:cursor-pointer rounded-lg duration-300 ease-out">
            <button><AiOutlineHome /></button>
          </li>
          <li onClick={() => setSection("accounts")} className="flex items-center p-4 text-2xl text-gray-300 hover:bg-[#22252a] hover:cursor-pointer hover:text-gray-300 rounded-lg duration-300 ease-out">
            <button><HiOutlineUsers /></button>
          </li>
        </ul>
      </aside>
      <DashboardNav section={section} />
    </div>
  );
};

export default Dashboard;

{
  /**
   * 
   * <aside className="hidden sm:flex sm:flex-col">
        <div className="flex-grow flex flex-col justify-between text-white bg-[#272b2f]">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <a
              href="#"
              className="inline-flex items-center justify-center py-3 "
            >
              <span className="sr-only">Folders</span>
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center py-3 text-purple-600 bg-white rounded-lg"
            >
              <span className="sr-only">Dashboard</span>
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </a>
          </nav>
          <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
            <button className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
              <span className="sr-only">Settings</span>
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>
   * 
   * <div className="flex-grow">
        <header className="flex items-center h-20 px-6 sm:px-10">
          <div className="flex flex-shrink-0 items-center ml-auto">
            <div>
              <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                <span className="sr-only">Notifications</span>
                <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
                <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                <span className="sr-only">Log out</span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main className="px-6 sm:px-4 space-y-6 text-white">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
            </div>
            <div className="flex flex-wrap items-start justify-end -mb-3">
              <button className="inline-flex px-5 py-3 text-sky-600 hover:text-sky-700 focus:text-sky-700 hover:bg-purple-100 focus:bg-purple-100 border border-sky-600 rounded-md mb-3">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Edit account
              </button>
              <button className="inline-flex px-5 py-3 text-white bg-sky-600 hover:bg-sky-700 focus:bg-sky-700 rounded-md ml-6 mb-3">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add new account
              </button>
            </div>
          </div>
          <section className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
            <div className="flex items-center p-8 bg-gray-800 shadow rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 text-2xl text-sky-600 bg-purple-100 rounded-full mr-6">
                <HiOutlineUsers />
              </div>
              <div>
                <span className="block text-2xl font-bold">0</span>
                <span className="block text-gray-400">Connected accounts</span>
              </div>
            </div>
            <div className="flex items-center p-8 bg-gray-800 shadow rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 text-2xl text-green-600 bg-purple-100 rounded-full mr-6">
                <MdTimeline />
              </div>
              <div>
                <span className="block text-2xl font-bold">0</span>
                <span className="block text-gray-400">Joined times</span>
              </div>
            </div>
          </section>
          <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6"></section>
        </main>
      </div>
   */
}
