export type UserRole = 'student' | 'mentor' | 'alumni' | 'expert';

export interface UserProfile {
  id: string;
  email?: string;
  phone?: string;
  displayName: string;
  graduationYear?: number;
  role: UserRole;
  createdAt: string;
}

export type Category =
  | '공부법'
  | '내신'
  | '수능'
  | '선택과목'
  | '멘탈관리'
  | '자유'
  | '진로'
  | '입시정보';

export interface BoardLocation {
  region?: string; // 지역명
  schoolId?: string; // 학교 식별자
  schoolName?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId?: string; // 익명 가능
  authorDisplay?: string; // 익명 닉네임 or 작성자명
  isAnonymous: boolean;
  category: Category;
  location?: BoardLocation;
  likeCount: number;
  dislikeCount: number;
  scrapCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Comment {
  id: string;
  postId: string;
  parentId?: string; // 대댓글
  authorId?: string;
  authorDisplay?: string; // 익명 닉네임
  content: string;
  likeCount: number;
  createdAt: string;
}

export interface MentorProfile {
  id: string;
  userId: string;
  university?: string;
  major?: string;
  tags?: string[];
  introduction?: string;
  verified?: boolean;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  authorId?: string;
  isAnonymous: boolean;
  category?: Category;
  attachments?: string[]; // url
  createdAt: string;
}

export interface Answer {
  id: string;
  questionId: string;
  mentorId: string;
  content: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  type: 'comment' | 'answer' | 'mention' | 'scrap' | 'system';
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  link?: { screen: string; params?: Record<string, any> };
}
