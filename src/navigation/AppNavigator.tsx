import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';

import { useAuth } from '../hooks/useAuth';
import type { AuthStackParamList, BoardStackParamList, QAStackParamList, MyPageStackParamList, RootTabParamList } from './types';

// Auth Screens
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import GraduationYearScreen from '../screens/auth/GraduationYearScreen';

// Board Screens
import BoardHomeScreen from '../screens/board/BoardHomeScreen';
import PostListScreen from '../screens/board/PostListScreen';
import PostDetailScreen from '../screens/board/PostDetailScreen';
import CreatePostScreen from '../screens/board/CreatePostScreen';

// QA Screens
import QAScreen from '../screens/qa/QAScreen';
import QuestionDetailScreen from '../screens/qa/QuestionDetailScreen';
import AskQuestionScreen from '../screens/qa/AskQuestionScreen';
import MentorDirectoryScreen from '../screens/qa/MentorDirectoryScreen';

// Other Screens
import SearchScreen from '../screens/search/SearchScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import MyPageScreen from '../screens/mypage/MyPageScreen';
import MyPostsScreen from '../screens/mypage/MyPostsScreen';
import MyCommentsScreen from '../screens/mypage/MyCommentsScreen';
import MyScrapsScreen from '../screens/mypage/MyScrapsScreen';
import MentorAnswersScreen from '../screens/mypage/MentorAnswersScreen';

const AuthStack = createStackNavigator<AuthStackParamList>();
const BoardStack = createStackNavigator<BoardStackParamList>();
const QAStack = createStackNavigator<QAStackParamList>();
const MyStack = createStackNavigator<MyPageStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignInScreen} options={{ title: '로그인' }} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{ title: '회원가입' }} />
      <AuthStack.Screen name="GraduationYear" component={GraduationYearScreen} options={{ title: '졸업 연도' }} />
    </AuthStack.Navigator>
  );
}

function BoardNavigator() {
  return (
    <BoardStack.Navigator>
      <BoardStack.Screen name="BoardHome" component={BoardHomeScreen} options={{ title: '게시판' }} />
      <BoardStack.Screen name="PostList" component={PostListScreen} options={{ title: '게시글' }} />
      <BoardStack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: '상세' }} />
      <BoardStack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: '작성' }} />
    </BoardStack.Navigator>
  );
}

function QANavigator() {
  return (
    <QAStack.Navigator>
      <QAStack.Screen name="QAScreen" component={QAScreen} options={{ title: 'Q&A' }} />
      <QAStack.Screen name="QuestionDetail" component={QuestionDetailScreen} options={{ title: '질문 상세' }} />
      <QAStack.Screen name="AskQuestion" component={AskQuestionScreen} options={{ title: '질문하기' }} />
      <QAStack.Screen name="MentorDirectory" component={MentorDirectoryScreen} options={{ title: '멘토' }} />
    </QAStack.Navigator>
  );
}

function MyNavigator() {
  return (
    <MyStack.Navigator>
      <MyStack.Screen name="MyPage" component={MyPageScreen} options={{ title: '마이페이지' }} />
      <MyStack.Screen name="MyPosts" component={MyPostsScreen} options={{ title: '내 글' }} />
      <MyStack.Screen name="MyComments" component={MyCommentsScreen} options={{ title: '내 댓글' }} />
      <MyStack.Screen name="MyScraps" component={MyScrapsScreen} options={{ title: '스크랩' }} />
      <MyStack.Screen name="MentorAnswers" component={MentorAnswersScreen} options={{ title: '멘토 답변' }} />
    </MyStack.Navigator>
  );
}

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import createBottomTabNavigator

const Tab = createBottomTabNavigator<RootTabParamList>(); // Define Tab navigator

function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Board" component={BoardNavigator} options={{ title: '게시판' }} />
      <Tab.Screen name="QA" component={QANavigator} options={{ title: 'Q&A' }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: '검색' }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ title: '알림' }} />
      <Tab.Screen name="My" component={MyNavigator} options={{ title: '마이' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { token, isLoading } = useAuth();
  if (isLoading) return <Text style={{ padding: 16 }}>로딩 중...</Text>;
  return (
    <NavigationContainer>
      {token ? <AppTabs /> : <AuthNavigator />} {/* token이 있으면 AppTabs, 없으면 AuthNavigator */}
    </NavigationContainer>
  );
}
