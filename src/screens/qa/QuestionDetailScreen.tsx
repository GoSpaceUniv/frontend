import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuestionDetailScreen: React.FC<any> = ({ route }) => {
  const { questionId } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>질문 {questionId}</Text>
      <Text style={styles.content}>질문 상세 내용...</Text>
      <Text style={styles.section}>답변</Text>
      <Text>- 멘토 A: 정성스러운 답변...</Text>
      <Text>- 졸업생 B: 실전 팁...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { marginTop: 12, color: '#333' },
  section: { marginVertical: 12, fontWeight: 'bold' },
});

export default QuestionDetailScreen;
