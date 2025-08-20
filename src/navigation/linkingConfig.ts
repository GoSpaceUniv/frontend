import { LinkingOptions } from '@react-navigation/native';
import { AuthStackParamList, RootTabParamList } from './types';

const config = {
  screens: {
    // AuthStackParamList의 스크린들
    SignIn: 'signin',
    SignUp: 'signup',
    GraduationYear: 'graduation-year',
    // RootTabParamList의 스크린들 (AppTabs 내의 스크린들)
    Home: 'home',
    Board: 'board',
    QA: 'qa',
    Search: 'search',
    Notifications: 'notifications',
    My: 'my',
  },
};

export const getLinkingConfig = (): LinkingOptions<RootTabParamList> => ({
  prefixes: ['http://localhost:5173', 'https://your-app-domain.com'], // 실제 앱 도메인으로 변경 필요
  config, // Root는 필요 없음. 최상위 스크린들을 직접 매핑
});
