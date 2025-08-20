import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigate, useSearchParams } from 'react-router-dom';

// 카테고리별 게시글 더미 데이터
const CATEGORY_POSTS = {
  nonsin: [
    { id: '1', title: '내신 1학기 대비 완벽 가이드', author: '내신마스터', views: 1234, likes: 89, comments: 23, time: '2시간 전', category: '내신', isHot: true },
    { id: '2', title: '국어 내신 공부법 공유합니다', author: '국어고수', views: 987, likes: 67, comments: 15, time: '4시간 전', category: '내신', isHot: false },
    { id: '3', title: '수학 내신 문제 풀이 팁', author: '수학전문가', views: 756, likes: 45, comments: 12, time: '6시간 전', category: '내신', isHot: false },
    { id: '4', title: '영어 내신 단어 암기법', author: '영어마스터', views: 654, likes: 34, comments: 8, time: '8시간 전', category: '내신', isHot: false },
    { id: '5', title: '과학 내신 실험 정리법', author: '과학전문가', views: 543, likes: 28, comments: 6, time: '10시간 전', category: '내신', isHot: false },
  ],
  suneung: [
    { id: '6', title: '수능 수학 1등급 받는 공부법', author: '수학고수', views: 2345, likes: 156, comments: 34, time: '1시간 전', category: '수능', isHot: true },
    { id: '7', title: '수능 영어 독해 전략', author: '영어전문가', views: 1890, likes: 123, comments: 28, time: '3시간 전', category: '수능', isHot: true },
    { id: '8', title: '수능 국어 비문학 공부법', author: '국어고수', views: 1456, likes: 98, comments: 22, time: '5시간 전', category: '수능', isHot: false },
    { id: '9', title: '수능 물리 선택과목 가이드', author: '물리전문가', views: 1234, likes: 87, comments: 19, time: '7시간 전', category: '수능', isHot: false },
    { id: '10', title: '수능 화학 선택과목 팁', author: '화학전문가', views: 1098, likes: 76, comments: 18, time: '9시간 전', category: '수능', isHot: false },
  ],
  academy: [
    { id: '11', title: '추천하는 수학 인강 순위', author: '인강리뷰어', views: 1678, likes: 134, comments: 31, time: '1시간 전', category: '인강 및 학원', isHot: true },
    { id: '12', title: '서울 강남 학원 추천', author: '학원탐방가', views: 1234, likes: 89, comments: 19, time: '2시간 전', category: '인강 및 학원', isHot: false },
    { id: '13', title: '온라인 강의 vs 오프라인 학원', author: '비교분석가', views: 987, likes: 67, comments: 16, time: '4시간 전', category: '인강 및 학원', isHot: false },
    { id: '14', title: '영어 인강 추천 TOP 5', author: '영어전문가', views: 876, likes: 54, comments: 12, time: '6시간 전', category: '인강 및 학원', isHot: false },
    { id: '15', title: '수학 학원 선택 가이드', author: '수학전문가', views: 765, likes: 43, comments: 10, time: '8시간 전', category: '인강 및 학원', isHot: false },
  ],
  mental: [
    { id: '16', title: '고3 멘탈 관리하는 방법', author: '멘탈케어', views: 1456, likes: 112, comments: 25, time: '1시간 전', category: '멘탈관리', isHot: true },
    { id: '17', title: '시험 스트레스 해소법', author: '심리상담사', views: 1234, likes: 89, comments: 18, time: '3시간 전', category: '멘탈관리', isHot: false },
    { id: '18', title: '동기부여 유지하는 팁', author: '동기부여전문가', views: 876, likes: 56, comments: 12, time: '5시간 전', category: '멘탈관리', isHot: false },
    { id: '19', title: '수면 관리로 성적 향상하기', author: '수면전문가', views: 654, likes: 34, comments: 8, time: '7시간 전', category: '멘탈관리', isHot: false },
    { id: '20', title: '시험 불안 극복법', author: '심리치료사', views: 543, likes: 28, comments: 6, time: '9시간 전', category: '멘탈관리', isHot: false },
  ],
  study: [
    { id: '21', title: '효과적인 복습 방법', author: '학습전문가', views: 1345, likes: 98, comments: 21, time: '2시간 전', category: '공부법', isHot: true },
    { id: '22', title: '기억력 향상시키는 방법', author: '뇌과학자', views: 1123, likes: 78, comments: 17, time: '4시간 전', category: '공부법', isHot: false },
    { id: '23', title: '집중력 높이는 팁', author: '집중력전문가', views: 987, likes: 67, comments: 14, time: '6시간 전', category: '공부법', isHot: false },
    { id: '24', title: '시간 관리 공부법', author: '시간관리전문가', views: 876, likes: 54, comments: 12, time: '8시간 전', category: '공부법', isHot: false },
    { id: '25', title: '노트 정리하는 방법', author: '학습전문가', views: 765, likes: 43, comments: 10, time: '10시간 전', category: '공부법', isHot: false },
  ],
  subject: [
    { id: '26', title: '물리 선택과목 공부법', author: '물리전문가', views: 1234, likes: 89, comments: 20, time: '1시간 전', category: '선택과목', isHot: true },
    { id: '27', title: '화학 선택과목 가이드', author: '화학전문가', views: 1098, likes: 76, comments: 18, time: '3시간 전', category: '선택과목', isHot: false },
    { id: '28', title: '생명과학 선택과목 팁', author: '생명과학전문가', views: 876, likes: 54, comments: 12, time: '5시간 전', category: '선택과목', isHot: false },
    { id: '29', title: '지구과학 선택과목 공부법', author: '지구과학전문가', views: 654, likes: 34, comments: 8, time: '7시간 전', category: '선택과목', isHot: false },
    { id: '30', title: '사회탐구 선택과목 가이드', author: '사회전문가', views: 543, likes: 28, comments: 6, time: '9시간 전', category: '선택과목', isHot: false },
  ],
};

