import React from 'react';
import { View, Text } from 'react-native';

const ProfileAvatar = ({ size = 50, name = 'User', style = {} }) => {
  const initial = name ? name.charAt(0).toUpperCase() : 'U';
  
  return (
    <View style={[{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#6200EE',
      justifyContent: 'center',
      alignItems: 'center'
    }, style]}>
      <Text style={{ color: 'white', fontSize: size * 0.4 }}>
        {initial}
      </Text>
    </View>
  );
};

export default ProfileAvatar;