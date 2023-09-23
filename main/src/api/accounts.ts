import axios from "./axios";

export interface IAccount {
  name: string;
  userId: string;
  tokenCookie: string;
}

export interface IResponse {
  message: string;
  code: number;
}

export const addAccount = (account: IAccount) =>
  axios.post("/account", account);
export const activeAccount = (id: string) =>
  axios.post("/activeaccount", { id });
export const desactiveAccount = (id: string) =>
  axios.post("/desactiveAccount", { id });
