import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Input from '../../components/Input';

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const results = query ? Array.from({ length: 5 }).map((_, i) => ({ id: `r_${i+1}`, text: `${query} 결과 ${i+1}` })) : [];
  return (
    <View style={styles.container}>
      <Input placeholder="키워드, 학교명, 과목, 작성자" value={query} onChangeText={setQuery} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.text}</Text>}
        ListEmptyComponent={<Text style={styles.empty}>검색어를 입력하세요</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  item: { paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#eee' },
  empty: { color: '#999' },
});

export default SearchScreen;
