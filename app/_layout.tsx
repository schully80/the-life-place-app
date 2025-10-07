
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#B3282D' }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({color,size}) => <Ionicons name="home" color={color} size={size} /> }} />
      <Tabs.Screen name="sermons" options={{ title: 'Sermons', tabBarIcon: ({color,size}) => <Ionicons name="mic" color={color} size={size} /> }} />
      <Tabs.Screen name="give" options={{ title: 'Give', tabBarIcon: ({color,size}) => <Ionicons name="heart" color={color} size={size} /> }} />
      <Tabs.Screen name="prayer" options={{ title: 'Prayer', tabBarIcon: ({color,size}) => <Ionicons name="hand-left-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="events" options={{ title: 'Events', tabBarIcon: ({color,size}) => <Ionicons name="calendar" color={color} size={size} /> }} />
      <Tabs.Screen name="devotionals" options={{ title: 'Devotions', tabBarIcon: ({color,size}) => <Ionicons name="book" color={color} size={size} /> }} />
      <Tabs.Screen name="about" options={{ title: 'About', tabBarIcon: ({color,size}) => <Ionicons name="information-circle" color={color} size={size} /> }} />
    </Tabs>
  );
}
