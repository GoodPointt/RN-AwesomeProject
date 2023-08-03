import { createContext, useState } from "react";

export const UserContext = createContext();

export const useUserAuth = () => {
  const [users, setUsers] = useState([]);

  return {
    users,
    setUsers,
  };
};
