import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { token, user, isLoggedIn, isRefreshing } = useSelector(
    (state) => state.user
  );
  return {
    token,
    user,
    isLoggedIn,
    isRefreshing,
  };
};
