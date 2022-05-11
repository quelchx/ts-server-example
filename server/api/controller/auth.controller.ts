import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../models/User";
import { Request, Response } from "express";

const authError = (res: Response) => {
  return res.status(404).json({ error: "Credentails do not match" });
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  try {
    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json({ message: "User Created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) return authError(res);

    const isPasswordVerified = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordVerified) return authError(res);

    const token: string = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET!
    );

    // extracting password and isAdmin to remove from JSON return
    const { password, isAdmin, ...others } = user._doc;

    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1800,
        path: "/",
      })
    );

    return res.status(200).json({ ...others });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
