import { Feather, SimpleLineIcons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addLike } from '../redux/posts/postsSlice';
import { updateUserDocDataInFirestore } from '../firebase/auth';
import { useAuth } from '../hooks/useAuth';

export const PostItem = ({
  item: {
    photo,
    name,
    location,
    likes,
    id,
    totalComments,
    isCommented,
    isLiked,
  },
  commentDetails,
  locationDetails,
}) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const incrementLike = (postId, likesCount) => {
    dispatch(addLike({ postId: postId }));

    updateUserDocDataInFirestore(
      postId,
      {
        isLiked: true,
        likes: likesCount + 1,
      },
      `users/${user.id}/posts`
    );
  };
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: photo }} style={styles.itemImage} />
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.underCardInfo}>
        <View style={styles.stats}>
          <TouchableOpacity onPress={commentDetails}>
            <View style={styles.stat}>
              <Feather
                name="message-circle"
                size={24}
                color={isCommented ? '#FF6C00' : '#535352d2'}
              />
              <Text style={styles.statText}>{totalComments}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => incrementLike(id, likes)}>
            <View style={styles.stat}>
              <Feather
                name="thumbs-up"
                size={24}
                color={isLiked ? '#FF6C00' : '#535352d2'}
              />
              <Text style={styles.statText}>{likes}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={locationDetails}>
          <View style={styles.stat}>
            <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
            <Text style={styles.locationText}>{location.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 300,
    borderRadius: 8,
    marginVertical: 35,
  },
  itemImage: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  nameText: {
    color: '#212121',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  statText: {
    color: '#212121',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  locationText: {
    color: '#212121',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    textDecorationLine: 'underline',
  },
  underCardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stats: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    gap: 5,
  },
});
