import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyCommentsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 댓글</Text>
      <Text style={styles.empty}>작성한 댓글이 없습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontWeight: 'bold', fontSize: 16 },
  empty: { marginTop: 12, color: '#999' },
});

export default MyCommentsScreen;
