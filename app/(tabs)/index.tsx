import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchMessages, getMessageWatchUrl, MessageItem } from '~/lib/contentApi';
import { useBootstrap } from '~/hooks/useBootstrap';
import AppIcon, { AppIconName } from '~/components/AppIcon';

const PAGE_PADDING = 24;
const CIRCLE = 56;

type SocialItem = {
  label: string;
  url: string;
  icon: AppIconName;
};

export default function Home() {
  const insets = useSafeAreaInsets();
  const { data: bootstrap, loading: bootstrapLoading } = useBootstrap();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const messagesEnabled = bootstrap?.features.messagesEnabled ?? false;

  const socialLinks = useMemo<SocialItem[]>(
    () => {
      const candidates: Array<SocialItem | null> = [
        bootstrap?.socials.facebook
          ? { label: 'Facebook', url: bootstrap.socials.facebook, icon: 'facebook-f' }
          : null,
        bootstrap?.socials.instagram
          ? { label: 'Instagram', url: bootstrap.socials.instagram, icon: 'instagram' }
          : null,
        bootstrap?.socials.youtube
          ? { label: 'YouTube', url: bootstrap.socials.youtube, icon: 'youtube' }
          : null,
        bootstrap?.socials.spotify
          ? { label: 'Spotify', url: bootstrap.socials.spotify, icon: 'spotify' }
          : null,
        bootstrap?.socials.applePodcasts
          ? { label: 'Apple Podcasts', url: bootstrap.socials.applePodcasts, icon: 'apple-podcasts' }
          : null,
      ];

      return candidates.filter((item): item is SocialItem => item !== null);
    },
    [bootstrap]
  );

  useEffect(() => {
    if (bootstrapLoading) {
      return;
    }

    if (!messagesEnabled) {
      setMessages([]);
      setLoading(false);
      return;
    }

    let active = true;

    (async () => {
      try {
        const items = await fetchMessages();
        if (!active) return;
        setMessages(items.slice(0, 4));
      } catch {
        if (!active) return;
        setMessages([]);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [bootstrapLoading, messagesEnabled]);

  const openSocialUrl = async (url: string, label: string) => {
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
    <ImageBackground
      source={require('../../assets/sandton-skyline.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={[styles.headerWrap, { paddingTop: insets.top + 10 }]}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.tagline}>{bootstrap?.site.tagline || 'Come. See. Jesus.'}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.heroCard}>
            <Text style={styles.eyebrow}>Welcome</Text>
            <Text style={styles.heroTitle}>Everything you need to stay connected to The Life Place.</Text>
            <Text style={styles.heroCopy}>
              Messages, prayer, giving, events, and visit information now come from the same
              shared source of truth as the site.
            </Text>
          </View>

          {messagesEnabled ? (
            <>
              <Text style={styles.sectionTitle}>Latest Messages</Text>
              {loading ? (
                <View style={styles.stateWrap}>
                  <ActivityIndicator size="large" color="#B3282D" />
                  <Text style={styles.stateText}>Loading messages…</Text>
                </View>
              ) : messages.length === 0 ? (
                <View style={styles.stateWrap}>
                  <AppIcon name="albums" size={20} color="#6B7280" />
                  <Text style={styles.stateText}>Messages will appear here soon.</Text>
                </View>
              ) : (
                <View style={styles.messageGrid}>
                  {messages.map((message) => (
                    <TouchableOpacity
                      key={message.id}
                      style={styles.messageCard}
                      activeOpacity={0.88}
                      onPress={() => {
                        const watchUrl = getMessageWatchUrl(message);
                        if (watchUrl) Linking.openURL(watchUrl);
                      }}
                    >
                      <Image source={{ uri: message.thumbnail }} style={styles.messageImage} resizeMode="cover" />
                      <Text numberOfLines={2} style={styles.messageTitle}>
                        {message.title}
                      </Text>
                      <Text style={styles.messageMeta}>
                        {message.preacher} • {new Date(message.date).toLocaleDateString()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          ) : null}

          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionList}>
            <ActionLink href="/devotionals" icon="book-open" label="Devotionals" />
            <TouchableOpacity
              style={styles.actionCard}
              activeOpacity={0.88}
              onPress={() => setSheetOpen(true)}
            >
              <AppIcon name="share-nodes" size={26} color="#B3282D" />
              <Text style={styles.actionLabel}>Follow Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal visible={sheetOpen} animationType="slide" transparent onRequestClose={() => setSheetOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setSheetOpen(false)}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.sheet}>
          <View style={styles.grabber} />

          <View style={styles.iconGrid}>
            {socialLinks.map((item) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => openSocialUrl(item.url, item.label)}
                activeOpacity={0.9}
                style={styles.circle}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <AppIcon name={item.icon} size={22} color="#FFFFFF" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={() => setSheetOpen(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
}

function ActionLink({
  href,
  icon,
  label,
}: {
  href: '/devotionals';
  icon: AppIconName;
  label: string;
}) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.actionCard} activeOpacity={0.88}>
        <AppIcon name={icon} size={26} color="#B3282D" />
        <Text style={styles.actionLabel}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  headerWrap: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
    paddingHorizontal: PAGE_PADDING,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  logo: { width: 72, height: 72 },
  tagline: {
    marginTop: 6,
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  body: { paddingHorizontal: PAGE_PADDING, paddingTop: 20 },
  heroCard: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
  },
  eyebrow: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    color: '#B3282D',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
  },
  heroTitle: {
    marginTop: 10,
    maxWidth: 320,
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    lineHeight: 34,
    color: '#111827',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  heroCopy: {
    marginTop: 10,
    maxWidth: 320,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7280',
    textAlign: 'center',
  },
  sectionTitle: {
    marginTop: 22,
    marginBottom: 12,
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
  },
  stateWrap: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  stateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  messageGrid: {
    gap: 12,
  },
  messageCard: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  messageImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  messageTitle: {
    marginTop: 12,
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#111827',
  },
  messageMeta: {
    marginTop: 6,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  actionList: {
    gap: 12,
  },
  actionCard: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  actionLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  sheet: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  iconGrid: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
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
