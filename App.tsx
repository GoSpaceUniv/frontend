import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './src/context/AuthContext';
import MobileViewport from './src/components/MobileViewport';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import GraduationYearScreen from './src/screens/auth/GraduationYearScreen';
import BoardHomeScreen from './src/screens/board/BoardHomeScreen';
import PostListScreen from './src/screens/board/PostListScreen';
import PostDetailScreen from './src/screens/board/PostDetailScreen';
import CreatePostScreen from './src/screens/board/CreatePostScreen';
import QAScreen from './src/screens/qa/QAScreen';
import QuestionDetailScreen from './src/screens/qa/QuestionDetailScreen';
import AskQuestionScreen from './src/screens/qa/AskQuestionScreen';
import MentorDirectoryScreen from './src/screens/qa/MentorDirectoryScreen';
import SearchScreen from './src/screens/search/SearchScreen';
import NotificationsScreen from './src/screens/notifications/NotificationsScreen';
import MyPageScreen from './src/screens/mypage/MyPageScreen';
import MyPostsScreen from './src/screens/mypage/MyPostsScreen';
import MyCommentsScreen from './src/screens/mypage/MyCommentsScreen';
import MyScrapsScreen from './src/screens/mypage/MyScrapsScreen';
import MentorAnswersScreen from './src/screens/mypage/MentorAnswersScreen';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MobileViewport>
          <Routes>
            <Route path="/" element={<SignInScreen />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/graduation" element={<GraduationYearScreen navigation={undefined as any} route={{} as any} />} />

            <Route path="/board" element={<BoardHomeScreen />} />
            <Route path="/board/list" element={<PostListScreen route={{ params: { locationKey: 'region:seoul' } } as any} navigation={undefined as any} />} />
            <Route path="/board/detail/:id" element={<PostDetailScreen route={{ params: { postId: 'p_1' } } as any} />} />
            <Route path="/board/create" element={<CreatePostScreen />} />

            <Route path="/qa" element={<QAScreen />} />
            <Route path="/qa/detail/:id" element={<QuestionDetailScreen route={{ params: { questionId: 'q_1' } } as any} />} />
            <Route path="/qa/ask" element={<AskQuestionScreen />} />
            <Route path="/qa/mentors" element={<MentorDirectoryScreen />} />

            <Route path="/search" element={<SearchScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />

            <Route path="/my" element={<MyPageScreen navigation={undefined as any} />} />
            <Route path="/my/posts" element={<MyPostsScreen />} />
            <Route path="/my/comments" element={<MyCommentsScreen />} />
            <Route path="/my/scraps" element={<MyScrapsScreen />} />
            <Route path="/my/answers" element={<MentorAnswersScreen />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MobileViewport>
      </BrowserRouter>
    </AuthProvider>
  );
}
