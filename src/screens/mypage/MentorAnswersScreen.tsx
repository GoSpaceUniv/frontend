import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MentorAnswersScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>멘토 답변 내역</Text>
      <Text style={styles.empty}>작성한 답변이 없습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontWeight: 'bold', fontSize: 16 },
  empty: { marginTop: 12, color: '#999' },
});

export default MentorAnswersScreen;
