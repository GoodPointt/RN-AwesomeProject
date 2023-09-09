import { Feather, SimpleLineIcons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SmallUserBox } from './SmallUserBox';
import { formatDateTime } from '../utils/formatDate';
import { likeHandle } from '../redux/posts/operations';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { memo } from 'react';

export const PostItem = memo(({ item, commentDetails, locationDetails }) => {
  const [isLiking, setIsLiking] = useState(false);
  const route = useRoute();
  const dispatch = useDispatch();

  const incrementLike = async (postId) => {
    setIsLiking(true);
    await dispatch(likeHandle(postId));
    setIsLiking(false);
  };

  return (
    <View style={styles.itemContainer}>
      {route.name === 'PostsScreen' ? (
        <SmallUserBox
          avatar={item.owner.avatar}
          name={item.owner.name}
          createdAt={item.createdAt}
        />
      ) : (
        <Text style={styles.dateText}>{formatDateTime(item.createdAt)}</Text>
      )}
      <ImageBackground
        source={require('../assets/img/images-blur-paceholder.jpg')}
      >
        <Image source={{ uri: item.photo }} style={styles.itemImage} />
      </ImageBackground>

      <Text style={styles.nameText}>{item.name}</Text>
      <View style={styles.underCardInfo}>
        <View style={styles.stats}>
          <TouchableOpacity onPress={commentDetails}>
            <View style={styles.stat}>
              <Feather
                name="message-circle"
                size={24}
                color={item.isCommented ? '#FF6C00' : '#535352d2'}
              />
              <Text style={styles.statText}>{item.comments.length}</Text>
            </View>
          </TouchableOpacity>
          {isLiking ? (
            <ActivityIndicator size={25} color={'#FF6C00'} />
          ) : (
            <TouchableOpacity onPress={() => incrementLike(item.id)}>
              <View style={styles.stat}>
                <Feather
                  name="thumbs-up"
                  size={24}
                  color={item.isLiked ? '#FF6C00' : '#535352d2'}
                />
                <Text style={styles.statText}>{item.likes.length}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={locationDetails}>
          <View style={styles.stat}>
            <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
            <Text style={styles.locationText}>{item.location.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
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

  dateText: { color: '#ababab' },
});
