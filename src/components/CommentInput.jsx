import React from 'react';
import { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { AntDesign } from '@expo/vector-icons';
import { addComment } from '../redux/posts/operations';
import { nanoid } from '@reduxjs/toolkit';

const CommentInput = ({ post }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [commentValue, setCommentValue] = useState('');

  const { user } = useAuth();

  const dispatch = useDispatch();

  const handleSendComment = () => {
    if (commentValue.trim() === '') {
      Keyboard.dismiss();
      return;
    }
    const newComment = {
      id: nanoid(),
      postId: post.id,
      createdAt: Date.now(),
      comment: commentValue,
      owner: { id: user.id },
    };

    dispatch(addComment(newComment));

    setCommentValue('');
    Keyboard.dismiss();
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  focusedInput: {
    borderColor: '#FF6C00',
    backgroundColor: '#fff',
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
});

export default CommentInput;
