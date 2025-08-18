import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Card from '../../components/Card';

const DUMMY_LOCATIONS = [
  { key: 'region:seoul', label: '서울 지역 게시판' },
  { key: 'region:busan', label: '부산 지역 게시판' },
  { key: 'school:hs-123', label: '민정고등학교 게시판' },
];

const CATEGORIES = ['공부법', '내신', '수능', '선택과목', '멘탈관리'];

const BoardHomeScreen: React.FC<any> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>게시판</Text>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>지역/학교 선택</Text>
        {DUMMY_LOCATIONS.map((loc) => (
          <TouchableOpacity key={loc.key} style={styles.item} onPress={() => navigation.navigate('PostList', { locationKey: loc.key })}>
            <Text style={styles.itemText}>{loc.label}</Text>
          </TouchableOpacity>
        ))}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>카테고리</Text>
        <View style={styles.chips}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity key={c} style={styles.chip} onPress={() => navigation.navigate('PostList', { locationKey: 'region:seoul', category: c })}>
              <Text style={styles.chipText}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreatePost')}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f5f5f5', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  item: { paddingVertical: 12 },
  itemText: { fontSize: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { backgroundColor: '#fff2ec', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, marginRight: 8, marginBottom: 8 },
  chipText: { color: '#f4511e', fontWeight: '600' },
  fab: { position: 'absolute', right: 16, bottom: 24, backgroundColor: '#f4511e', width: 56, height: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 28, elevation: 4 },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 28 },
});

export default BoardHomeScreen;
