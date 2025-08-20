import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

const SignInScreen: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const goSignUp = () => {
    navigate('/signup');
  };

  const onSubmit = async () => {
    console.log('onSubmit 함수 호출됨');
    setLoading(true);
    try {
      console.log('signIn 함수 호출 전');
      await signIn({ email, password });
      console.log('signIn 함수 호출 후');
      // 로그인 성공 시 AuthContext에서 자동으로 상태가 업데이트되어 페이지가 변경됩니다
    } catch (e) {
      console.error('로그인 실패:', e);
      Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인하세요');
    } finally {
      setLoading(false);
      console.log('onSubmit 함수 종료');
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
            placeholder="이메일"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
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
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f4f8', // Light gray background
  },
  bgTop: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#a7d9ff', // Lighter blue
    opacity: 0.6,
  },
  bgBottom: {
    position: 'absolute',
    bottom: -120,
    left: -70,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#ffb3b3', // Lighter red
    opacity: 0.6,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  logo: {
    width: 50, // Slightly larger logo
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db', // Blue logo
    marginBottom: 12,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  brand: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50', // Darker text for contrast
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 8,
    color: '#7f8c8d', // Muted gray
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 20,
  },

  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 20, // More rounded corners
    borderWidth: 1,
    borderColor: '#eef2f7',
    overflow: 'hidden',
    maxWidth: 450, // Slightly wider panel
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 }, // Deeper shadow
    shadowOpacity: 0.12,
    shadowRadius: 25,
    elevation: 8,
  },

  formArea: {
    padding: 24, // More padding inside the form
  },
  inputContainer: {
    marginBottom: 18, // Increased spacing between inputs
  },
  inputField: {
    backgroundColor: '#fcfcfc', // Slightly off-white for input fields
    borderColor: '#dcdfe6', // Softer border color
    borderWidth: 1,
    borderRadius: 12, // More rounded input fields
    paddingVertical: 14, // More vertical padding
    paddingHorizontal: 18, // More horizontal padding
  },

  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  toggleLabel: {
    color: '#34495e', // Darker label color
    fontSize: 15,
  },

  primaryBtn: {
    marginTop: 10,
    height: 52, // Taller button
    borderRadius: 14, // More rounded button
    backgroundColor: '#3498db', // A vibrant blue
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // More space above links
  },
  link: {
    color: '#3498db', // Blue links
    fontWeight: '600',
    fontSize: 14,
  },
  separator: {
    marginHorizontal: 12,
    color: '#bdc3c7', // Lighter separator
    fontSize: 14,
  },
});

export default SignInScreen;
