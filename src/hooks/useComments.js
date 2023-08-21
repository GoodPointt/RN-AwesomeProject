import { useSelector } from 'react-redux';

export const useComments = () => {
  const { comments, status, error } = useSelector((state) => state.comments);
  return {
    comments,
    status,
    error,
  };
};
