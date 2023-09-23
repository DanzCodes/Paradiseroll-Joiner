import Modal from "../Modal";
import { useState } from "react";

import { IAccount, IResponse, addAccount } from "../../api/accounts";
import { userContextStore } from "../../store/userStore";

const AddNewAccount = ({ setModal }: { setModal: (...args: any) => void }) => {
  const [account, setAccount] = useState<IAccount>({
    name: "",
    userId: "",
    tokenCookie: "",
  });

  const { id, save } = userContextStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<IResponse>();

  const sendAccount = async () => {
    if (!account.tokenCookie) return setError("Input a token cookie");

    setLoading(true);
    addAccount({ ...account, userId: id })
      .then((res) => {
        setResponse(res.data);
        save({ accounts: res.data.accounts });
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Modal
        title="Add new account"
        description="How can your set your cookies? Go to example.com and press f12 and click in application and Cookies, get the cookie: cookie_name"
        error={error}
        loading={loading}
        response={response}
        setError={setError}
        element={
          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              name="name"
              onChange={(e) => {
                setAccount((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Account name"
            />
            <input
              type="email"
              name="email"
              onChange={(e) => {
                setAccount((prev) => ({
                  ...prev,
                  tokenCookie: e.target.value,
                }));
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Input your cookies here..."
              required
            />
          </div>
        }
        firstText="Add"
        secondText="Cancel"
        setModal={setModal}
        firstEvent={sendAccount}
        secondEvent={() => setModal(false)}
      />
    </div>
  );
};

export default AddNewAccount;
