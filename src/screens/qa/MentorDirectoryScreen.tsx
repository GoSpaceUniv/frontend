import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const MENTORS = Array.from({ length: 6 }).map((_, i) => ({
  id: `m_${i+1}`,
  name: `멘토 ${i+1}`,
  tags: ['수학', '정시', '자기소개서'].slice(0, (i % 3) + 1),
}));

const MentorDirectoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={MENTORS}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.tags}>{item.tags.join(', ')}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  name: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  tags: { color: '#666', marginTop: 4 },
});

export default MentorDirectoryScreen;
