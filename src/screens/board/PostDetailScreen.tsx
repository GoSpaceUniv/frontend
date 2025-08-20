import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigate, useParams } from 'react-router-dom';

// 게시글 더미 데이터
const POST_DATA = {
  '1': {
    id: '1',
    title: '내신 1학기 대비 완벽 가이드',
    content: `안녕하세요! 고등학교 1학년 학생들을 위한 내신 1학기 대비 가이드를 공유합니다.

📚 주요 과목별 공부법

1. 국어
- 문학 작품 미리 읽어보기
- 문법 개념 정리
- 독서록 작성 연습

2. 수학
- 기본 개념 완벽 이해
- 문제 유형별 연습
- 오답 노트 작성

3. 영어
- 단어장 꾸준히 암기
- 문법 규칙 정리
- 독해 연습

💡 내신 준비 팁
- 시험 2주 전부터 본격적인 복습 시작
- 과목별 우선순위 정하기
- 건강 관리도 중요!

도움이 되셨다면 좋아요 눌러주세요! 😊`,
    author: '내신마스터',
    views: 1234,
    likes: 89,
    comments: 23,
    time: '2시간 전',
    category: '내신'
  },
  '4': {
    id: '4',
    title: '수능 수학 1등급 받는 공부법',
    content: `수능 수학 1등급을 받기 위한 공부법을 공유합니다.

🎯 핵심 전략

1. 개념 완벽 이해
- 모든 공식의 유도 과정 이해
- 개념 간 연결점 파악
- 기본 문제 100% 정답률 목표

2. 문제 풀이 전략
- 문제 유형별 접근법 정리
- 시간 관리 연습
- 실수 줄이기 연습

3. 복습 방법
- 오답 노트 필수
- 유사 문제 반복 풀이
- 정기적인 모의고사 응시

🔥 1등급 받는 비법
- 매일 2시간 이상 수학 공부
- 개념 이해 후 문제 풀이
- 꾸준함이 최고의 비법!

질문 있으시면 댓글로 남겨주세요!`,
    author: '수학고수',
    views: 2345,
    likes: 156,
    comments: 34,
    time: '1시간 전',
    category: '수능'
  },
  '10': {
    id: '10',
    title: '고3 멘탈 관리하는 방법',
    content: `고3 여러분, 멘탈 관리가 정말 중요합니다!

🧠 멘탈 관리 방법

1. 스트레스 해소법
- 규칙적인 운동 (30분 이상)
- 충분한 수면 (7-8시간)
- 취미 활동으로 기분 전환

2. 동기부여 유지법
- 작은 목표부터 설정
- 성취감 느끼기
- 긍정적인 마인드 유지

3. 시험 불안 해소법
- 호흡법 연습
- 긍정적 자기 암시
- 충분한 준비로 자신감 확보

💪 꿀팁
- 매일 감사일기 쓰기
- 친구들과 대화하기
- 전문가 상담도 고려해보기

여러분 모두 화이팅! 💪`,
    author: '멘탈케어',
    views: 1456,
    likes: 112,
    comments: 25,
    time: '1시간 전',
    category: '멘탈관리'
  }
};

const COMMENTS = [
  {
    id: '1',
    content: '정말 도움이 되었어요! 감사합니다 😊',
    author: '고1학생',
    time: '1시간 전',
    likes: 5
  },
  {
    id: '2',
    content: '이 방법으로 공부해보겠습니다!',
    author: '수험생',
    time: '30분 전',
    likes: 3
  },
  {
    id: '3',
    content: '추가로 궁금한 점이 있는데요...',
    author: '궁금한학생',
    time: '15분 전',
    likes: 1
  }
];

const PostDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [isScrapped, setIsScrapped] = useState(false);
  
  const post = POST_DATA[id as keyof typeof POST_DATA];

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>게시글을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleScrap = () => {
    setIsScrapped(!isScrapped);
  };

  const renderComment = ({ item }: { item: any }) => (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentAuthor}>{item.author}</Text>
        <Text style={styles.commentTime}>{item.time}</Text>
      </View>
      <Text style={styles.commentContent}>{item.content}</Text>
      <View style={styles.commentActions}>
        <TouchableOpacity style={styles.commentAction}>
          <Text style={styles.commentActionText}>❤️ {item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentAction}>
          <Text style={styles.commentActionText}>답글</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate(-1)} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{post.category}</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 게시글 내용 */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <View style={styles.postMeta}>
              <Text style={styles.postAuthor}>{post.author}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
          </View>
          
          <Text style={styles.postContent}>{post.content}</Text>
          
          <View style={styles.postStats}>
            <Text style={styles.postStat}>👁️ {post.views}</Text>
            <Text style={styles.postStat}>❤️ {post.likes}</Text>
            <Text style={styles.postStat}>💬 {post.comments}</Text>
          </View>
        </View>

        {/* 액션 버튼 */}
        <View style={styles.actionBar}>
          <TouchableOpacity 
            style={[styles.actionButton, isLiked && styles.actionButtonActive]} 
            onPress={handleLike}
          >
            <Text style={[styles.actionButtonText, isLiked && styles.actionButtonTextActive]}>
              {isLiked ? '❤️' : '🤍'} 좋아요
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>💬 댓글</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, isScrapped && styles.actionButtonActive]} 
            onPress={handleScrap}
          >
            <Text style={[styles.actionButtonText, isScrapped && styles.actionButtonTextActive]}>
              {isScrapped ? '📌' : '📎'} 스크랩
            </Text>
          </TouchableOpacity>
        </View>

        {/* 댓글 섹션 */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>댓글 {post.comments}개</Text>
          <FlatList
            data={COMMENTS}
            keyExtractor={(item) => item.id}
            renderItem={renderComment}
            ItemSeparatorComponent={() => <View style={styles.commentSeparator} />}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#007BFF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonText: {
    fontSize: 20,
    color: '#6C757D',
  },
  content: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
    lineHeight: 28,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postAuthor: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '500',
  },
  postTime: {
    fontSize: 12,
    color: '#6C757D',
  },
  postContent: {
    fontSize: 16,
    color: '#212529',
    lineHeight: 24,
    marginBottom: 16,
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
  },
  postStat: {
    fontSize: 14,
    color: '#6C757D',
  },
  actionBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonActive: {
    backgroundColor: '#E3F2FD',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
  },
  actionButtonTextActive: {
    color: '#007BFF',
  },
  commentsSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  commentCard: {
    paddingVertical: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
  },
  commentTime: {
    fontSize: 12,
    color: '#6C757D',
  },
  commentContent: {
    fontSize: 14,
    color: '#212529',
    lineHeight: 20,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 16,
  },
  commentAction: {
    paddingVertical: 4,
  },
  commentActionText: {
    fontSize: 12,
    color: '#6C757D',
  },
  commentSeparator: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    marginTop: 100,
  },
});

export default PostDetailScreen;
