import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { token, user, isLoggedIn, isRefreshing, status, error } = useSelector(
    (state) => state.user
  );
  return {
    token,
    user,
    isLoggedIn,
    isRefreshing,
    status,
    error,
  };
};
