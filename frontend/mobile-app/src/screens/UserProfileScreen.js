import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    username: '小明',
    age: 28,
    gender: '男',
    location: '浙江省杭州市淳安县威坪镇',
    occupation: 'IT工程师',
    education: '本科',
    income: '中等收入',
    interests: ['编程', '旅行', '电影'],
    bio: '喜欢探索新技术，热爱户外运动'
  });

  const handleEditProfile = () => {
    // 这里可以导航到编辑个人资料页面
    alert('编辑个人资料功能待开发');
  };

  const handleLogout = () => {
    // 这里应该调用登出API
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={require('../assets/profile-avatar.jpg')} 
          style={styles.profileAvatar}
        />
        <Text style={styles.profileName}>{user.username}</Text>
        <Text style={styles.profileLocation}>{user.location}</Text>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>年龄:</Text>
          <Text style={styles.infoValue}>{user.age}岁</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>性别:</Text>
          <Text style={styles.infoValue}>{user.gender}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>职业:</Text>
          <Text style={styles.infoValue}>{user.occupation}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>学历:</Text>
          <Text style={styles.infoValue}>{user.education}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>收入:</Text>
          <Text style={styles.infoValue}>{user.income}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>兴趣爱好:</Text>
          <Text style={styles.infoValue}>{user.interests.join(', ')}</Text>
        </View>
        
        <View style={styles.bioContainer}>
          <Text style={styles.infoLabel}>个人简介:</Text>
          <Text style={styles.bioText}>{user.bio}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>编辑个人资料</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>退出登录</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileLocation: {
    fontSize: 16,
    color: '#666',
  },
  profileInfo: {
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: 80,
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  bioContainer: {
    marginTop: 10,
  },
  bioText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  buttonContainer: {
    padding: 20,
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4757',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;