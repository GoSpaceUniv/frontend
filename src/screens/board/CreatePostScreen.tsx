import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { generateAnonymousNickname } from '../../utils/anonNickname';

const CreatePostScreen: React.FC<any> = ({ route, navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [persistAuthor, setPersistAuthor] = useState(false);

  const submit = () => {
    const anon = isAnonymous ? generateAnonymousNickname() : undefined;
    // TODO: 서버에 저장
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>게시글 작성</Text>
      <Input label="제목" value={title} onChangeText={setTitle} placeholder="제목을 입력하세요" />
      <Input label="내용" value={content} onChangeText={setContent} placeholder="내용을 입력하세요" multiline numberOfLines={6} />
      <View style={styles.row}>
        <Text style={styles.label}>익명</Text>
        <Switch value={isAnonymous} onValueChange={setIsAnonymous} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>익명 유지(작성자 고정)</Text>
        <Switch value={persistAuthor} onValueChange={setPersistAuthor} />
      </View>
      <Button title="등록" onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  label: { fontSize: 16 },
});

export default CreatePostScreen;
