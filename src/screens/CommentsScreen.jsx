import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchComments, fetchUserPosts } from '../redux/posts/operations';
import { useAuth } from '../hooks/useAuth';
import CommentsList from '../components/CommentsList';
import CommentInput from '../components/CommentInput';
import vars from '../utils/vars';
import { usePosts } from '../hooks/usePosts';

export const CommentsScreen = ({ route: { params } }) => {
  const { post } = params;

  const { user } = useAuth();
  const { status, comments } = usePosts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(post.id));
  }, [dispatch]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60}
      style={styles.containerAvoid}
    >
      <View style={styles.container}>
        <View style={styles.ImgContainer}>
          <Image source={{ uri: post?.photo }} style={styles.postImg} />
        </View>
        {status === vars.LOADING && (
          <ActivityIndicator size={100} color={'#FF6C00'} style={{ flex: 1 }} />
        )}

        {status === vars.RESOLVED && comments.length > 0 && (
          <CommentsList comments={comments} user={user} post={post} />
        )}

        {status === vars.REJECTED && (
          <Text>Opps! an error occured: {error}😒</Text>
        )}
      </View>
      <CommentInput post={post} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerAvoid: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  ImgContainer: {
    borderRadius: 8,
    height: 240,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  postImg: { width: '100%', height: '100%', borderRadius: 8 },
});
