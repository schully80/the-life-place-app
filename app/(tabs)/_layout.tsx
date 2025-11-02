// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet } from 'react-native';
import { useBrandFonts } from '../../hooks/useBrandFonts';
import PrivacyBanner from '../../components/PrivacyBanner';

export default function TabsLayout() {
  const fontsLoaded = useBrandFonts();
  if (!fontsLoaded) return null; // tiny splash/loader if you like

  return (
    <>
      <Tabs
        screenOptions={{
          // ✅ Show a top header on all tab screens
          headerShown: true,
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: {
            color: '#111827',
            fontSize: 17,
            fontFamily: 'Montserrat-SemiBold',
          },
          headerShadowVisible: false,

          // 🔻 Your existing tab bar styling (kept)
          tabBarActiveTintColor: '#B3282D',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
            fontFamily: 'Montserrat-Medium', // uses your loaded fonts
          },
          tabBarBackground: () => (
            <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
          ),
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            height: 64,
            borderRadius: 22,
            backgroundColor: 'rgba(255,255,255,0.7)',
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
            borderWidth: 0.5,
            borderColor: 'rgba(0,0,0,0.06)',
            paddingBottom: Platform.OS === 'ios' ? 8 : 4,
          },
        }}
      >
    <Tabs.Screen
  name="index"
  options={{
    headerShown: false,                // hide header on Home only
    title: 'Home',
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="home-outline" color={color} size={size} />
    ),
  }}
/>


        <Tabs.Screen
          name="live"
          options={{
            title: 'Live',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="radio-outline" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="community"
          options={{
            title: 'Community',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="prayer"
          options={{
            title: 'Prayer',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="hands-pray" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="give"
          options={{
            title: 'Give',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="hand-heart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* ✅ One-time POPIA banner across tabs */}
      <PrivacyBanner />
    </>
  );
}
