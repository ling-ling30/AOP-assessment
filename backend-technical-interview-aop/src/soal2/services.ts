import { hashPassword } from "./lib";

interface User {
  id: number;
  username: string;
  password: string;
}

const users: User[] = [];
let currentId = 1;

export const createUser = async (
  username: string,
  password: string
): Promise<User> => {
  const hashedPassword = await hashPassword(password);
  const newUser: User = {
    id: currentId++,
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  return newUser;
};

export const getUsers = (): User[] => {
  return users;
};

export const getUserUsername = (username: string): User | undefined => {
  return users.find((user) => user.username === username);
};

export const getUserById = (id: number): User | undefined => {
  return users.find((user) => user.id === id);
};
