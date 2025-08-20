import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown'; // Import the new Dropdown component
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

  // Region code mapping for education offices
  const REGION_OPTIONS = [
    { code: 'B10', label: '서울특별시교육청' },
    { code: 'C10', label: '부산광역시교육청' },
    { code: 'D10', label: '대구광역시교육청' },
    { code: 'E10', label: '인천광역시교육청' },
    { code: 'F10', label: '광주광역시교육청' },
    { code: 'G10', label: '대전광역시교육청' },
    { code: 'H10', label: '울산광역시교육청' },
    { code: 'I10', label: '세종특별자치시교육청' },
    { code: 'J10', label: '경기도교육청' },
    { code: 'K10', label: '강원특별자치도교육청' },
    { code: 'M10', label: '충청북도교육청' },
    { code: 'N10', label: '충청남도교육청' },
    { code: 'P10', label: '전북특별자치도교육청' },
    { code: 'Q10', label: '전라남도교육청' },
    { code: 'R10', label: '경상북도교육청' },
    { code: 'S10', label: '경상남도교육청' },
    { code: 'T10', label: '제주특별자치도교육청' },
    { code: 'V10', label: '재외교육지원담당관실' },
  ];

  const [regionCode, setRegionCode] = useState<string>('B10');
  const [schoolItems, setSchoolItems] = useState<any[]>([]);
  const [isLoadingSchools, setIsLoadingSchools] = useState<boolean>(false);
  const [schoolError, setSchoolError] = useState<string | null>(null);
  // const [searchQuery, setSearchQuery] = useState<string>(''); // Remove this as search is now in Dropdown
  // const [currentPage, setCurrentPage] = useState<number>(1); // Remove this as pagination is no longer needed
  // const pageSize = 10; // Remove this

  const fetchSchools = async (code: string) => {
    setIsLoadingSchools(true);
    setSchoolError(null);
    try {
      const res = await apiFetch(`/api/v1/school?type=${encodeURIComponent(code)}`);
      console.log('API Response:', JSON.stringify(res, null, 2)); // Log the API response as string
      let items: any[] = [];
      if (res && Array.isArray(res.body)) { // Check res.body first
        items = res.body;
      } else if (Array.isArray(res)) {
        items = res;
      } else if (res && Array.isArray(res.data)) {
        items = res.data;
      } else if (res && Array.isArray(res.content)) {
        items = res.content;
      }
      const mappedItems = items.map((item: any) => ({
        label: item?.schoolName || item?.name || item?.school_name || (typeof item === 'string' ? item : ''),
        value: item?.schoolName || item?.name || item?.school_name || (typeof item === 'string' ? item : ''),
      }));
      console.log('Mapped School Items:', JSON.stringify(mappedItems, null, 2)); // Log the mapped items as string
      setSchoolItems(mappedItems);
    } catch (err: any) {
      console.error('Error fetching schools:', err); // Log the error
      let errorMessage = '학교 목록을 불러오지 못했습니다.';
      if (err && typeof err.message === 'string') {
        try {
          const parsedError = JSON.parse(err.message);
          if (parsedError) {
            errorMessage = parsedError.message || parsedError.code || '알 수 없는 오류가 발생했습니다.';
          }
        } catch (parseError) {
          // Not a JSON string, use original message
          errorMessage = err.message;
        }
      }
      setSchoolError(errorMessage);
      setSchoolItems([]);
    } finally {
      setIsLoadingSchools(false);
    }
  };

  useEffect(() => {
    if (regionCode) fetchSchools(regionCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionCode]);

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
    try {
      // 웹 환경이든 네이티브 환경이든 동일하게 JSON 형식으로 데이터를 전송합니다.
      // 학생증 이미지 업로드는 현재 요청된 정보에 포함되지 않으므로 제외합니다.
      await apiFetch('/api/users/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, nickname, graduationYear: parseInt(graduationYear, 10), schoolName }),
      });
      // 회원가입 성공 시 로그인 페이지로 리다이렉트
      navigation?.navigate?.('SignIn');
    } catch (error) {
      console.error('회원가입 실패:', error);
      // TODO: 사용자에게 오류 메시지를 표시하는 로직 추가 (예: alert)
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
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
          <View style={styles.schoolBlock}>
            <View style={{ zIndex: 2 }}> {/* 지역 선택 드롭다운이 학교 선택 드롭다운 위에 오도록 zIndex 추가 */}
              <Dropdown
                label="지역 선택"
                options={REGION_OPTIONS.map(opt => ({ label: opt.label, value: opt.code }))}
                selectedValue={regionCode}
                onSelect={(value) => {
                  setRegionCode(value);
                  setSchoolName(''); // Reset selected school when region changes
                }}
                placeholder="지역을 선택하세요"
                containerStyle={styles.inputContainer}
                dropdownStyle={styles.inputField}
              />
            </View>

            {isLoadingSchools ? (
              <Text style={styles.muted}>학교 목록 불러오는 중...</Text>
            ) : schoolError ? (
              <Text style={[styles.muted, { color: '#dc2626' }]}>{schoolError}</Text>
            ) : (
            <Dropdown
              label="학교 선택"
              options={schoolItems}
              selectedValue={schoolName}
              onSelect={setSchoolName}
              placeholder="학교를 선택하세요"
              containerStyle={styles.inputContainer}
              dropdownStyle={styles.inputField}
              searchable={true} // Enable search for school dropdown
              />
            )}
          </View>

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
  title: {
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
  uploadRow: {
    marginTop: 10,
    marginBottom: 16,
  },
  submitBtn: {
    marginTop: 20, // More space above the button
    height: 52, // Taller button
    borderRadius: 14, // More rounded button
    backgroundColor: '#3498db', // A vibrant blue
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  schoolBlock: {
    marginTop: 18, // Increased spacing for school block
    zIndex: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  muted: {
    color: '#95a5a6', // Muted gray for loading/error text
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default SignUpScreen;
