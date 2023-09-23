import { useState } from "react";
import AddNewAccount from "./AddNewAccount";
import { MdTimeline } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FiEdit2, FiPlus } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { userContextStore } from "../../store/userStore";
import { activeAccount, desactiveAccount } from "../../api/accounts";

const Home = () => {
  const { accounts, updateAccount, return: get } = userContextStore();
  const [fetching, setFetching] = useState(false);
  const [modal, setModal] = useState(false);

  const update = (index: number, value: boolean) => {
    const updatedAccount = {
      ...get().accounts[index],
      isActive: value,
    };
    updateAccount(index, updatedAccount);
  };

  const AccountProfile = ({
    id,
    index,
    isActive,
    name,
    times,
  }: {
    id: string;
    index: number;
    isActive: boolean;
    name: string;
    times: number;
  }) => {
    return (
      <div className="flex items-center p-8 bg-[#272b2f] shadow rounded-lg">
        <div
          className={`relative flex items-center justify-center h-16 w-16 text-2xl ${
            isActive ? "text-green-500" : "text-red-500"
          } bg-gray-300 rounded-full mr-6`}
        >
          {isActive && (
            <span className="animate-ping absolute top-1 right-1 inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
          )}
          <span
            className={`absolute top-1 right-1 inline-flex rounded-full h-3 w-3 ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <AiOutlineUser />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="block text-2xl font-bold">{name}</span>
          <span className="block text-gray-400">Joined times: {times}</span>
          <button
            onClick={() => {  
              if(fetching) return;
              
              setFetching(true);
              !isActive
                ? activeAccount(id).then(() => {update(index, true); setFetching(false)})
                : desactiveAccount(id).then(() => {update(index, false); setFetching(false)})
            }}
            className={`border mt-2 ${
              isActive
                ? "border-red-500 text-red-500 hover:bg-red-500"
                : "border-green-500 text-green-500 hover:bg-green-500"
            }   hover:text-white px-2 py-1 rounded-lg w-full duration-300 ease-out`}
          >
            {isActive ? "Desactive account" : "Active account"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {modal && <AddNewAccount setModal={setModal} />}
      <main className="flex flex-col gap-y-8 text-white px-12 py-6 w-full">
        <header className="flex justify-between">
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          <div className="grid grid-cols-2 gap-x-4">
            <button className="flex justify-center items-center gap-x-2 px-2 rounded-lg border hover:bg-sky-500 hover:text-white text-sky-500 border-sky-500 duration-300 ease-out">
              <FiEdit2 />
              Edit/Delete account
            </button>
            <button
              onClick={() => setModal(true)}
              className="flex justify-center items-center gap-x-2 px-2 hover:bg-transparent border hover:text-sky-500 border-sky-500 rounded-lg bg-sky-500 duration-300 ease-out"
            >
              <FiPlus />
              Add new account
            </button>
          </div>
        </header>
        <section className="flex flex-col gap-y-8">
          <div className="grid grid-cols-2 gap-x-4">
            <div className="flex items-center p-8 bg-[#272b2f] shadow rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 text-2xl text-sky-600 bg-purple-100 rounded-full mr-6">
                <HiOutlineUsers />
              </div>
              <div>
                <span className="block text-2xl font-bold">0</span>
                <span className="block text-gray-400">Connected accounts</span>
              </div>
            </div>
            <div className="flex items-center p-8 bg-[#272b2f] shadow rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 text-2xl text-green-600 bg-purple-100 rounded-full mr-6">
                <MdTimeline />
              </div>
              <div>
                <span className="block text-2xl font-bold">0</span>
                <span className="block text-gray-400">Active accounts</span>
              </div>
            </div>
          </div>
          <div className="flex gap-x-4">
            {accounts.map((account, i) => (
              <AccountProfile
                index={i}
                id={account._id}
                isActive={account.isActive}
                name={account.name}
                times={account.joinedTimes}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