const CATEGORY_NAMES = {
  nonsin: '내신',
  suneung: '수능',
  academy: '인강 및 학원',
  mental: '멘탈관리',
  study: '공부법',
  subject: '선택과목',
};

const CATEGORY_COLORS = {
  nonsin: { primary: '#FF6B6B', secondary: '#FFF5F5' },
  suneung: { primary: '#4ECDC4', secondary: '#F0FFFD' },
  academy: { primary: '#45B7D1', secondary: '#F0F8FF' },
  mental: { primary: '#96CEB4', secondary: '#F0FFF4' },
  study: { primary: '#FFEAA7', secondary: '#FFFEF0' },
  subject: { primary: '#DDA0DD', secondary: '#FFF0FF' },
};

const PostListScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'nonsin';
  const [posts, setPosts] = useState(CATEGORY_POSTS[category as keyof typeof CATEGORY_POSTS] || []);

  useEffect(() => {
    setPosts(CATEGORY_POSTS[category as keyof typeof CATEGORY_POSTS] || []);
  }, [category]);

  const handlePostClick = (postId: string) => {
    navigate(`/board/detail/${postId}`);
  };

  const handleCreatePost = () => {
    navigate(`/board/create?category=${category}`);
  };

  const renderPost = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity 
      style={[
        styles.postCard, 
        item.isHot && styles.hotPostCard,
        { borderLeftColor: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]?.primary }
      ]} 
      onPress={() => handlePostClick(item.id)}
    >
      <View style={styles.postHeader}>
        <View style={styles.postTitleRow}>
          <Text style={styles.postTitle} numberOfLines={2}>
            {item.title}
          </Text>
          {item.isHot && (
            <View style={styles.hotBadge}>
              <Text style={styles.hotBadgeText}>🔥</Text>
            </View>
          )}
        </View>
        <View style={styles.postRank}>
          <Text style={styles.rankText}>#{index + 1}</Text>
        </View>
      </View>
      
      <View style={styles.postFooter}>
        <View style={styles.postAuthorSection}>
          <View style={[styles.authorAvatar, { backgroundColor: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]?.primary }]}>
            <Text style={styles.authorInitial}>{item.author.charAt(0)}</Text>
          </View>
          <Text style={styles.postAuthor}>{item.author}</Text>
        </View>
        <View style={styles.postStats}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>👁️</Text>
            <Text style={styles.statText}>{item.views.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>❤️</Text>
            <Text style={styles.statText}>{item.likes}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>💬</Text>
            <Text style={styles.statText}>{item.comments}</Text>
          </View>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const currentCategoryColor = CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS];

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={[styles.header, { backgroundColor: currentCategoryColor?.primary }]}>
        <TouchableOpacity onPress={() => navigate('/')} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{CATEGORY_NAMES[category as keyof typeof CATEGORY_NAMES]}</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* 카테고리 탭 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryTabs}>
        {Object.entries(CATEGORY_NAMES).map(([key, name]) => {
          const isActive = category === key;
          const color = CATEGORY_COLORS[key as keyof typeof CATEGORY_COLORS];
          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.categoryTab, 
                isActive && { 
                  backgroundColor: color?.primary,
                  borderColor: color?.primary
                }
              ]}
              onPress={() => navigate(`/board/list?category=${key}`)}
            >
              <Text style={[
                styles.categoryTabText, 
                isActive && styles.categoryTabTextActive
              ]}>
                {name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 게시글 목록 */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* 글쓰기 버튼 */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: currentCategoryColor?.primary }]} 
        onPress={handleCreatePost}
      >
        <Text style={styles.fabText}>✏️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  searchButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  categoryTabs: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
  },
  hotPostCard: {
    backgroundColor: '#FFF8F0',
    borderWidth: 1,
    borderColor: '#FFE4B5',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    lineHeight: 22,
    flex: 1,
  },
  hotBadge: {
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
  },
  hotBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  postRank: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  rankText: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '600',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postAuthorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  authorInitial: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  postAuthor: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 12,
  },
  statText: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  postTime: {
    fontSize: 12,
    color: '#6C757D',
  },
  separator: {
    height: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default PostListScreen;
