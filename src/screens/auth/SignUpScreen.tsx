import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { apiFetch } from '../../api/client';

type NavigationLike = { navigate?: (screen: string, params?: any) => void };
interface Props { navigation?: NavigationLike }

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [uploadName, setUploadName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const pickFileWeb = () => {
    if (Platform.OS !== 'web') return;
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadName(file.name);
  };

  const submit = async () => {
    if (Platform.OS === 'web') {
      const form = new FormData();
      form.append('email', email);
      form.append('password', password);
      form.append('nickname', nickname);
      form.append('graduationYear', graduationYear);
      form.append('role', 'USER');
      form.append('schoolName', schoolName);
      const file = fileInputRef.current?.files?.[0];
      if (file) form.append('studentCard', file);

      await apiFetch('/auth/signup', { method: 'POST', body: form });
    } else {
      // Native 환경의 경우, 별도 파일 피커 라이브러리 연동 필요
      await apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, nickname, graduationYear, role: 'USER', schoolName }),
      });
    }
    navigation?.navigate?.('SignIn');
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />
      <View style={styles.header}>
        <Text style={styles.title}>회원가입</Text>
        <Text style={styles.subtitle}>아래 정보를 입력해 주세요</Text>
      </View>

      <View style={styles.panel}>
        <View style={styles.formArea}>
          <Input label="이메일" value={email} onChangeText={setEmail} placeholder="example@domain.com" autoCapitalize="none" keyboardType="email-address" containerStyle={styles.inputContainer} inputStyle={styles.inputField} />
          <Input label="비밀번호" value={password} onChangeText={setPassword} placeholder="비밀번호" secureTextEntry containerStyle={styles.inputContainer} inputStyle={styles.inputField} />
          <Input label="닉네임" value={nickname} onChangeText={setNickname} placeholder="최대 10자" maxLength={10} containerStyle={styles.inputContainer} inputStyle={styles.inputField} />
          <Input label="졸업 연도" value={graduationYear} onChangeText={setGraduationYear} placeholder="예: 2025" keyboardType="numeric" containerStyle={styles.inputContainer} inputStyle={styles.inputField} />
          {/* 역할은 기본값 USER로 서버에 전송됩니다 */}
          <Input label="학교명" value={schoolName} onChangeText={setSchoolName} placeholder="학교 이름" containerStyle={styles.inputContainer} inputStyle={styles.inputField} />

          {Platform.OS === 'web' && (
            <View style={styles.uploadRow}>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFileSelected} />
              <Button title={uploadName ? `선택됨: ${uploadName}` : '학생증 이미지 업로드'} onPress={pickFileWeb} variant="outline" />
            </View>
          )}

          <Button title="회원가입" onPress={submit} style={styles.submitBtn} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f7fb' },
  bgTop: { position: 'absolute', top: -120, right: -60, width: 260, height: 260, borderRadius: 130, backgroundColor: '#e0e7ff' },
  bgBottom: { position: 'absolute', bottom: -140, left: -80, width: 300, height: 300, borderRadius: 150, backgroundColor: '#fee2e2' },
  header: { alignItems: 'center', marginTop: 36, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#1f2937' },
  subtitle: { marginTop: 6, color: '#6b7280', fontSize: 14 },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eef2f7',
    overflow: 'hidden',
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  formArea: { padding: 16 },
  inputContainer: { marginBottom: 14 },
  inputField: { backgroundColor: '#fff', borderColor: '#e5e7eb', borderWidth: 1, borderRadius: 10 },
  uploadRow: { marginTop: 4, marginBottom: 10 },
  submitBtn: { marginTop: 8, height: 48, borderRadius: 12, backgroundColor: '#10b981' },
});

export default SignUpScreen;
