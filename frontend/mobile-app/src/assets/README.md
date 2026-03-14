# Assets Directory

This directory contains all the image assets for the mobile app.

## Required Assets
- logo.png - App logo (80x80)
- avatar1.jpg - Sample user avatar 1
- avatar2.jpg - Sample user avatar 2  
- avatar3.jpg - Sample user avatar 3
- profile-avatar.jpg - Profile page avatar

## How to Add Assets
1. Place your image files in this directory
2. Import them in your components using:
   ```javascript
   import avatar from '../assets/avatar1.jpg';
   ```
3. Use with Image component:
   ```jsx
   <Image source={avatar} style={styles.avatar} />
   ```

Note: For production, replace sample avatars with actual user uploaded images.