import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { useAuth } from '../../hooks/useAuth';

type Nav = StackNavigationProp<AuthStackParamList, 'GraduationYear'>;
type Rt = RouteProp<AuthStackParamList, 'GraduationYear'>;

interface Props { navigation: Nav; route: Rt }

const GraduationYearScreen: React.FC<Props> = ({ navigation, route }) => {
  const { signUp, isHighSchooler } = useAuth();
  const { displayName, emailOrPhone, password } = route.params;
  const [year, setYear] = useState(String(new Date().getFullYear() + 2));
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const graduationYear = Number(year);
    if (Number.isNaN(graduationYear) || graduationYear < 2000) {
      Alert.alert('오류', '올바른 졸업 연도를 입력하세요');
      return;
    }
    setLoading(true);
    try {
      await signUp({ displayName, emailOrPhone, password, graduationYear });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>졸업 연도</Text>
      <Input
        label="졸업 연도"
        value={year}
        onChangeText={setYear}
        keyboardType="number-pad"
        placeholder={`${new Date().getFullYear()}`}
      />
      <Text style={styles.helper}>입력한 졸업 연도로 고등학생 여부를 판단합니다.</Text>
      <Button title={loading ? '처리 중...' : '회원가입 완료'} onPress={onSubmit} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  helper: { color: '#666', marginBottom: 12 },
});

export default GraduationYearScreen;
