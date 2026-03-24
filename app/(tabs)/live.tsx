import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  Share,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { fetchLive } from '~/lib/contentApi';
import AppIcon, { AppIconName } from '~/components/AppIcon';

type LivePayload = Awaited<ReturnType<typeof fetchLive>>;

const BRAND_RED = '#B3282D';
const INK = '#1F2937';
const MUTED = '#6B7280';
const NativeWebView = Platform.OS === 'web' ? null : require('react-native-webview').WebView;

export default function LiveScreen() {
  const router = useRouter();
  const [liveData, setLiveData] = useState<LivePayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const payload = await fetchLive();
        if (!active) return;
        setLiveData(payload);
      } catch {
        if (!active) return;
        setLiveData(null);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const handleShare = async () => {
    if (!liveData) return;

    const message = liveData.live
      ? `Join us live at The Life Place: ${liveData.watchUrl}`
      : `Watch The Life Place on YouTube: ${liveData.channelUrl}`;

    await Share.share({ message });
  };

  if (loading) {
    return (
      <View style={styles.stateWrap}>
        <ActivityIndicator size="large" color={BRAND_RED} />
        <Text style={styles.stateText}>Checking live status…</Text>
      </View>
    );
  }

  if (!liveData) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateTitle}>Live unavailable</Text>
        <Text style={styles.stateText}>
          We could not load the live experience right now. Please try again shortly.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <View style={styles.heroGlowLeft} />
        <View style={styles.heroGlowRight} />

        <Text style={styles.heroEyebrow}>{liveData.service.label}</Text>
        <Text style={styles.heroTitle}>
          Join Us <Text style={styles.heroAccent}>Live</Text>
        </Text>
        <Text style={styles.heroCopy}>
          {liveData.live
            ? 'The stream is live now. Watch here or open it directly on YouTube.'
            : `We are currently offline. Join us during ${liveData.service.label.toLowerCase()} or watch on YouTube.`}
        </Text>

        <TouchableOpacity
          style={styles.heroButton}
          onPress={() => void handleOpenUrl(liveData.watchUrl)}
          activeOpacity={0.9}
        >
          <Text style={styles.heroButtonText}>{liveData.live ? 'Watch Now' : 'Open YouTube'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.playerSection}>
        <View style={styles.playerGlow} />
        <View style={styles.playerFrame}>
          <View style={styles.badgeWrap}>
            <View style={[styles.statusBadge, liveData.live ? styles.badgeLive : styles.badgeOffline]}>
              <View style={[styles.statusDot, liveData.live ? styles.dotLive : styles.dotOffline]} />
              <Text style={styles.statusText}>
                {liveData.live ? 'Live Now' : `Offline • ${liveData.service.label}`}
              </Text>
            </View>
          </View>

          {Platform.OS === 'web' || !NativeWebView ? (
            <View style={styles.webVideoFallback}>
              <AppIcon name="youtube" size={30} color={BRAND_RED} />
              <Text style={styles.webVideoFallbackTitle}>Open the live stream on YouTube</Text>
              <Text style={styles.webVideoFallbackCopy}>
                The web app hands this experience off to YouTube so the live page stays reliable on Cloudflare Pages.
              </Text>
            </View>
          ) : (
            <NativeWebView
              source={{ uri: liveData.embedUrl }}
              style={styles.video}
              allowsFullscreenVideo
              startInLoadingState
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.youtubeButton}
          onPress={() => void handleOpenUrl(liveData.watchUrl)}
          activeOpacity={0.88}
        >
          <AppIcon name="youtube" size={18} color={BRAND_RED} />
          <Text style={styles.youtubeButtonText}>Open on YouTube</Text>
        </TouchableOpacity>

        <Text style={styles.youtubeHelper}>
          Prefer YouTube? Open the live stream there in one tap.
        </Text>

        <TouchableOpacity style={styles.shareButton} onPress={() => void handleShare()} activeOpacity={0.88}>
          <AppIcon name="share-nodes" size={18} color="#FFFFFF" />
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.nextSteps}>
        <NextStepCard
          icon="hand-holding-heart"
          title="Partner With Us"
          copy="Your generosity moves the mission of Jesus forward."
          onPress={() => router.push('/generosity')}
        />
        <NextStepCard
          icon="home"
          title="Plan a Visit"
          copy="We would love to welcome you this Sunday."
          onPress={() => router.push('/visit')}
        />
      </View>
    </ScrollView>
  );
}

function NextStepCard({
  icon,
  title,
  copy,
  onPress,
}: {
  icon: AppIconName;
  title: string;
  copy: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.nextCard} onPress={onPress} activeOpacity={0.9}>
      <AppIcon name={icon} size={28} color={BRAND_RED} />
      <Text style={styles.nextCardTitle}>{title}</Text>
      <Text style={styles.nextCardCopy}>{copy}</Text>
    </TouchableOpacity>
  );
}

async function handleOpenUrl(url: string) {
  await Linking.openURL(url);
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    overflow: 'hidden',
    backgroundColor: '#111827',
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 46,
    alignItems: 'center',
  },
  heroGlowLeft: {
    position: 'absolute',
    top: -60,
    left: -90,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(179,40,45,0.28)',
  },
  heroGlowRight: {
    position: 'absolute',
    bottom: -70,
    right: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(220,38,38,0.18)',
  },
  heroEyebrow: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    color: '#F87171',
    marginBottom: 16,
    textAlign: 'center',
  },
  heroTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 40,
    lineHeight: 46,
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  heroAccent: {
    color: BRAND_RED,
  },
  heroCopy: {
    marginTop: 18,
    maxWidth: 340,
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    lineHeight: 26,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  heroButton: {
    marginTop: 24,
    borderRadius: 18,
    backgroundColor: BRAND_RED,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  heroButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  playerSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    alignItems: 'center',
  },
  playerGlow: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    width: 320,
    height: 180,
    borderRadius: 160,
    backgroundColor: 'rgba(179,40,45,0.1)',
  },
  playerFrame: {
    width: '100%',
    borderRadius: 28,
    backgroundColor: '#000000',
    overflow: 'hidden',
    aspectRatio: 16 / 9,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  badgeWrap: {
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeLive: {
    backgroundColor: 'rgba(179,40,45,0.92)',
  },
  badgeOffline: {
    backgroundColor: 'rgba(55,65,81,0.92)',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotLive: {
    backgroundColor: '#FFFFFF',
  },
  dotOffline: {
    backgroundColor: '#D1D5DB',
  },
  statusText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  video: {
    flex: 1,
    backgroundColor: '#000000',
  },
  webVideoFallback: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 12,
  },
  webVideoFallbackTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  webVideoFallbackCopy: {
    maxWidth: 320,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#CBD5E1',
    textAlign: 'center',
  },
  youtubeButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  youtubeButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    color: INK,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  youtubeHelper: {
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: MUTED,
    textAlign: 'center',
  },
  shareButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 18,
    backgroundColor: BRAND_RED,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  shareButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  nextSteps: {
    paddingHorizontal: 20,
    paddingTop: 34,
    gap: 14,
  },
  nextCard: {
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 22,
    paddingVertical: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  nextCardTitle: {
    marginTop: 14,
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    lineHeight: 30,
    color: INK,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  nextCardCopy: {
    marginTop: 8,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 23,
    color: MUTED,
    textAlign: 'center',
  },
  stateWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  stateTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: INK,
  },
  stateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: MUTED,
    textAlign: 'center',
  },
});
