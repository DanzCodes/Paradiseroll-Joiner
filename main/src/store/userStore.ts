import { create } from "zustand";

interface Account {
  _id: any;
  name: string;
  isActive: boolean;
  timestamp: string;
  joinedTimes: number;
  tokenCookie: string;
  errorMessage: string;
}

export interface IUserData {
  id: string;
  email: string;
  isAuth: boolean;
  nickname: string;
  password: string;
  accounts: Account[];
  return: () => IUserData;
  updateAccount: (index: number, newAccount: Account) => void;
  select: (property: keyof IUserData) => any;
  save: (
    property: Partial<IUserData>,
    callback?: (states: IUserData) => void
  ) => void;
}

export const userContextStore = create<IUserData>((set, get) => ({
  id: "",
  email: "",
  nickname: "",
  password: "",
  isAuth: false,
  accounts: [],
  select: (property: keyof IUserData) => {
    return get()[property];
  },
  updateAccount: (index: number, newAccount: Account) => {
    const accounts = get().accounts;
    accounts[index] = newAccount;
    set({ accounts: accounts });
  },
  save: (property: Partial<IUserData>) => set(property),
  return: () => {
    return get();
  },
}));
