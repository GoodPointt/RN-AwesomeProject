import React, { useRef } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { PostItem } from './PostItem';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { fetchPosts } from '../redux/posts/operations';
import { useDispatch } from 'react-redux';
import { SmallUserBox } from './SmallUserBox';

const PostsList = ({ posts, user }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <FlatList
      ref={ref}
      showsVerticalScrollIndicator={false}
      data={posts}
      renderItem={({ item }) => (
        <PostItem
          item={item}
          commentDetails={() =>
            navigation.navigate('Comments', {
              post: item,
            })
          }
          locationDetails={() => navigation.navigate('Map', item)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        user ? (
          <SmallUserBox
            avatar={user.avatar}
            name={user.name}
            email={user.email}
          />
        ) : null
      }
      refreshControl={
        <RefreshControl onRefresh={() => dispatch(fetchPosts())} />
      }
    />
  );
};

export default PostsList;
