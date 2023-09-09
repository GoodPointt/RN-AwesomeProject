import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Comment } from './Comment';
import { useDispatch } from 'react-redux';
import { RefreshControl } from 'react-native-gesture-handler';
import { fetchComments } from '../redux/posts/operations';

const CommentsList = ({ comments, user, post }) => {
  const dispatch = useDispatch();

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.commentsList}
      data={comments}
      renderItem={({ item }) => (
        <Comment
          item={item}
          authUserAuthor={user.name === item.owner.name ? user.avatar : false}
        />
      )}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl onRefresh={() => dispatch(fetchComments(post.id))} />
      }
    />
  );
};

const styles = StyleSheet.create({
  commentsList: {
    gap: 40,
  },
});

export default CommentsList;
