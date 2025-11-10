// app/_layout.tsx
import React, { useEffect, useRef } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useBrandFonts } from '../hooks/useBrandFonts';

// Keep the splash visible immediately
SplashScreen.preventAutoHideAsync().catch(() => {});

const SPLASH_MIN_DURATION_MS = 7000; // ← tweak this (e.g., 3000 = 3s)

export default function RootLayout() {
  const fontsLoaded = useBrandFonts();
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!fontsLoaded) return;

    const elapsed = Date.now() - startRef.current;
    const remaining = Math.max(SPLASH_MIN_DURATION_MS - elapsed, 0);

    const t = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {});
    }, remaining);

    return () => clearTimeout(t);
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: { color: '#111827', fontSize: 17, fontFamily: 'Montserrat-SemiBold' },
          headerTintColor: '#111827',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ title: 'About Us' }} />
        <Stack.Screen name="devotionals" options={{ title: 'Devotionals' }} />
        <Stack.Screen name="events" options={{ title: 'Events' }} />
        <Stack.Screen name="live" options={{ title: 'Live' }} />
        <Stack.Screen name="meet-schulter-jenny" options={{ title: 'Schulter & Jenny' }} />
        <Stack.Screen name="blog" options={{ title: 'Our Blog' }} />
        <Stack.Screen name="messages" options={{ title: 'Messages' }} />
        <Stack.Screen name="our-welcome" options={{ title: 'Our Welcome' }} />
        <Stack.Screen name="ministries/index" options={{ title: 'Ministries' }} />
        <Stack.Screen name="ministries/[slug]" options={{ title: 'Ministry' }} />
      </Stack>
    </>
  );
}
