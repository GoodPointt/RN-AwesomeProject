import { useSelector } from 'react-redux';

export const usePosts = () => {
  const { allPosts, userPosts, comments, status, likeStatus, error } =
    useSelector((state) => state.posts);
  return {
    likeStatus,
    allPosts,
    comments,
    userPosts,
    status,
    error,
  };
};
