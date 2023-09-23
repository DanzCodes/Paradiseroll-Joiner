import bcrypt from "bcrypt";
import User from "../models/user.model";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

  res.status(200).json({ id: user._id, accounts: user.accounts });
};

export const signup = async (req: Request, res: Response) => {
  const { nickname, email, password } = req.body;

  const user = await User.findOne({
    $or: [
      { nickname },
      { email }
    ]
  });

  if (user) return res.status(409).json({ message: "User is already exist" });

  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = new User({
    nickname: nickname,
    email: email,
    password: hashedPassword,
    accounts: []
  });

  await newUser.save();
  return res.status(200).json({ id: newUser._id, accounts: [], isAuth: true });
}