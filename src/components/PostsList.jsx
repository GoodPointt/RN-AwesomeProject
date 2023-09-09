import React, { useRef } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { PostItem } from './PostItem';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { SmallUserBox } from './SmallUserBox';

const PostsList = ({ posts, user, fetchOnRefresh }) => {
  const navigation = useNavigation();
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
        <RefreshControl onRefresh={fetchOnRefresh} colors={['#FF6C00']} />
      }
    />
  );
};

export default PostsList;
