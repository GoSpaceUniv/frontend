import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const NOTIFS = Array.from({ length: 6 }).map((_, i) => ({
  id: `n_${i+1}`,
  title: `새 댓글 알림 ${i+1}`,
  message: '당신의 게시물에 새 댓글이 달렸습니다.',
}));

const NotificationsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={NOTIFS}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.msg}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontWeight: 'bold', color: '#333' },
  msg: { color: '#666', marginTop: 4 },
});

export default NotificationsScreen;
