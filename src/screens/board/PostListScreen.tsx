import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BoardStackParamList } from '../../navigation/types';

const DUMMY_POSTS = Array.from({ length: 10 }).map((_, i) => ({
  id: `p_${i+1}`,
  title: `게시글 제목 ${i+1}`,
  snippet: '내용 미리보기 ...',
  meta: '익명 고양이 1234 · 2시간 전 · 댓글 3',
}));

type Rt = RouteProp<BoardStackParamList, 'PostList'>;

const PostListScreen: React.FC<{ route: Rt; navigation: any }> = ({ route, navigation }) => {
  const { locationKey, category } = route.params;
  const header = `${locationKey} ${category ? `· ${category}` : ''}`;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      <FlatList
        data={DUMMY_POSTS}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: item.id })}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.snippet}>{item.snippet}</Text>
            <Text style={styles.meta}>{item.meta}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreatePost', { locationKey, category })}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 16, color: '#666', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  snippet: { color: '#555', marginTop: 4 },
  meta: { color: '#999', marginTop: 6 },
  sep: { height: 16 },
  fab: { position: 'absolute', right: 16, bottom: 24, backgroundColor: '#f4511e', width: 56, height: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 28, elevation: 4 },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 28 },
});

export default PostListScreen;
