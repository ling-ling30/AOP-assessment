import { Request, Response } from "express";
import { getUserUsername, createUser, getUserById } from "./services";
import { generateToken } from "./middleware";
import { comparePassword } from "./lib";
import { tryCatch } from "../lib";

export const register = tryCatch(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Please input username and password" });
    return;
  }

  if (getUserUsername(username)) {
    res.status(400).json({ message: "Username already exists" });
    return;
  }
  const newUser = await createUser(username, password);
  res.status(201).json(newUser);
});

export const login = tryCatch(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Please input username and password" });
    return;
  }
  const user = getUserUsername(username);

  if (!user || !(await comparePassword(password, user.password))) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  const token = generateToken(user.id);
  res.json({ token });
});

export const getProfile = tryCatch(async (req: Request, res: Response) => {
  const user = getUserById((req as any).user.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json({ id: user.id, username: user.username });
});
