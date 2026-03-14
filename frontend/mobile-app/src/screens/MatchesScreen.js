import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Alert, RefreshControl } from 'react-native';

const MatchesScreen = ({ navigation }) => {
  const [matches, setMatches] = useState([
    {
      id: 1,
      username: '小红',
      age: 26,
      gender: 'F',
      location: '淳安县威坪镇',
      interests: ['阅读', '旅行', '美食'],
      matchScore: 85,
      avatar: require('../assets/avatar1.jpg'),
      status: 'matched'
    },
    {
      id: 2,
      username: '小丽',
      age: 24,
      gender: 'F',
      location: '淳安县千岛湖镇',
      interests: ['摄影', '音乐', '运动'],
      matchScore: 78,
      avatar: require('../assets/avatar2.jpg'),
      status: 'pending'
    },
    {
      id: 3,
      username: '小芳',
      age: 27,
      gender: 'F',
      location: '淳安县汾口镇',
      interests: ['电影', '烹饪', '读书'],
      matchScore: 72,
      avatar: require('../assets/avatar3.jpg'),
      status: 'rejected'
    }
  ]);
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // 模拟刷新数据
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('刷新成功', '已获取最新匹配推荐');
    }, 1000);
  };

  const handleLike = (matchId) => {
    setMatches(matches.map(match => 
      match.id === matchId ? { ...match, status: 'matched' } : match
    ));
    Alert.alert('喜欢成功', '已发送喜欢请求！');
  };

  const handlePass = (matchId) => {
    setMatches(matches.map(match => 
      match.id === matchId ? { ...match, status: 'rejected' } : match
    ));
  };

  const renderMatchItem = ({ item }) => (
    <View style={styles.matchCard}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.username}, {item.age}</Text>
        <Text style={styles.userDetails}>{item.location}</Text>
        <Text style={styles.userDetails}>兴趣: {item.interests.join(', ')}</Text>
        <Text style={styles.matchScore}>匹配度: {item.matchScore}%</Text>
        {item.status === 'matched' && (
          <Text style={styles.matchedStatus}>已匹配</Text>
        )}
      </View>
      
      {item.status === 'pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.passButton]} 
            onPress={() => handlePass(item.id)}>
            <Text style={styles.passButtonText}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.likeButton]} 
            onPress={() => handleLike(item.id)}>
            <Text style={styles.likeButtonText}>❤️</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {item.status === 'matched' && (
        <TouchableOpacity 
          style={styles.chatButton} 
          onPress={() => navigation.navigate('Chat', { 
            userId: item.id, 
            userName: item.username,
            userAvatar: item.avatar
          })}>
          <Text style={styles.chatButtonText}>聊天</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>匹配</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>筛选</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={matches}
        renderItem={renderMatchItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>暂无匹配用户</Text>
            <Text style={styles.emptySubtext}>稍后刷新或调整筛选条件</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
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
  matchedStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  passButton: {
    backgroundColor: '#ff4757',
  },
  likeButton: {
    backgroundColor: '#007AFF',
  },
  passButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  likeButtonText: {
    fontSize: 20,
  },
  chatButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default MatchesScreen;