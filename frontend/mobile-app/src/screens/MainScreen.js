import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Alert } from 'react-native';

const MainScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    username: '小明',
    location: { county_code: '330127' }
  });
  
  const [matches, setMatches] = useState([
    {
      id: 1,
      username: '小红',
      age: 26,
      gender: 'F',
      location: '淳安县威坪镇',
      interests: ['阅读', '旅行', '美食'],
      matchScore: 85,
      avatar: require('../assets/avatar1.jpg')
    },
    {
      id: 2,
      username: '小丽',
      age: 24,
      gender: 'F',
      location: '淳安县千岛湖镇',
      interests: ['摄影', '音乐', '运动'],
      matchScore: 78,
      avatar: require('../assets/avatar2.jpg')
    },
    {
      id: 3,
      username: '小芳',
      age: 27,
      gender: 'F',
      location: '淳安县汾口镇',
      interests: ['电影', '烹饪', '读书'],
      matchScore: 72,
      avatar: require('../assets/avatar3.jpg')
    }
  ]);

  const handleLogout = () => {
    Alert.alert('确认退出', '确定要退出登录吗？', [
      { text: '取消', style: 'cancel' },
      { text: '确定', onPress: () => navigation.replace('Login') }
    ]);
  };

  const renderMatchItem = ({ item }) => (
    <View style={styles.matchCard}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.username}, {item.age}</Text>
        <Text style={styles.userDetails}>{item.location}</Text>
        <Text style={styles.userDetails}>兴趣: {item.interests.join(', ')}</Text>
        <Text style={styles.matchScore}>匹配度: {item.matchScore}%</Text>
      </View>
      <TouchableOpacity style={styles.chatButton} onPress={() => 
        navigation.navigate('Chat', { 
          userId: item.id, 
          userName: item.username,
          userAvatar: item.avatar
        })
      }>
        <Text style={styles.chatButtonText}>聊天</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>你好, {user?.username}</Text>
          <Text style={styles.location}>
            {user?.location?.county_code ? '当前位置: 淳安县' : '请完善位置信息'}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>退出</Text>
        </TouchableOpacity>
      </View>

      {/* 推荐匹配 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>为您推荐</Text>
        <FlatList
          data={matches.slice(0, 10)} // 只显示前10个
          renderItem={renderMatchItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* 底部导航 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Main')}>
          <Text style={styles.navButtonText}>首页</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Matches')}>
          <Text style={styles.navButtonText}>匹配</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('ChatList')}>
          <Text style={styles.navButtonText}>聊天</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navButtonText}>我的</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#ff4757',
    borderRadius: 4,
  },
  logoutText: {
    color: 'white',
    fontSize: 12,
  },
  section: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  matchScore: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 2,
    fontWeight: 'bold',
  },
  chatButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navButtonText: {
    fontSize: 14,
    color: '#666',
  },
});

export default MainScreen;