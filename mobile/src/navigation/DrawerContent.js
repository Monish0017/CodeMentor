import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme as useAppTheme, themeStyles } from '../context/ThemeContext';

export default function DrawerContent(props) {
  const { userToken, userData, signOut } = useAuth();
  const { theme, toggleTheme } = useAppTheme();
  const paperTheme = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#6200EE',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{color: 'white', fontSize: 20}}>
              {(userData?.name || 'User').charAt(0).toUpperCase()}
            </Text>
          </View>
          <Avatar.Image
            source={{
              uri: userData?.profilePic || 'https://ui-avatars.com/api/?name=User&background=6200EE&color=fff'
            }}
            size={50}
          />
          <Title style={styles.title}>{userData?.name || 'User'}</Title>
          <Caption style={styles.caption}>{userData?.email || 'user@example.com'}</Caption>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                {userData?.problemsSolved || '0'}
              </Paragraph>
              <Caption style={styles.caption}>Problems</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                {userData?.interviewsCompleted || '0'}
              </Paragraph>
              <Caption style={styles.caption}>Interviews</Caption>
            </View>
          </View>
        </View>

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={size} />
            )}
            label="Dashboard"
            onPress={() => props.navigation.navigate('Dashboard')}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="code-tags" color={color} size={size} />
            )}
            label="Coding Problems"
            onPress={() => props.navigation.navigate('CodingProblems')}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="account-voice" color={color} size={size} />
            )}
            label="AI Interview"
            onPress={() => props.navigation.navigate('AIInterview')}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="trophy-outline" color={color} size={size} />
            )}
            label="Leaderboard"
            onPress={() => props.navigation.navigate('Leaderboard')}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="bell-outline" color={color} size={size} />
            )}
            label="Notifications"
            onPress={() => props.navigation.navigate('Notifications')}
          />
        </Drawer.Section>

        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={toggleTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={theme === 'dark'} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>

        {userToken && (
          <Drawer.Section>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="exit-to-app" color={color} size={size} />
              )}
              label="Sign Out"
              onPress={signOut}
            />
          </Drawer.Section>
        )}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});