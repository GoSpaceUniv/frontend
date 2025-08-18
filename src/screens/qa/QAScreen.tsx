import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const QUESTIONS = Array.from({ length: 8 }).map((_, i) => ({
  id: `q_${i+1}`,
  title: `질문 제목 ${i+1}`,
  snippet: '질문 내용 미리보기...',
  answers: Math.floor(Math.random() * 5),
}));

const QAScreen: React.FC<any> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={QUESTIONS}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('QuestionDetail', { questionId: item.id })}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.snippet}>{item.snippet}</Text>
            <Text style={styles.meta}>답변 {item.answers}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AskQuestion')}>
        <Text style={styles.fabText}>?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  snippet: { color: '#555', marginTop: 4 },
  meta: { color: '#999', marginTop: 6 },
  fab: { position: 'absolute', right: 16, bottom: 24, backgroundColor: '#f4511e', width: 56, height: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 28, elevation: 4 },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 28 },
});

export default QAScreen;
