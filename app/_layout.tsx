// app/_layout.tsx
import { useEffect, useRef, useState } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useBrandFonts } from '../hooks/useBrandFonts';
import { Asset } from 'expo-asset';

// Keep the splash visible immediately
SplashScreen.preventAutoHideAsync().catch(() => {});

const SPLASH_MIN_DURATION_MS = 2000; // ← tweak this (e.g., 3000 = 3s)

export default function RootLayout() {
  const fontsLoaded = useBrandFonts();
  const startRef = useRef<number>(Date.now());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!fontsLoaded) return;

    (async () => {
      try {
        // Preload the SAME image configured in app.json → expo.splash.image
        await Asset.fromModule(require('../assets/splash-new.png')).downloadAsync();
      } catch {
        // ignore; the native splash will still show
      } finally {
        const elapsed = Date.now() - startRef.current;
        const remaining = Math.max(SPLASH_MIN_DURATION_MS - elapsed, 0);
        const t = setTimeout(() => {
          if (!cancelled) {
            setIsReady(true);
            SplashScreen.hideAsync().catch(() => {});
          }
        }, remaining);
        return () => clearTimeout(t);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fontsLoaded]);

  if (!fontsLoaded || !isReady) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: {
            color: '#111827',
            fontSize: 17,
            fontFamily: 'Montserrat-SemiBold',
          },
          headerTintColor: '#111827',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
        }}
      >
        {/* Tabs group should not show a header */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Other stack routes */}
        <Stack.Screen name="about" options={{ title: 'About Us' }} />
        <Stack.Screen name="devotionals" options={{ title: 'Devotionals' }} />
        <Stack.Screen name="events" options={{ title: 'Events' }} />
        <Stack.Screen name="live" options={{ title: 'Live' }} />
        <Stack.Screen name="meet-schulter-jenny" options={{ title: 'Schulter & Genevieve' }} />
        <Stack.Screen name="blog" options={{ title: 'Our Blog' }} />
        <Stack.Screen name="messages" options={{ title: 'Messages' }} />
        <Stack.Screen name="our-welcome" options={{ title: 'Our Welcome' }} />
        <Stack.Screen name="ministries/index" options={{ title: 'Ministries' }} />
        <Stack.Screen name="ministries/[slug]" options={{ title: 'Ministry' }} />
      </Stack>
    </>
  );
}
