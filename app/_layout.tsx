// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton'; // path is correct if components/ is at project root

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: true,                // default: show header
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: { color: '#111827', fontSize: 17 },
          headerShadowVisible: false,       // flat, modern
          headerLeft: () => <BackButton />, // custom back appears whenever we can go back
        }}
      >
        {/* Tabs group should not show a header */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Other stack routes (titles can be overridden inside each file if you want) */}
        <Stack.Screen name="about" options={{ title: 'About' }} />
        <Stack.Screen name="devotionals" options={{ title: 'Devotionals' }} />
        <Stack.Screen name="events" options={{ title: 'Events' }} />
        <Stack.Screen name="live" options={{ title: 'Live' }} />
        <Stack.Screen name="meet-schulter-jenny" options={{ title: 'Schulter & Jenny' }} />
        <Stack.Screen name="blog" options={{ title: 'Our Blog' }} />
        <Stack.Screen name="messages" options={{ title: 'Messages' }} />
        <Stack.Screen name="our-welcome" options={{ title: 'Our Welcome' }} />
      </Stack>
    </>
  );
}
