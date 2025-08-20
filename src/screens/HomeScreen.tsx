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

            {/* Hero Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/30x30' }}
                        style={styles.logo}
                    />
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Text style={styles.iconText}>🔍</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Text style={styles.iconText}>🔔</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('SignIn')}
                        >
                            <Text style={styles.iconText}>😊</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 검색바(눌림 피드백용 버튼) */}
                <TouchableOpacity activeOpacity={0.85} style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔎</Text>
                    <Text style={styles.searchPlaceholder}>무엇을 찾고 있나요?</Text>
                </TouchableOpacity>

                {/* 퀵 메뉴 */}
                <View style={styles.quickRow}>
                    <View style={styles.quickItem}>
                        <Text style={styles.quickEmoji}>📚</Text>
                        <Text style={styles.quickLabel}>내신</Text>
                    </View>
                    <View style={styles.quickItem}>
                        <Text style={styles.quickEmoji}>🧠</Text>
                        <Text style={styles.quickLabel}>수능</Text>
                    </View>
                    <View style={styles.quickItem}>
                        <Text style={styles.quickEmoji}>🎯</Text>
                        <Text style={styles.quickLabel}>입시</Text>
                    </View>
                    <View style={styles.quickItem}>
                        <Text style={styles.quickEmoji}>🗂️</Text>
                        <Text style={styles.quickLabel}>자료</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Favorite Boards Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>즐겨찾는 게시판</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeMore}>더 보기 ›</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 2열 카드 그리드 */}
                    <View style={styles.boardGrid}>
                        <TouchableOpacity style={styles.boardCard} activeOpacity={0.9}>
                            <View style={styles.boardCardHead}>
                                <Text style={styles.boardEmoji}>💬</Text>
                                <Text style={styles.boardName}>자유게시판</Text>
                                <Text style={styles.badge}>N</Text>
                            </View>
                            <Text style={styles.boardTitle} numberOfLines={2}>
                                기숙사 도어락 카드 저만 안찍히나요?
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.boardCard} activeOpacity={0.9}>
                            <View style={styles.boardCardHead}>
                                <Text style={styles.boardEmoji}>🙊</Text>
                                <Text style={styles.boardName}>비밀게시판</Text>
                                <Text style={styles.badge}>N</Text>
                            </View>
                            <Text style={styles.boardTitle} numberOfLines={2}>
                                지적이고 이쁘기까지한 사람
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.boardCard} activeOpacity={0.9}>
                            <View style={styles.boardCardHead}>
                                <Text style={styles.boardEmoji}>🌱</Text>
                                <Text style={styles.boardName}>새내기게시판</Text>
                            </View>
                            <Text style={styles.boardTitle} numberOfLines={2}>
                                급구))) 306동 긱사 홈메 한분 구…
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.boardCard} activeOpacity={0.9}>
                            <View style={styles.boardCardHead}>
                                <Text style={styles.boardEmoji}>📰</Text>
                                <Text style={styles.boardName}>시사·이슈</Text>
                                <Text style={styles.badge}>N</Text>
                            </View>
                            <Text style={styles.boardTitle} numberOfLines={2}>
                                현실
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.boardCard} activeOpacity={0.9}>
                            <View style={styles.boardCardHead}>
                                <Text style={styles.boardEmoji}>ℹ️</Text>
                                <Text style={styles.boardName}>정보게시판</Text>
                            </View>
                            <Text style={styles.boardTitle} numberOfLines={2}>
                                수학학원 알바 모집
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.boardCard} activeOpacity={0.9}>
                            <View style={styles.boardCardHead}>
                                <Text style={styles.boardEmoji}>📣</Text>
                                <Text style={styles.boardName}>홍보게시판</Text>
                                <Text style={styles.badge}>N</Text>
                            </View>
                            <Text style={styles.boardTitle} numberOfLines={2}>
                                🚗UNIMOTORS🛵 6.5기 신입 부…
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.boardCard} activeOpacity={0.9}>
                            <View style={styles.boardCardHead}>
                                <Text style={styles.boardEmoji}>👥</Text>
                                <Text style={styles.boardName}>동아리·학회</Text>
                            </View>
                            <Text style={styles.boardTitle} numberOfLines={2}>
                                Spartory X Phot:ON 협업사진전…
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Real-time Popular Posts Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>실시간 인기 글</Text>
                    </View>

                    <View style={styles.popularPostCard}>
                        <View style={styles.popularPostHeader}>
                            <Image
                                source={{ uri: 'https://via.placeholder.com/24x24' }}
                                style={styles.anonymousIcon}
                            />
                            <Text style={styles.anonymousText}>익명</Text>
                            <Text style={styles.postDate}>08/13 14:35</Text>
                        </View>
                        <Text style={styles.popularPostTitle}>님들아 좀 지나갑시다</Text>
                        <Text style={styles.popularPostContent}>비켜주세요...</Text>
                        <View style={styles.postFooter}>
                            <Text style={styles.boardChip}>자유게시판</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
                                <Text style={styles.likeCount}>👍 11</Text>
                                <Text style={styles.commentCount}>💬 1</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Floating Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={[styles.navIcon, styles.navIconActive]}>🏠</Text>
                    <Text style={[styles.navText, styles.navTextActive]}>홈</Text>
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

            {/* FAB */}
            <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
                <Text style={{ fontSize: 22, color: '#fff' }}>✍️</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    /* 배경 */
    fullContainer: { flex: 1, backgroundColor: '#F5F7FB' },
    statusBarPlaceholder: { height: 30, backgroundColor: '#246BFD' },

    /* Hero Header */
    header: {
        backgroundColor: '#246BFD',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 18,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    logo: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff' },
    headerIcons: { flexDirection: 'row' },
    iconButton: { marginLeft: 14, padding: 4 },
    iconText: { fontSize: 22, color: '#fff' },

    /* 검색바 */
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    searchIcon: { fontSize: 16, marginRight: 8 },
    searchPlaceholder: { color: '#8C99AE', fontSize: 14 },

    /* 퀵 메뉴 */
    quickRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    quickItem: {
        width: '23%',
        backgroundColor: '#2D74FF',
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: 'center',
    },
    quickEmoji: { fontSize: 18, color: '#fff', marginBottom: 4 },
    quickLabel: { fontSize: 12, color: '#EAF1FF', fontWeight: '700' },

    /* 본문 컨테이너 */
    container: { flex: 1, backgroundColor: 'transparent' },

    /* 섹션 */
    section: {
        backgroundColor: '#FFFFFF',
        marginTop: 14,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E6EAF2',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
        marginHorizontal: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1F36' },
    seeMore: { fontSize: 13, color: '#626F86' },

    /* 즐겨찾는 2열 카드 */
    boardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    boardCard: {
        width: '48%',
        backgroundColor: '#F7FAFF',
        borderRadius: 14,
        padding: 12,
        marginBottom: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E6EAF2',
    },
    boardCardHead: { flexDirection: 'row', alignItems: 'center' },
    boardEmoji: { fontSize: 16, marginRight: 6 },
    boardName: { fontSize: 13, fontWeight: '700', color: '#1A1F36', flex: 1 },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: '#FFECEF',
        color: '#D83A56',
        fontSize: 10,
        fontWeight: '800',
    },
    boardTitle: { marginTop: 8, fontSize: 13.5, color: '#4B5563' },

    /* 인기 글 카드 */
    popularPostCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 14,
        borderLeftWidth: 4,
        borderLeftColor: '#246BFD',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E6EAF2',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    },
    popularPostHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    anonymousIcon: { width: 26, height: 26, borderRadius: 13, marginRight: 8 },
    anonymousText: { fontWeight: '700', fontSize: 14, color: '#1A1F36' },
    postDate: { fontSize: 12, color: '#8A94A6', marginLeft: 'auto' },
    popularPostTitle: { fontSize: 16, fontWeight: '800', marginTop: 2, marginBottom: 6, color: '#1A1F36' },
    popularPostContent: { fontSize: 14, color: '#4B5563', marginBottom: 12 },

    postFooter: { flexDirection: 'row', alignItems: 'center' },
    boardChip: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
        backgroundColor: '#EAF1FF',
        color: '#246BFD',
        fontSize: 11,
        fontWeight: '700',
    },
    likeCount: { fontSize: 14, color: '#FF5A5F', marginLeft: 12 },
    commentCount: { fontSize: 14, color: '#246BFD', marginLeft: 12 },

    /* 플로팅 하단 탭 */
    bottomNav: {
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        paddingVertical: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E6EAF2',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    navItem: { alignItems: 'center', width: '20%' },
    navIcon: { fontSize: 20, marginBottom: 2, color: '#6B7280' },
    navText: { fontSize: 11, color: '#6B7280' },
    navIconActive: { color: '#246BFD', transform: [{ scale: 1.05 }] },
    navTextActive: { color: '#246BFD', fontWeight: '700' },

    /* FAB */
    fab: {
        position: 'absolute',
        right: 22,
        bottom: 84,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#246BFD',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
});




export default HomeScreen;
