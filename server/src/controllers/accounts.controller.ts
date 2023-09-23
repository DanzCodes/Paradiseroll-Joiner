import User from "../models/user.model";
import { Request, Response } from "express";

export const add = async (req: Request, res: Response) => {
  const { name, tokenCookie, userId } = req.body;

  const user = await User.findById(userId);

  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.accounts.some((account) => account.tokenCookie === tokenCookie))
    return res
      .status(400)
      .json({ message: "An account already exists with this token" });
  else {
    const accountName = name || "account " + user.accounts.length;
    const i = user.accounts.push({
      joinedTimes: 0,
      isActive: false,
      name: accountName,
      tokenCookie: tokenCookie,
      errorMessage: "",
    });

    await user.save();
    return res
      .status(200)
      .json({
        message: "Account created successfully",
        name: accountName,
        index: i - 1,
        accounts: user.accounts,
      });
  }
};

export const active = async (req: Request, res: Response) => {
  const { id } = req.body;

  const user = await User.findOne({
    "accounts._id": id,
  });

  if (!user) return res.status(404).json({ message: "The account doesn't exist" });

  const accountIndex = user.accounts.findIndex(account => account._id.toString() === id)
  if(user.accounts[accountIndex].isActive) return res.status(403).json({ message: "This account is already actived" });

  user.accounts[accountIndex].isActive = true;
  await user.save();
  return res.status(200).json({ message: "The account was active sucessfully" });
};

export const desactive = async (req: Request, res: Response) => {
  const { id } = req.body;

  const user = await User.findOne({
    "accounts._id": id,
  });

  if (!user) return res.status(404).json({ message: "The account doesn't exist" });

  const accountIndex = user.accounts.findIndex(account => account._id.toString() === id)
  if(!user.accounts[accountIndex].isActive) return res.status(403).json({ message: "This account is already desactived" });

  user.accounts[accountIndex].isActive = false;
  await user.save();
  return res.status(200).json({ message: "The account was desactive sucessfully" });
};
