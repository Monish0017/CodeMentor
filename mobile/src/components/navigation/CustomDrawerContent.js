import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import ProfileAvatar from '../common/ProfileAvatar';

const CustomDrawerContent = (props) => {
  const { userData, onSignOut } = props;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <ProfileAvatar size={70} name={userData?.name || 'User'} />
        <Text style={styles.userName}>{userData?.name || 'User'}</Text>
        <Text style={styles.userEmail}>{userData?.email || 'user@example.com'}</Text>
      </View>
      
      <DrawerItemList {...props} />
      
      <DrawerItem
        label="Logout"
        onPress={onSignOut}
        labelStyle={styles.logoutLabel}
        icon={({ color, size }) => (
          <Text style={styles.logoutIcon}>🚪</Text>
        )}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  logoutLabel: {
    color: '#F44336',
    fontWeight: '500',
  },
  logoutIcon: {
    fontSize: 20,
  },
});

export default CustomDrawerContent;