// app/(tabs)/community.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  Platform,
  ActionSheetIOS,
  Linking,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// 🖼️ Update these filenames to match what you place in /assets
const IMG = {
  welcome: require('../../assets/community-welcome.jpg'),
  about: require('../../assets/sandton-skyline.jpg'),
  ministries: require('../../assets/community-ministries.jpg'),
  give: require('../../assets/community-give-2.jpg'),
  messages: require('../../assets/community-messages.jpg'),
  follow: require('../../assets/community-follow.jpg'),
};

const LINKS = [
  { label: 'Facebook', url: 'https://facebook.com/thelifeplacesa' },
  { label: 'Instagram', url: 'https://instagram.com/thelifeplacesa' },
  { label: 'YouTube', url: 'https://youtube.com/@thelifeplacesa' },
  { label: 'Spotify', url: 'https://open.spotify.com/show/31hbtgq5cvmqr4tyzs2faygvrzaa?si=61b073370e034f21' },
  { label: 'Apple Podcasts', url: 'https://podcasts.apple.com/us/podcast/the-life-place/id1816955719' },
];

export default function Community() {
  const router = useRouter();

  const openUrl = async (url: string, label: string) => {
    try {
      const ok = await Linking.canOpenURL(url);
      if (!ok) return Alert.alert('Could not open link', `${label} is not supported on this device.`);
      return Linking.openURL(url);
    } catch {
      Alert.alert('Something went wrong', 'Please try again.');
    }
  };

  const openSocialChooser = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: 'Follow us online',
          options: [...LINKS.map(l => l.label), 'Cancel'],
          cancelButtonIndex: LINKS.length,
          userInterfaceStyle: 'light',
        },
        (index) => {
          if (index >= 0 && index < LINKS.length) {
            const { url, label } = LINKS[index];
            openUrl(url, label);
          }
        }
      );
    } else {
      Alert.alert(
        'Follow us online',
        'Choose a platform',
        [
          ...LINKS.map(l => ({ text: l.label, onPress: () => openUrl(l.url, l.label) })),
          { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Tile title="OUR WELCOME" image={IMG.welcome} onPress={() => router.push('/about')} />
        <Tile title="ABOUT US" image={IMG.about} onPress={() => router.push('/about')} />
        <Tile title="MINISTRIES" image={IMG.ministries} onPress={() => router.push('/ministries')} />
        <Tile title="GENEROSITY" image={IMG.give} onPress={() => router.push('/give')} />
        <Tile title="MESSAGES" image={IMG.messages} onPress={() => router.push('/messages')} />
        <Tile title="FOLLOW US" image={IMG.follow} onPress={openSocialChooser} />
        

        <View style={styles.privacyRow}>
          <Link href="/privacy" asChild>
            <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.privacy}>Privacy</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

function Tile({
  title,
  image,
  onPress,
}: {
  title: string;
  image: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <ImageBackground
        source={image}
        style={styles.tile}
        imageStyle={styles.tileImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.center}>
          <Text style={styles.tileTitle}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },

  // No side padding, no vertical gaps -> full-bleed, tiles touch
  content: { paddingBottom: 60 },

  // Full-bleed tile with no radius or borders
  tile: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileImage: {
    opacity: 0.85,
    borderRadius: 0,          // ← square corners
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  center: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tileTitle: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 0.2,
  },

  // Small, subtle privacy link separated from tiles
  privacyRow: {
    marginTop: 8,
    alignItems: 'flex-end',
    paddingHorizontal: 12,
  },
  privacy: {
    color: '#6B7280',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
