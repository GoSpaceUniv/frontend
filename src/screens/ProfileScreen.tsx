import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type ProfileScreenNavigationProp = StackNavigationProp<any>;
type ProfileScreenRouteProp = RouteProp<any>;

interface Props {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
}

const ProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
    bio: 'React Native 개발자입니다.',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    Alert.alert('성공', '프로필이 저장되었습니다.');
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const updateTempProfile = (field: keyof UserProfile, value: string) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.name.charAt(0)}
            </Text>
          </View>
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>개인 정보</Text>
          
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>이름</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={tempProfile.name}
                onChangeText={(text) => updateTempProfile('name', text)}
                placeholder="이름을 입력하세요"
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.name}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>이메일</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={tempProfile.email}
                onChangeText={(text) => updateTempProfile('email', text)}
                placeholder="이메일을 입력하세요"
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.email}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>전화번호</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={tempProfile.phone}
                onChangeText={(text) => updateTempProfile('phone', text)}
                placeholder="전화번호를 입력하세요"
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.phone}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>자기소개</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={tempProfile.bio}
                onChangeText={(text) => updateTempProfile('bio', text)}
                placeholder="자기소개를 입력하세요"
                multiline
                numberOfLines={3}
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.bio}</Text>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>저장</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>편집</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#f4511e',
    padding: 30,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f4511e',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  field: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  input: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#9E9E9E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
