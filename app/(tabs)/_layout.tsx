// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View } from 'react-native';
import { useBrandFonts } from '../../hooks/useBrandFonts';
import AppIcon from '../../components/AppIcon';

const TAB_ICON_ACTIVE = '#F05B69';
const TAB_ICON_INACTIVE = '#B9C5D6';

export default function TabsLayout() {
  const fontsLoaded = useBrandFonts();
  if (!fontsLoaded) return null;

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#111827',
            fontSize: 18,
            fontFamily: 'Montserrat-Bold',
          },
          headerShadowVisible: false,
          tabBarShowLabel: true,
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: '#F8FBFF',
          tabBarInactiveTintColor: '#9AA7BA',
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIconStyle: styles.tabBarIcon,
          tabBarBackground: () => (
            <>
              <BlurView intensity={55} tint="dark" style={StyleSheet.absoluteFill} />
              <View style={styles.navBackgroundOverlay} />
            </>
          ),
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 104,
            borderRadius: 0,
            backgroundColor: 'rgba(7,17,31,0.86)',
            overflow: 'hidden',
            shadowColor: '#020913',
            shadowOpacity: 0.18,
            shadowRadius: 22,
            shadowOffset: { width: 0, height: 10 },
            elevation: 12,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.12)',
            paddingTop: 12,
            paddingBottom: Platform.OS === 'ios' ? 18 : 12,
          },
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 0,
            paddingTop: 6,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              <AppIcon
                name="home"
                color={focused ? TAB_ICON_ACTIVE : TAB_ICON_INACTIVE}
                size={22}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="live"
          options={{
            title: 'LIVE',
            tabBarLabel: 'Live',
            tabBarIcon: ({ focused }) => (
              <AppIcon
                name="radio"
                color={focused ? TAB_ICON_ACTIVE : TAB_ICON_INACTIVE}
                size={22}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="community"
          options={{
            href: null,
            title: 'COMMUNITY',
            tabBarLabel: 'Community',
            tabBarIcon: ({ focused }) => (
              <AppIcon
                name="people"
                color={focused ? TAB_ICON_ACTIVE : TAB_ICON_INACTIVE}
                size={22}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="generosity"
          options={{
            title: 'GENEROSITY',
            tabBarLabel: 'Give',
            tabBarIcon: ({ focused }) => (
              <AppIcon
                name="hand-holding-heart"
                color={focused ? TAB_ICON_ACTIVE : TAB_ICON_INACTIVE}
                size={22}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="prayer"
          options={{
            title: 'PRAYER',
            tabBarLabel: 'Prayer',
            tabBarIcon: ({ focused }) => (
              <AppIcon
                name="hands-praying"
                color={focused ? TAB_ICON_ACTIVE : TAB_ICON_INACTIVE}
                size={22}
              />
            ),
          }}
        />
      </Tabs>

    </>
  );
}

const styles = StyleSheet.create({
  navBackgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,19,35,0.28)',
  },
  tabBarIcon: {
    marginBottom: 4,
  },
  tabBarLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0,
  },
});
