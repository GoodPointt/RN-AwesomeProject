import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  RefreshControl,
} from 'react-native';
import { Comment } from '../components/Comment';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useComments } from '../hooks/useComments';
import { addComment, fetchComments } from '../redux/comments/operations';
import { useAuth } from '../hooks/useAuth';
import { updateTotalComments } from '../redux/posts/postsSlice';

export const CommentsScreen = ({ route: { params } }) => {
  const { post } = params;

  const [commentValue, setCommentValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const { user } = useAuth();
  const { comments, status, error } = useComments();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(post.id));
  }, [dispatch]);

  const handleSendComment = () => {
    if (commentValue.trim() === '') {
      Keyboard.dismiss();
      return;
    }
    const newComment = {
      postId: post.id,
      createdAt: Date.now(),
      name: user.name,
      avatar: user.avatar,
      comment: commentValue,
    };

    dispatch(addComment(newComment));
    dispatch(updateTotalComments({ postId: newComment.postId }));

    setCommentValue('');
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60}
      style={styles.containerAvoid}
    >
      <View style={styles.container}>
        <View style={styles.ImgContainer}>
          <Image source={{ uri: post.photo }} style={styles.postImg} />
        </View>

        {status === 'resolved' && comments.length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.commentsList}
            data={comments}
            renderItem={({ item }) => (
              <Comment item={item} isEven={user.name === item.name} />
            )}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                onRefresh={() => dispatch(fetchComments(post.id))}
              />
            }
          />
        )}
      </View>
      <View>
        <TextInput
          style={[styles.commentInput, isFocused ? styles.focusedInput : null]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={setCommentValue}
          value={commentValue}
          placeholder="Add comment"
        />
        <TouchableOpacity onPress={handleSendComment} style={styles.sendButton}>
          <AntDesign name="arrowup" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
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
  commentsList: {
    gap: 40,
  },
  commentInput: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: '#f6f6f6',
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: '#e8e8e8',
    borderStyle: 'solid',
    marginBottom: 16,
  },
  focusedInput: {
    borderColor: '#FF6C00',
    backgroundColor: '#fff',
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    backgroundColor: '#FF6C00',
    position: 'absolute',
    right: 10,
    top: 7,
    borderRadius: 50,
  },
  postImg: { width: '100%', height: '100%', borderRadius: 8 },
});
