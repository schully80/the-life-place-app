// app/_layout.tsx
import { useCallback, useState } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { AppAppearanceProvider, useAppAppearance } from '../components/AppAppearanceProvider';
import BackButton from '../components/BackButton';
import ScreenLightingOverlay from '../components/ScreenLightingOverlay';
import SiteSplash from '../components/SiteSplash';
import { useBrandFonts } from '../hooks/useBrandFonts';

// Keep the splash visible immediately
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const fontsLoaded = useBrandFonts();
  if (!fontsLoaded) return null;

  return (
    <AppAppearanceProvider>
      <RootLayoutContent />
    </AppAppearanceProvider>
  );
}

function RootLayoutContent() {
  const { ready } = useAppAppearance();
  const [nativeSplashHidden, setNativeSplashHidden] = useState(false);
  const [showSiteSplash, setShowSiteSplash] = useState(true);

  const handleSiteSplashFinish = useCallback(() => {
    setShowSiteSplash(false);
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (!ready || nativeSplashHidden) return;

    SplashScreen.hideAsync()
      .catch(() => {})
      .finally(() => setNativeSplashHidden(true));
  }, [nativeSplashHidden, ready]);

  if (!ready) return null;

  return (
    <View style={styles.root} onLayout={onLayoutRootView}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: {
            color: '#111827',
            fontSize: 18,
            fontFamily: 'Montserrat-Bold',
          },
          headerTintColor: '#111827',
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
        }}
      >
        {/* Tabs group should not show a header */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Other stack routes */}
        <Stack.Screen name="about" options={{ title: 'ABOUT US' }} />
        <Stack.Screen name="devotionals" options={{ title: 'DEVOTIONALS' }} />
        <Stack.Screen name="events" options={{ title: 'EVENTS' }} />
        <Stack.Screen name="meet-schulter-jenny" options={{ title: 'SCHULTER & GENEVIEVE' }} />
        <Stack.Screen name="blog" options={{ title: 'OUR BLOG' }} />
        <Stack.Screen name="messages" options={{ title: 'MESSAGES' }} />
        <Stack.Screen name="our-welcome" options={{ title: 'OUR WELCOME' }} />
        <Stack.Screen name="visit" options={{ title: 'VISIT US' }} />
        <Stack.Screen name="privacy" options={{ title: 'LEGAL' }} />
        <Stack.Screen name="ministries/index" options={{ title: 'MINISTRIES' }} />
        <Stack.Screen name="ministries/[slug]" options={{ title: 'MINISTRY' }} />
      </Stack>

      {showSiteSplash ? <SiteSplash onFinish={handleSiteSplashFinish} /> : null}
      <ScreenLightingOverlay />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F6F4',
  },
});
