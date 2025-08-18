import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

const AskQuestionScreen: React.FC<any> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const submit = () => {
    // TODO: 서버에 저장 및 파일 업로드(PDF, 이미지)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>질문하기</Text>
      <Input label="제목" value={title} onChangeText={setTitle} placeholder="제목을 입력하세요" />
      <Input label="내용" value={content} onChangeText={setContent} placeholder="질문 내용을 입력하세요" multiline numberOfLines={6} />
      <View style={styles.row}>
        <Text style={styles.label}>익명</Text>
        <Switch value={isAnonymous} onValueChange={setIsAnonymous} />
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

export default AskQuestionScreen;
