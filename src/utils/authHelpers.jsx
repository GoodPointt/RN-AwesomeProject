export const loginUser = (users, loginFormData) => {
  return users.find(
    (user) =>
      user.email === loginFormData.email &&
      user.password === loginFormData.password
  );
};

export const isUserExist = (users, regFormData) => {
  return users.find(
    (user) =>
      user.email === regFormData.email || user.login === regFormData.login
  );
};

export const registerNewUser = (users, setUsers, regFormData) => {
  if (isUserExist(users, regFormData)) return false;
  else setUsers((state) => [...state, regFormData]);
  return true;
};
