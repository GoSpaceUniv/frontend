import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyScrapsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>스크랩</Text>
      <Text style={styles.empty}>스크랩한 게시물이 없습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontWeight: 'bold', fontSize: 16 },
  empty: { marginTop: 12, color: '#999' },
});

export default MyScrapsScreen;
