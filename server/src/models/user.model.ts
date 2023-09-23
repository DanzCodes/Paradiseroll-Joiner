import { Schema, model } from "mongoose";

export interface IAccount {
  _id?: any;
  name: string;
  isActive: boolean;
  joinedTimes: number;
  tokenCookie: string;
  errorMessage: string;
}

interface IUser {
  _id?: any;
  email: string;
  password: string;
  nickname: string;
  accounts: Array<IAccount>;
}

const AccountSchema = new Schema<IAccount>({
  name: { type: String },
  isActive: { type: Boolean },
  joinedTimes: { type: Number },
  errorMessage: { type: String },
  tokenCookie: { type: String, unique: true },
}, { timestamps: true });

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, trim: true },
  accounts: [AccountSchema]
}, { timestamps: true });

export default model("User", userSchema);