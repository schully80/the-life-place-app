// app/(tabs)/community.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  Linking,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const IMG = {
  welcome: require('../../assets/community-welcome.jpg'),
  about: require('../../assets/sandton-skyline.jpg'),
  ministries: require('../../assets/community-ministries2.jpg'),
  give: require('../../assets/community-give-2.jpg'),
  messages: require('../../assets/community-messages.jpg'),
  follow: require('../../assets/community-follow.jpg'),
};

type Item = {
  label: string;
  url: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const LINKS: Item[] = [
  { label: 'Facebook',        url: 'https://facebook.com/thelifeplacesa',                       icon: 'logo-facebook' },
  { label: 'Instagram',       url: 'https://instagram.com/thelifeplacesa',                      icon: 'logo-instagram' },
  { label: 'YouTube',         url: 'https://youtube.com/@thelifeplacesa',                       icon: 'logo-youtube' },
  { label: 'Spotify',         url: 'https://open.spotify.com/show/31hbtgq5cvmqr4tyzs2faygvrzaa?si=61b073370e034f21', icon: 'logo-spotify' },
  { label: 'Apple Podcasts',  url: 'https://podcasts.apple.com/us/podcast/the-life-place/id1816955719', icon: 'logo-apple' },
];

export default function Community() {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);

  const openUrl = async (url: string, label: string) => {
    try {
      const ok = await Linking.canOpenURL(url);
      if (!ok) return Alert.alert('Could not open link', `${label} is not supported on this device.`);
      await Linking.openURL(url);
      setSheetOpen(false);
    } catch {
      Alert.alert('Something went wrong', 'Please try again.');
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Tile title="OUR WELCOME" image={IMG.welcome} onPress={() => router.push('/our-welcome')} />
        <Tile title="ABOUT US" image={IMG.about} onPress={() => router.push('/about')} />
        <Tile title="MINISTRIES" image={IMG.ministries} onPress={() => router.push('/ministries')} />
        <Tile title="GENEROSITY" image={IMG.give} onPress={() => router.push('/generosity')} />
        <Tile title="MESSAGES" image={IMG.messages} onPress={() => router.push('/messages')} />
        <Tile title="FOLLOW US" image={IMG.follow} onPress={() => setSheetOpen(true)} />

        <View style={styles.privacyRow}>
          <Link href="/privacy" asChild>
            <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.privacy}>Privacy</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>

      {/* Custom “popup” with round icon buttons */}
      <Modal
        visible={sheetOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setSheetOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setSheetOpen(false)}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.sheet}>
          <View style={styles.grabber} />
          <Text style={styles.sheetTitle}>Follow us online</Text>
          <Text style={styles.sheetSub}>Watch, listen, and share during the week.</Text>

          <View style={styles.iconGrid}>
            {LINKS.map((item) => (
              <View key={item.label} style={styles.iconBlock}>
                <TouchableOpacity
                  onPress={() => openUrl(item.url, item.label)}
                  activeOpacity={0.9}
                  style={styles.circle}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                >
                  <Ionicons name={item.icon} size={22} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.iconLabel} numberOfLines={1}>{item.label}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={() => setSheetOpen(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
      <ImageBackground source={image} style={styles.tile} imageStyle={styles.tileImage} resizeMode="cover">
        <View style={styles.overlay} />
        <View style={styles.center}>
          <Text style={styles.tileTitle}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const CIRCLE = 56;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingBottom: 60 },

  tile: { height: 160, justifyContent: 'center', alignItems: 'center' },
  tileImage: { opacity: 0.85, borderRadius: 0 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.22)' },
  center: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 },
  tileTitle: { color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 24, textAlign: 'center', letterSpacing: 3.2 },

  privacyRow: { marginTop: 8, alignItems: 'flex-end', paddingHorizontal: 12 },
  privacy: { color: '#6B7280', fontFamily: 'Montserrat-Medium', fontSize: 12, textDecorationLine: 'underline' },

  // Modal sheet
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  sheet: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
  },
  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  sheetTitle: { textAlign: 'center', fontFamily: 'Montserrat-SemiBold', fontSize: 18, color: '#111827' },
  sheetSub: { textAlign: 'center', marginTop: 4, fontFamily: 'Montserrat-Regular', fontSize: 13, color: '#6B7280' },

  iconGrid: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  iconBlock: { alignItems: 'center', width: CIRCLE + 12 },
  circle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconLabel: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 10,
    color: '#6B7280',
    fontFamily: 'Montserrat-Medium',
  },
  closeBtn: {
    marginTop: 14,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
  },
  closeText: { fontFamily: 'Montserrat-Medium', color: '#111827' },
});
