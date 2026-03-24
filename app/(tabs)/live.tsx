import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchLive } from '~/lib/contentApi';
import AppIcon, { type AppIconName } from '~/components/AppIcon';
import { HOME_STYLES, type HomeStyle } from '~/lib/homeDesignStyles';
import PageSlogan from '~/components/PageSlogan';

type LivePayload = Awaited<ReturnType<typeof fetchLive>>;

const BRAND_RED = '#B3282D';
const NativeWebView = Platform.OS === 'web' ? null : require('react-native-webview').WebView;
const DAY_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function getCountdownLabel(service: LivePayload['service'], isLive: boolean) {
  if (isLive) return 'We are live now!';

  const serviceDay = DAY_INDEX[service.day];
  const [serviceHour, serviceMinute] = service.startTime.split(':').map(Number);
  if (serviceDay === undefined || Number.isNaN(serviceHour) || Number.isNaN(serviceMinute)) {
    return '';
  }

  const now = new Date();
  const nextService = new Date();
  nextService.setDate(now.getDate() + ((serviceDay + 7 - now.getDay()) % 7));
  nextService.setHours(serviceHour, serviceMinute, 0, 0);

  const diff = nextService.getTime() - now.getTime();
  if (diff <= 0) return 'We are live now!';

  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${hours}h ${minutes}m ${seconds}s until next service`;
}

export default function LiveScreen() {
  const router = useRouter();
  const theme = HOME_STYLES.find((style) => style.id === 'glass') ?? HOME_STYLES[0];
  const [liveData, setLiveData] = useState<LivePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const [countdownLabel, setCountdownLabel] = useState('');

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

  useEffect(() => {
    if (!liveData) {
      setCountdownLabel('');
      return;
    }

    const updateCountdown = () => {
      setCountdownLabel(getCountdownLabel(liveData.service, liveData.live));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [liveData]);

  const handleShare = async () => {
    if (!liveData) return;

    const message = liveData.live
      ? `Join us live at The Life Place: ${liveData.watchUrl}`
      : `Watch The Life Place on YouTube: ${liveData.channelUrl}`;

    await Share.share({ message });
  };

  if (loading) {
    return (
      <ScreenShell theme={theme}>
        <View style={styles.stateWrap}>
          <StateCard theme={theme}>
            <ActivityIndicator size="large" color={theme.accent} />
            <Text style={[styles.stateText, { color: theme.textSecondary }]}>Checking live status...</Text>
          </StateCard>
        </View>
      </ScreenShell>
    );
  }

  if (!liveData) {
    return (
      <ScreenShell theme={theme}>
        <View style={styles.stateWrap}>
          <StateCard theme={theme}>
            <Text style={[styles.stateTitle, { color: theme.textPrimary }]}>Live unavailable</Text>
            <Text style={[styles.stateText, { color: theme.textSecondary }]}>
              We could not load the live experience right now. Please try again shortly.
            </Text>
          </StateCard>
        </View>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell theme={theme}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroGlowLeft} />
          <View style={styles.heroGlowRight} />

          <Text style={styles.heroEyebrow}>{liveData.service.label}</Text>

          {countdownLabel ? (
            <Text style={styles.countdownText}>{countdownLabel}</Text>
          ) : null}
        </View>

        <View style={styles.contentShell}>
          <View
            style={[
              styles.playerSection,
              {
                backgroundColor: theme.card,
                borderColor: theme.borderStrong,
                shadowColor: theme.shadow,
              },
            ]}
          >
            <View style={[styles.playerGlow, { backgroundColor: theme.accentSoft }]} />

            <View style={[styles.playerFrame, { borderColor: theme.borderStrong }]}>
              <View style={styles.badgeWrap}>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: liveData.live ? theme.pillActive : theme.pill },
                  ]}
                >
                  <View style={[styles.statusDot, liveData.live ? styles.dotLive : styles.dotOffline]} />
                  <Text style={[styles.statusText, { color: theme.textPrimary }]}>
                    {liveData.live ? 'Live Now' : `Offline • ${liveData.service.label}`}
                  </Text>
                </View>
              </View>

              {Platform.OS === 'web' || !NativeWebView ? (
                <View style={[styles.webVideoFallback, { backgroundColor: theme.cardAlt }]}>
                  <AppIcon name="youtube" size={30} color={theme.accent} />
                  <Text style={[styles.webVideoFallbackTitle, { color: theme.textPrimary }]}>
                    Open the live stream on YouTube
                  </Text>
                  <Text style={[styles.webVideoFallbackCopy, { color: theme.textSecondary }]}>
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

            <View style={styles.actionRow}>
              <ActionCard
                theme={theme}
                icon="share-nodes"
                label="Share"
                active={activeActionId === 'share'}
                onPress={() => {
                  setActiveActionId('share');
                  void handleShare();
                }}
              />
            </View>
          </View>

          <View style={styles.nextSteps}>
            <NextStepCard
              theme={theme}
              icon="hand-holding-heart"
              title="Partner With Us"
              copy="Your generosity moves the mission of Jesus forward."
              onPress={() => router.push('/generosity')}
            />
          </View>

          <PageSlogan inverse />
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

function ScreenShell({
  theme,
  children,
}: {
  theme: HomeStyle;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.screen}>
      <LinearGradient colors={theme.pageGradient} style={StyleSheet.absoluteFill} />
      <BackgroundDecor theme={theme} />
      {children}
    </View>
  );
}

function NextStepCard({
  theme,
  icon,
  title,
  copy,
  onPress,
}: {
  theme: HomeStyle;
  icon: AppIconName;
  title: string;
  copy: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.nextCard,
        {
          backgroundColor: theme.cardAlt,
          borderColor: theme.borderStrong,
          shadowColor: theme.shadow,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View
        style={[
          styles.nextCardIcon,
          {
            backgroundColor: theme.accentSoft,
            borderColor: theme.borderStrong,
          },
        ]}
      >
        <AppIcon name={icon} size={24} color={theme.accent} />
      </View>
      <Text style={[styles.nextCardTitle, { color: theme.textPrimary }]}>{title}</Text>
      <Text style={[styles.nextCardCopy, { color: theme.textSecondary }]}>{copy}</Text>
    </TouchableOpacity>
  );
}

function ActionCard({
  theme,
  icon,
  label,
  active,
  onPress,
}: {
  theme: HomeStyle;
  icon: AppIconName;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={(state) => {
        const isHovered = 'hovered' in state && Boolean((state as { hovered?: boolean }).hovered);
        const isActive = active || isHovered || state.pressed;

        return [
          styles.actionCard,
          {
            backgroundColor: theme.cardAlt,
            borderColor: isActive ? theme.accent : theme.borderStrong,
            shadowColor: theme.shadow,
          },
          isHovered ? styles.actionCardHover : null,
          state.pressed ? styles.actionCardPressed : null,
        ];
      }}
    >
      <AppIcon name={icon} size={16} color={theme.accent} />
      <Text style={[styles.actionCardLabel, { color: theme.textPrimary }]}>{label}</Text>
    </Pressable>
  );
}

function StateCard({
  theme,
  children,
}: {
  theme: HomeStyle;
  children: React.ReactNode;
}) {
  return (
    <View
      style={[
        styles.stateCard,
        {
          backgroundColor: theme.card,
          borderColor: theme.borderStrong,
          shadowColor: theme.shadow,
        },
      ]}
    >
      {children}
    </View>
  );
}

function BackgroundDecor({ theme }: { theme: HomeStyle }) {
  return (
    <>
      <View style={[styles.orbTop, { backgroundColor: theme.orbTop }]} />
      <View style={[styles.orbMiddle, { backgroundColor: theme.orbMiddle }]} />
      <View style={[styles.orbBottom, { backgroundColor: theme.orbBottom }]} />
    </>
  );
}

async function handleOpenUrl(url: string) {
  await Linking.openURL(url);
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#07111F',
  },
  container: {
    paddingBottom: 48,
  },
  hero: {
    overflow: 'hidden',
    backgroundColor: '#111827',
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 46,
    alignItems: 'center',
  },
  contentShell: {
    paddingHorizontal: 20,
    paddingTop: 22,
    gap: 18,
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
    marginBottom: 12,
    textAlign: 'center',
  },
  countdownText: {
    marginTop: 4,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    color: '#F87171',
    textAlign: 'center',
  },
  playerSection: {
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 20,
    alignItems: 'center',
    overflow: 'hidden',
    shadowOpacity: 0.18,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  playerGlow: {
    position: 'absolute',
    top: 46,
    alignSelf: 'center',
    width: 320,
    height: 180,
    borderRadius: 160,
  },
  playerFrame: {
    width: '100%',
    borderRadius: 28,
    backgroundColor: '#000000',
    overflow: 'hidden',
    aspectRatio: 16 / 9,
    borderWidth: 1,
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
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotLive: {
    backgroundColor: '#F05B69',
  },
  dotOffline: {
    backgroundColor: '#C7D2E2',
  },
  statusText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  video: {
    flex: 1,
    backgroundColor: '#000000',
  },
  webVideoFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 12,
  },
  webVideoFallbackTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  webVideoFallbackCopy: {
    maxWidth: 320,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  actionRow: {
    width: '100%',
    marginTop: 18,
    alignItems: 'center',
  },
  actionCard: {
    minWidth: 132,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  actionCardHover: {
    shadowOpacity: 0.16,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 8,
  },
  actionCardPressed: {
    opacity: 0.96,
  },
  actionCardLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  nextSteps: {
    gap: 14,
  },
  nextCard: {
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 22,
    paddingVertical: 24,
    alignItems: 'center',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  nextCardIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextCardTitle: {
    marginTop: 14,
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  nextCardCopy: {
    marginTop: 8,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
  stateWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  stateCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 28,
    gap: 10,
    alignItems: 'center',
    shadowOpacity: 0.16,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  stateTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  stateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  orbTop: {
    position: 'absolute',
    top: 78,
    left: -52,
    width: 212,
    height: 212,
    borderRadius: 106,
  },
  orbMiddle: {
    position: 'absolute',
    top: 318,
    right: -64,
    width: 224,
    height: 224,
    borderRadius: 112,
  },
  orbBottom: {
    position: 'absolute',
    bottom: 92,
    left: 42,
    width: 188,
    height: 188,
    borderRadius: 94,
  },
});
