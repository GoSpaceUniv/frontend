import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const COMMENTS = Array.from({ length: 5 }).map((_, i) => ({
  id: `c_${i+1}`,
  content: `댓글 내용 ${i+1}`,
  author: `익명 ${1000 + i}`,
}));

const PostDetailScreen: React.FC<any> = ({ route }) => {
  const { postId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>게시글 {postId}</Text>
      <Text style={styles.content}>게시글 상세 내용 ...</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}><Text>좋아요 12</Text></TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}><Text>비추 1</Text></TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}><Text>스크랩</Text></TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>댓글</Text>
      <FlatList
        data={COMMENTS}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.commentAuthor}>{item.author}</Text>
            <Text>{item.content}</Text>
            <View style={styles.commentActions}>
              <TouchableOpacity><Text style={styles.link}>답글</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.link}>좋아요</Text></TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { marginTop: 12, color: '#333' },
  actions: { flexDirection: 'row', gap: 12, marginVertical: 16 },
  actionBtn: { backgroundColor: '#f6f6f6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  sectionTitle: { fontWeight: 'bold', marginVertical: 12 },
  commentAuthor: { fontWeight: '600', color: '#555' },
  commentActions: { flexDirection: 'row', gap: 12, marginTop: 6 },
  link: { color: '#f4511e', fontWeight: '600' },
});

export default PostDetailScreen;
