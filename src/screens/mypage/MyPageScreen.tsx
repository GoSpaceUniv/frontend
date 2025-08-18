import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

const MyPageScreen: React.FC<any> = ({ navigation }) => {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이페이지</Text>
      <Text style={styles.name}>{user?.displayName}</Text>
      <View style={{ height: 16 }} />
      <TouchableOpacity onPress={() => navigation.navigate('MyPosts')}><Text style={styles.link}>내가 쓴 글</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyComments')}><Text style={styles.link}>내 댓글</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyScraps')}><Text style={styles.link}>스크랩</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MentorAnswers')}><Text style={styles.link}>멘토 답변 내역</Text></TouchableOpacity>
      <View style={{ height: 32 }} />
      <TouchableOpacity onPress={signOut}><Text style={[styles.link, { color: '#f44336' }]}>로그아웃</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  name: { marginTop: 8, fontSize: 16, color: '#555' },
  link: { marginTop: 12, color: '#f4511e', fontWeight: '600' },
});

export default MyPageScreen;
