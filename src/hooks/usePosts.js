import { useSelector } from 'react-redux';

export const usePosts = () => {
  const { posts, status, error } = useSelector((state) => state.posts);
  return {
    posts,
    status,
    error,
  };
};
