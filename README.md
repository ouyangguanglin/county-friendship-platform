# 县域交友平台

基于地理位置的AI智能匹配交友系统，专注于县域范围内的真实、安全、高效的交友体验。

## 🌟 特色功能
- **县域精准匹配**：基于县、镇、村的精准地理位置匹配
- **AI智能推荐**：多维度AI算法匹配，提高成功率
- **本地化社交**：专注于本地年轻人的婚恋交友
- **安全可靠**：严格的身份验证和内容审核机制

## 🚀 技术架构

### 后端服务
- **用户服务** (Port 8001): 用户注册、登录、资料管理
- **匹配服务** (Port 8002): AI智能匹配算法
- **聊天服务** (Port 8003): 实时聊天、消息推送

### 技术栈
- **前端**: React Native (跨平台移动应用)
- **后端**: Node.js + Express + Socket.IO
- **数据库**: MySQL + Redis
- **AI服务**: 自研匹配算法
- **部署**: Docker + Docker Compose

## 📋 环境要求
- Node.js >= 16.x
- npm >= 8.x
- Docker & Docker Compose
- MySQL 8.0
- Redis

## 🔧 本地开发

### 1. 克隆项目
```bash
git clone https://github.com/ouyangguanglin/county-friendship-platform.git
cd county-friendship-platform
```

### 2. 安装依赖
```bash
# 安装根目录依赖
npm install

# 安装各服务依赖
cd backend/user-service && npm install
cd ../match-service && npm install
cd ../chat-service && npm install
cd ../../frontend/mobile-app && npm install
```

### 3. 启动服务
```bash
# 启动所有服务（Docker）
npm run setup

# 启动开发模式（本地）
npm run dev
```

## 📄 许可证
MIT License

## 🤝 贡献
欢迎提交Issue和Pull Request。

## 📞 支持
如有问题请联系：[你的联系方式]