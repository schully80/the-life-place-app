// app/_layout.tsx
import { useCallback, useState } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import BackButton from '../components/BackButton';
import SiteSplash from '../components/SiteSplash';
import { useBrandFonts } from '../hooks/useBrandFonts';

// Keep the splash visible immediately
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const fontsLoaded = useBrandFonts();
  const [nativeSplashHidden, setNativeSplashHidden] = useState(false);
  const [showSiteSplash, setShowSiteSplash] = useState(true);

  const handleSiteSplashFinish = useCallback(() => {
    setShowSiteSplash(false);
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (!fontsLoaded || nativeSplashHidden) return;

    SplashScreen.hideAsync()
      .catch(() => {})
      .finally(() => setNativeSplashHidden(true));
  }, [fontsLoaded, nativeSplashHidden]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.root} onLayout={onLayoutRootView}>
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
        <Stack.Screen name="visit" options={{ title: 'Visit Us' }} />
        <Stack.Screen name="privacy" options={{ title: 'Privacy Policy' }} />
        <Stack.Screen name="ministries/index" options={{ title: 'Ministries' }} />
        <Stack.Screen name="ministries/[slug]" options={{ title: 'Ministry' }} />
      </Stack>

      {showSiteSplash ? <SiteSplash onFinish={handleSiteSplashFinish} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F6F4',
  },
});
