import { createContext, useState } from "react";

export const UserContext = createContext();

export const useUserAuth = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);

  return {
    users,
    setUsers,
    userId,
    setUserId,
  };
};
