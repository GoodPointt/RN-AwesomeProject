import { Image, StyleSheet, Text, View } from 'react-native';
import { formatDateTime } from '../utils/formatDate';

export const Comment = ({ item, authUserAuthor }) => {
  return (
    <View style={[styles.commentWrapper, authUserAuthor && styles.evenComment]}>
      <View style={styles.commentAuthorBox}>
        <Image
          style={styles.authorAvaImg}
          source={{ uri: authUserAuthor ? authUserAuthor : item.avatar }}
        />
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.authorName}>{item.name}</Text>
        <Text style={styles.commentText}>{item.comment}</Text>
        <Text
          style={[styles.commentDate, !authUserAuthor && styles.evenDateText]}
        >
          {formatDateTime(item.createdAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentWrapper: {
    flexDirection: 'row',
    marginVertical: 25,
    gap: 16,
  },
  commentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 6,
    padding: 12,
  },
  commentAuthorBox: { alignItems: 'center' },
  authorAvaImg: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentText: {
    color: '#212121',
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    marginTop: 8,
  },
  commentDate: {
    marginTop: 5,
    textAlign: 'right',
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
  },
  evenComment: {
    flexDirection: 'row-reverse',
  },
  evenDateText: {
    textAlign: 'left',
  },
  authorName: {
    fontSize: 13,
    color: '#7e7e7e',
    fontFamily: 'Roboto-Regular',
  },
});
