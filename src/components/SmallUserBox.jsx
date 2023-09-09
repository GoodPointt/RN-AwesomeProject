import { Image, StyleSheet, Text, View } from 'react-native';
import { formatDateTime } from '../utils/formatDate';

export const SmallUserBox = ({
  avatar,
  name,
  email = null,
  createdAt = null,
}) => {
  return (
    <View style={[styles.userBox, createdAt ? styles.createdAtBox : null]}>
      <Image
        style={[styles.avatarImg, createdAt ? styles.createdAtImg : null]}
        source={{ uri: avatar }}
      />

      <View>
        <Text style={styles.name}>{name}</Text>
        {email && <Text style={styles.email}>{email}</Text>}
        {createdAt && (
          <Text style={styles.email}>{formatDateTime(createdAt)}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  createdAtBox: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginBottom: 5,
  },
  createdAtImg: { borderRadius: 50, height: 40, width: 40 },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#f6f6f6',
  },
  name: {
    color: '#212121',
    textAlign: 'left',
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
  email: {
    color: 'rgba(33, 33, 33, 0.80)',
    textAlign: 'left',
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
  },
});
