import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type SettingsScreenNavigationProp = StackNavigationProp<any>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

interface Settings {
  notifications: boolean;
  darkMode: boolean;
  autoSave: boolean;
  locationServices: boolean;
  dataSync: boolean;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    darkMode: false,
    autoSave: true,
    locationServices: false,
    dataSync: true,
  });

  const toggleSetting = (key: keyof Settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetSettings = () => {
    Alert.alert(
      '설정 초기화',
      '모든 설정을 기본값으로 초기화하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '초기화',
          style: 'destructive',
          onPress: () => {
            setSettings({
              notifications: true,
              darkMode: false,
              autoSave: true,
              locationServices: false,
              dataSync: true,
            });
            Alert.alert('완료', '설정이 초기화되었습니다.');
          },
        },
      ]
    );
  };

  const handleExportSettings = () => {
    Alert.alert('내보내기', '설정을 JSON 파일로 내보냅니다.');
  };

  const handleImportSettings = () => {
    Alert.alert('가져오기', 'JSON 파일에서 설정을 가져옵니다.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>설정</Text>
        <Text style={styles.subtitle}>앱 설정을 관리하세요</Text>
      </View>

      <View style={styles.content}>
        {/* 알림 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>푸시 알림</Text>
              <Text style={styles.settingDescription}>
                중요한 업데이트와 메시지를 받습니다
              </Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={() => toggleSetting('notifications')}
              trackColor={{ false: '#767577', true: '#f4511e' }}
              thumbColor={settings.notifications ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* 외관 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>외관</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>다크 모드</Text>
              <Text style={styles.settingDescription}>
                어두운 테마를 사용합니다
              </Text>
            </View>
            <Switch
              value={settings.darkMode}
              onValueChange={() => toggleSetting('darkMode')}
              trackColor={{ false: '#767577', true: '#f4511e' }}
              thumbColor={settings.darkMode ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* 데이터 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>데이터</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>자동 저장</Text>
              <Text style={styles.settingDescription}>
                변경사항을 자동으로 저장합니다
              </Text>
            </View>
            <Switch
              value={settings.autoSave}
              onValueChange={() => toggleSetting('autoSave')}
              trackColor={{ false: '#767577', true: '#f4511e' }}
              thumbColor={settings.autoSave ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>데이터 동기화</Text>
              <Text style={styles.settingDescription}>
                클라우드와 데이터를 동기화합니다
              </Text>
            </View>
            <Switch
              value={settings.dataSync}
              onValueChange={() => toggleSetting('dataSync')}
              trackColor={{ false: '#767577', true: '#f4511e' }}
              thumbColor={settings.dataSync ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* 위치 서비스 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>위치</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>위치 서비스</Text>
              <Text style={styles.settingDescription}>
                위치 기반 기능을 사용합니다
              </Text>
            </View>
            <Switch
              value={settings.locationServices}
              onValueChange={() => toggleSetting('locationServices')}
              trackColor={{ false: '#767577', true: '#f4511e' }}
              thumbColor={settings.locationServices ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* 설정 관리 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>설정 관리</Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleExportSettings}>
            <Text style={styles.actionButtonText}>설정 내보내기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleImportSettings}>
            <Text style={styles.actionButtonText}>설정 가져오기</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.resetButton]} 
            onPress={handleResetSettings}
          >
            <Text style={styles.resetButtonText}>설정 초기화</Text>
          </TouchableOpacity>
        </View>

        {/* 앱 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 정보</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>버전</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>빌드 번호</Text>
            <Text style={styles.infoValue}>2024.01.01</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>라이선스</Text>
            <Text style={styles.infoValue}>MIT</Text>
          </View>
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
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  actionButton: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#f44336',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default SettingsScreen;
