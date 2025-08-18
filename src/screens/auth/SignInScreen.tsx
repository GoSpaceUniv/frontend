import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

type NavigationLike = { navigate?: (screen: string) => void; goBack?: () => void };

interface Props {
  navigation?: NavigationLike;
}

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const { signIn } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const goSignUp = () => {
    if (navigation?.navigate) {
      navigation.navigate('SignUp');
    } else if (typeof window !== 'undefined') {
      window.location.href = '/signup';
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await signIn({ emailOrPhone: userId, password });
    } catch (e) {
      Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인하세요');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />
      <View style={styles.header}>
        <View style={styles.logo} />
        <Text style={styles.brand}>고시생단</Text>
        <Text style={styles.subtitle}>계정으로 로그인</Text>
      </View>

      <View style={styles.panel}>
        <View style={styles.formArea}>
          <Input
            placeholder="아이디"
            value={userId}
            onChangeText={setUserId}
            autoCapitalize="none"
            keyboardType="default"
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputField}
          />
          <Input
            placeholder="비밀번호"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputField}
          />

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>자동 로그인</Text>
            <Switch
              value={autoLogin}
              onValueChange={setAutoLogin}
              trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
              thumbColor={autoLogin ? '#3b82f6' : '#f8fafc'}
            />
          </View>

          <Button
            title={loading ? '로그인 중...' : '학생 로그인'}
            onPress={onSubmit}
            disabled={loading}
            style={styles.primaryBtn}
            size="large"
          />

          <View style={styles.linkRow}>
            <TouchableOpacity onPress={goSignUp}>
              <Text style={styles.link}>회원가입</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity onPress={() => Alert.alert('아이디 찾기', '준비 중입니다.')}>
              <Text style={styles.link}>아이디 찾기</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity onPress={() => Alert.alert('비밀번호 찾기', '준비 중입니다.')}>
              <Text style={styles.link}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
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
  logo: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#6366f1', marginBottom: 10 },
  brand: { fontSize: 24, fontWeight: '800', color: '#1f2937' },
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
  inputField: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 10,
  },

  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, marginBottom: 14 },
  toggleLabel: { color: '#374151' },

  primaryBtn: { marginTop: 8, height: 52, borderRadius: 12, backgroundColor: '#3b82f6' },
  linkRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 14 },
  link: { color: '#64748b', fontWeight: '600' },
  separator: { marginHorizontal: 12, color: '#cbd5e1' },
});

export default SignInScreen;
