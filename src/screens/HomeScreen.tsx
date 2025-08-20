import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<any>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.fullContainer}>
      <View style={styles.statusBarPlaceholder} />
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/30x30' }} // Replace with actual logo
          style={styles.logo}
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            {/* Search Icon */}
            <Text style={styles.iconText}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            {/* Notification Icon */}
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('SignIn')}>
            {/* User Profile Icon */}
            <Text style={styles.iconText}>😊</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container}>
        {/* Favorite Boards Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>즐겨찾는 게시판</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>더 보기 {'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.boardList}>
            <View style={styles.boardItem}>
              <Text style={styles.boardName}>자유게시판</Text>
              <Text style={styles.boardPostTitle}>기숙사 도어락 카드 저만 안찍히나요?</Text>
              <Text style={styles.newIndicator}>N</Text>
            </View>
            <View style={styles.boardItem}>
              <Text style={styles.boardName}>비밀게시판</Text>
              <Text style={styles.boardPostTitle}>지적이고 이쁘기까지한 사람</Text>
              <Text style={styles.newIndicator}>N</Text>
            </View>
            <View style={styles.boardItem}>
              <Text style={styles.boardName}>새내기게시판</Text>
              <Text style={styles.boardPostTitle}>급구))) 306동 긱사 홈메 한분 구…</Text>
            </View>
            <View style={styles.boardItem}>
              <Text style={styles.boardName}>시사·이슈</Text>
              <Text style={styles.boardPostTitle}>현실</Text>
              <Text style={styles.newIndicator}>N</Text>
            </View>
            <View style={styles.boardItem}>
              <Text style={styles.boardName}>정보게시판</Text>
              <Text style={styles.boardPostTitle}>수학학원 알바 모집</Text>
            </View>
            <View style={styles.boardItem}>
              <Text style={styles.boardName}>홍보게시판</Text>
              <Text style={styles.boardPostTitle}>🚗UNIMOTORS🛵 6.5기 신입 부…</Text>
              <Text style={styles.newIndicator}>N</Text>
            </View>
            <View style={styles.boardItem}>
              <Text style={styles.boardName}>동아리·학회</Text>
              <Text style={styles.boardPostTitle}>Spartory X Phot:ON 협업사진전…</Text>
            </View>
          </View>
        </View>

        {/* Real-time Popular Posts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>실시간 인기 글</Text>
          <View style={styles.popularPostCard}>
            <View style={styles.popularPostHeader}>
              <Image
                source={{ uri: 'https://via.placeholder.com/24x24' }} // Replace with actual anonymous icon
                style={styles.anonymousIcon}
              />
              <Text style={styles.anonymousText}>익명</Text>
              <Text style={styles.postDate}>08/13 14:35</Text>
            </View>
            <Text style={styles.popularPostTitle}>
              님들아 좀 지나갑시다
            </Text>
            <Text style={styles.popularPostContent}>
              비켜주세요...
            </Text>
            <Text style={styles.popularPostBoard}>자유게시판</Text>
            <View style={styles.postActions}>
              <Text style={styles.likeCount}>👍 11</Text>
              <Text style={styles.commentCount}>💬 1</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🗓️</Text>
          <Text style={styles.navText}>시간표</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📝</Text>
          <Text style={styles.navText}>게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💬</Text>
          <Text style={styles.navText}>채팅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🎁</Text>
          <Text style={styles.navText}>혜택</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light gray background
  },
  statusBarPlaceholder: {
    height: 30, // Approximate height for status bar
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  iconText: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeMore: {
    fontSize: 14,
    color: '#999',
  },
  boardList: {
    // No specific styling needed for the container itself
  },
  boardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  boardName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555',
    width: 90, // Fixed width for board name
  },
  boardPostTitle: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
  },
  newIndicator: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    marginLeft: 5,
  },
  popularPostCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  popularPostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  anonymousIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  anonymousText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  postDate: {
    fontSize: 12,
    color: '#999',
    marginLeft: 'auto',
  },
  popularPostTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  popularPostContent: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  popularPostBoard: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 14,
    color: '#ff4d4d',
    marginRight: 15,
  },
  commentCount: {
    fontSize: 14,
    color: '#4d94ff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  navText: {
    fontSize: 12,
    color: '#555',
  },
});

export default HomeScreen;
