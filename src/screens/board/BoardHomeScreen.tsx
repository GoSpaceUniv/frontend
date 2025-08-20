import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';

// 에브리타임 스타일의 게시판 카테고리
const BOARD_CATEGORIES = [
  {
    id: 'nonsin',
    title: '내신',
    description: '내신 공부법과 팁',
    icon: '📚',
    color: '#FF6B6B',
    bgColor: '#FFF5F5',
    gradient: ['#FF6B6B', '#FF8E8E']
  },
  {
    id: 'suneung',
    title: '수능',
    description: '수능 준비와 전략',
    icon: '🎯',
    color: '#4ECDC4',
    bgColor: '#F0FFFD',
    gradient: ['#4ECDC4', '#6EDDD6']
  },
  {
    id: 'academy',
    title: '인강 및 학원',
    description: '인강 추천과 학원 정보',
    icon: '🏫',
    color: '#45B7D1',
    bgColor: '#F0F8FF',
    gradient: ['#45B7D1', '#67C7E0']
  },
  {
    id: 'mental',
    title: '멘탈관리',
    description: '스트레스 관리와 동기부여',
    icon: '🧠',
    color: '#96CEB4',
    bgColor: '#F0FFF4',
    gradient: ['#96CEB4', '#B8DEC8']
  },
  {
    id: 'study',
    title: '공부법',
    description: '효과적인 학습 방법',
    icon: '✏️',
    color: '#FFEAA7',
    bgColor: '#FFFEF0',
    gradient: ['#FFEAA7', '#FFF2C7']
  },
  {
    id: 'subject',
    title: '선택과목',
    description: '과목별 학습 가이드',
    icon: '📖',
    color: '#DDA0DD',
    bgColor: '#FFF0FF',
    gradient: ['#DDA0DD', '#E8B8E8']
  }
];

// 인기 게시글 더미 데이터
const POPULAR_POSTS = [
  {
    id: '1',
    title: '수능 수학 1등급 받는 공부법 공유합니다',
    author: '수학고수',
    views: 1234,
    likes: 89,
    category: '수능',
    isHot: true
  },
  {
    id: '2',
    title: '내신 1학기 대비 완벽 가이드',
    author: '내신마스터',
    views: 987,
    likes: 67,
    category: '내신',
    isHot: false
  },
  {
    id: '3',
    title: '고3 멘탈 관리하는 방법',
    author: '멘탈케어',
    views: 756,
    likes: 45,
    category: '멘탈관리',
    isHot: true
  },
  {
    id: '4',
    title: '추천하는 수학 인강 순위',
    author: '인강리뷰어',
    views: 654,
    likes: 34,
    category: '인강 및 학원',
    isHot: false
  }
];

const BoardHomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleBoardClick = (categoryId: string) => {
    navigate(`/board/list?category=${categoryId}`);
  };

  const handleCreatePost = () => {
    navigate('/board/create');
  };

  const handlePostClick = (postId: string) => {
    navigate(`/board/detail/${postId}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>고시생단</Text>
          <Text style={styles.headerSubtitle}>고등학생을 위한 커뮤니티</Text>
        </View>
        <View style={styles.headerDecoration}>
          <View style={styles.decorationCircle1} />
          <View style={styles.decorationCircle2} />
        </View>
      </View>

      {/* 게시판 카테고리 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>게시판</Text>
          <Text style={styles.sectionSubtitle}>관심 있는 주제를 선택해보세요</Text>
        </View>
        <View style={styles.boardGrid}>
          {BOARD_CATEGORIES.map((board) => (
            <TouchableOpacity
              key={board.id}
              style={[styles.boardCard, { backgroundColor: board.bgColor }]}
              onPress={() => handleBoardClick(board.id)}
            >
              <View style={[styles.boardIconContainer, { backgroundColor: board.color }]}>
                <Text style={styles.boardIcon}>{board.icon}</Text>
              </View>
              <Text style={[styles.boardTitle, { color: board.color }]}>{board.title}</Text>
              <Text style={styles.boardDescription}>{board.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 인기 게시글 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>인기 게시글</Text>
            <Text style={styles.sectionSubtitle}>지금 가장 인기 있는 글</Text>
          </View>
          <TouchableOpacity style={styles.moreButton} onPress={() => navigate('/board/list')}>
            <Text style={styles.moreButtonText}>더보기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.popularPosts}>
          {POPULAR_POSTS.map((post, index) => (
            <TouchableOpacity
              key={post.id}
              style={[styles.postCard, post.isHot && styles.hotPostCard]}
              onPress={() => handlePostClick(post.id)}
            >
              <View style={styles.postHeader}>
                <View style={styles.postRank}>
                  <Text style={styles.rankText}>#{index + 1}</Text>
                </View>
                {post.isHot && (
                  <View style={styles.hotBadge}>
                    <Text style={styles.hotBadgeText}>🔥</Text>
                  </View>
                )}
              </View>
              <Text style={styles.postTitle} numberOfLines={2}>
                {post.title}
              </Text>
              <View style={styles.postFooter}>
                <View style={styles.postAuthorSection}>
                  <View style={styles.authorAvatar}>
                    <Text style={styles.authorInitial}>{post.author.charAt(0)}</Text>
                  </View>
                  <Text style={styles.postAuthor}>{post.author}</Text>
                </View>
                <View style={styles.postStats}>
                  <Text style={styles.postStat}>👁️ {post.views}</Text>
                  <Text style={styles.postStat}>❤️ {post.likes}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 빠른 메뉴 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>빠른 메뉴</Text>
          <Text style={styles.sectionSubtitle}>자주 사용하는 기능</Text>
        </View>
        <View style={styles.quickMenu}>
          <TouchableOpacity style={styles.quickMenuItem} onPress={() => navigate('/qa/ask')}>
            <View style={[styles.quickMenuIcon, { backgroundColor: '#FF6B6B' }]}>
              <Text style={styles.quickMenuIconText}>❓</Text>
            </View>
            <Text style={styles.quickMenuText}>질문하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickMenuItem} onPress={() => navigate('/qa/mentors')}>
            <View style={[styles.quickMenuIcon, { backgroundColor: '#4ECDC4' }]}>
              <Text style={styles.quickMenuIconText}>👨‍🏫</Text>
            </View>
            <Text style={styles.quickMenuText}>멘토 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickMenuItem} onPress={() => navigate('/search')}>
            <View style={[styles.quickMenuIcon, { backgroundColor: '#45B7D1' }]}>
              <Text style={styles.quickMenuIconText}>🔍</Text>
            </View>
            <Text style={styles.quickMenuText}>검색</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickMenuItem} onPress={() => navigate('/my')}>
            <View style={[styles.quickMenuIcon, { backgroundColor: '#96CEB4' }]}>
              <Text style={styles.quickMenuIconText}>👤</Text>
            </View>
            <Text style={styles.quickMenuText}>마이페이지</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 글쓰기 버튼 */}
      <TouchableOpacity style={styles.fab} onPress={handleCreatePost}>
        <Text style={styles.fabText}>✏️</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#007BFF',
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E3F2FD',
  },
  headerDecoration: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  decorationCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorationCircle2: {
    position: 'absolute',
    bottom: -30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6C757D',
  },
  moreButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  moreButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  boardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boardCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  boardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  boardIcon: {
    fontSize: 24,
  },
  boardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  boardDescription: {
    fontSize: 12,
    color: '#6C757D',
    lineHeight: 16,
    textAlign: 'center',
  },
  popularPosts: {
    gap: 12,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  hotPostCard: {
    backgroundColor: '#FFF8F0',
    borderWidth: 1,
    borderColor: '#FFE4B5',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postRank: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rankText: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '600',
  },
  hotBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  hotBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
    lineHeight: 22,
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
    backgroundColor: '#007BFF',
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
    gap: 8,
  },
  postStat: {
    fontSize: 12,
    color: '#6C757D',
  },
  quickMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickMenuItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickMenuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickMenuIconText: {
    fontSize: 20,
  },
  quickMenuText: {
    fontSize: 12,
    color: '#212529',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007BFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default BoardHomeScreen;
