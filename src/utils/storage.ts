export class StorageManager {
  static async setItem(key: string, value: any): Promise<void> {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  }

  static async getItem<T>(key: string): Promise<T | null> {
    const jsonValue = localStorage.getItem(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
  }

  static async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  static async clear(): Promise<void> {
    localStorage.clear();
  }

  static async getAllKeys(): Promise<string[]> {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) keys.push(key);
    }
    return keys;
  }
}

// 사용자 프로필 저장
export const saveUserProfile = async (profile: any): Promise<void> => {
  await StorageManager.setItem('userProfile', profile);
};

// 사용자 프로필 불러오기
export const getUserProfile = async (): Promise<any | null> => {
  return await StorageManager.getItem('userProfile');
};

// 앱 설정 저장
export const saveAppSettings = async (settings: any): Promise<void> => {
  await StorageManager.setItem('appSettings', settings);
};

// 앱 설정 불러오기
export const getAppSettings = async (): Promise<any | null> => {
  return await StorageManager.getItem('appSettings');
};

// 앱 데이터 내보내기
export const exportAppData = async (): Promise<any> => {
  const profile = await getUserProfile();
  const settings = await getAppSettings();

  return {
    profile,
    settings,
    exportDate: new Date().toISOString(),
    version: '1.0.0',
  };
};

// 앱 데이터 가져오기
export const importAppData = async (data: any): Promise<void> => {
  if (data.profile) {
    await saveUserProfile(data.profile);
  }

  if (data.settings) {
    await saveAppSettings(data.settings);
  }
};
