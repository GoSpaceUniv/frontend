export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  GraduationYear: { displayName: string; emailOrPhone: string; password: string };
};

export type BoardStackParamList = {
  BoardHome: undefined;
  PostList: { locationKey: string; category?: string };
  PostDetail: { postId: string };
  CreatePost: { locationKey?: string; category?: string } | undefined;
};

export type QAStackParamList = {
  QAScreen: undefined;
  QuestionDetail: { questionId: string };
  AskQuestion: { isAnonymousDefault?: boolean } | undefined;
  MentorDirectory: undefined;
};

export type MyPageStackParamList = {
  MyPage: undefined;
  MyPosts: undefined;
  MyComments: undefined;
  MyScraps: undefined;
  MentorAnswers: undefined;
};

export type RootTabParamList = {
  Board: undefined;
  QA: undefined;
  Search: undefined;
  Notifications: undefined;
  My: undefined;
};
