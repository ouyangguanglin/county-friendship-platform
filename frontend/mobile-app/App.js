import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 导入屏幕组件
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainScreen from './src/screens/MainScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import ChatScreen from './src/screens/ChatScreen';
import MatchesScreen from './src/screens/MatchesScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ title: '注册' }}
          />
          <Stack.Screen 
            name="Main" 
            component={MainScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Profile" 
            component={UserProfileScreen} 
            options={{ title: '个人资料' }}
          />
          <Stack.Screen 
            name="Matches" 
            component={MatchesScreen} 
            options={{ title: '匹配' }}
          />
          <Stack.Screen 
            name="ChatList" 
            component={ChatListScreen} 
            options={{ title: '聊天' }}
          />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen} 
            options={({ route }) => ({ title: route.params?.userName || '聊天' })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;