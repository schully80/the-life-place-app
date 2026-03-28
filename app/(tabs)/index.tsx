import { useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Alert,
  Animated,
  Easing,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppAppearance } from '~/components/AppAppearanceProvider';
import AppIcon, { AppIconName } from '~/components/AppIcon';
import PageSlogan from '~/components/PageSlogan';
import { useBootstrap } from '~/hooks/useBootstrap';
import {
  getCanonicalSocials,
  getWhatsAppAppUrls,
  getWhatsAppClickToChatUrl,
} from '~/lib/contentApi';
import { openExternalUrl } from '~/lib/externalLinks';
import { HOME_STYLES, type HomeStyle } from '~/lib/homeDesignStyles';

const PAGE_PADDING = 20;
const SOCIAL_ICON_SIZE = 54;
const SECTION_HEADER_TITLE_SIZE = 30;
const LOGO_IMAGE = require('../../assets/logo.png');
const CANONICAL_PRIVACY_URL = 'https://thelifeplace.org/privacy-policy/';
const CANONICAL_TERMS_URL = 'https://thelifeplace.org/terms/';

type SocialItem = {
  label: string;
  url: string;
  icon: AppIconName;
};

type QuickActionItem = {
  id: string;
  title: string;
  description: string;
  icon: AppIconName;
  onPress: () => void;
};

type CardSurfaceProps = {
  children: ReactNode;
  theme: HomeStyle;
  style?: StyleProp<ViewStyle>;
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
  shadowColor?: string;
  onPress?: () => void;
  active?: boolean;
  disableInteractiveOutline?: boolean;
};

let lastActiveHomeCardId: string | null = null;

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { resolvedAppearance, setPreference } = useAppAppearance();
  const { data: bootstrap } = useBootstrap();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [whatsAppModalVisible, setWhatsAppModalVisible] = useState(false);
  const waSheetAnim = useState(new Animated.Value(0))[0];
  const [waAnchorTop, setWaAnchorTop] = useState<number | null>(null);
  const connectSectionRef = useRef<View | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | null>(lastActiveHomeCardId);
  const activeStyle = HOME_STYLES.find((style) => style.id === 'glass') ?? HOME_STYLES[0];
  const appVersion = Constants.expoConfig?.version || '0.1.0';
  const buildNumber =
    Constants.expoConfig?.ios?.buildNumber ||
    String(Constants.expoConfig?.android?.versionCode || '').trim();
  const versionLabel = buildNumber
    ? `Version ${appVersion} (${buildNumber})`
    : `Version ${appVersion}`;

  const missionSupport =
    'Every time we meet we see how true, good, beautiful, and kind Jesus is.';
  const canonicalSocials = getCanonicalSocials(bootstrap?.socials);
  const socialLinks = useMemo<SocialItem[]>(
    () => {
      const items: Array<SocialItem | null> = [
        canonicalSocials.facebook
          ? { label: 'Facebook', url: canonicalSocials.facebook, icon: 'facebook-f' }
          : null,
        canonicalSocials.instagram
          ? { label: 'Instagram', url: canonicalSocials.instagram, icon: 'instagram' }
          : null,
        canonicalSocials.youtube
          ? { label: 'YouTube', url: canonicalSocials.youtube, icon: 'youtube' }
          : null,
        canonicalSocials.spotify
          ? { label: 'Spotify', url: canonicalSocials.spotify, icon: 'spotify' }
          : null,
        canonicalSocials.applePodcasts
          ? { label: 'Apple Podcasts', url: canonicalSocials.applePodcasts, icon: 'apple-podcasts' }
          : null,
      ];

      return items.filter((item): item is SocialItem => item !== null);
    },
    [canonicalSocials]
  );

  const quickActions: QuickActionItem[] = [
    {
      id: 'visit',
      title: 'Plan a Visit',
      description: 'Directions, service time, and what to expect on Sunday.',
      icon: 'location-dot',
      onPress: () => router.push('/visit'),
    },
    {
      id: 'prayer',
      title: 'Prayer',
      description: 'Share a need and let us stand with you.',
      icon: 'hands-praying',
      onPress: () => router.push('/prayer'),
    },
    {
      id: 'give',
      title: 'Give',
      description: 'Give quickly and securely from the app.',
      icon: 'hand-holding-heart',
      onPress: () => router.push('/generosity'),
    },
    {
      id: 'devotionals',
      title: 'Devotionals',
      description: 'Read reflections shaped around Scripture and grace.',
      icon: 'book-open',
      onPress: () => router.push('/devotionals'),
    },
  ];

  const setHomeActiveCard = (cardId: string) => {
    lastActiveHomeCardId = cardId;
    setActiveCardId(cardId);
  };

  const openUrl = async (url: string, label: string) => {
    await openExternalUrl(url, {
      label,
      failureTitle: 'Could not open link',
      failureMessage: `${label} is not supported on this device.`,
    });
  };

  const measureConnectAnchor = () =>
    new Promise<number | null>((resolve) => {
      const node = connectSectionRef.current;
      if (!node) return resolve(null);
      requestAnimationFrame(() => {
        node.measureInWindow((_x: number, y: number, _w: number, h: number) => resolve(y + h + 8));
      });
    });

  const openWhatsAppUrl = async (url?: string) => {
    const webUrl = getWhatsAppClickToChatUrl(url, Platform.OS === 'ios' ? 'ios' : 'android');
    const appUrls = getWhatsAppAppUrls(url);

    if (__DEV__) {
      console.log('[WhatsApp] open request', {
        platform: Platform.OS,
        rawUrl: url ?? null,
        webUrl,
        appUrls,
      });
    }

    for (const appUrl of appUrls) {
      try {
        await Linking.openURL(appUrl);
        if (__DEV__) {
          console.log('[WhatsApp] app link opened', { platform: Platform.OS, appUrl });
        }
        return;
      } catch (error) {
        if (__DEV__) {
          console.log('[WhatsApp] app link failed', {
            platform: Platform.OS,
            appUrl,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }
    }

    if (Platform.OS === 'ios') {
      const anchorTop = await measureConnectAnchor();
      if (anchorTop !== null) setWaAnchorTop(anchorTop);
      setWhatsAppModalVisible(true);
      waSheetAnim.setValue(0);
      Animated.timing(waSheetAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
      return;
    }

    await openUrl(webUrl, 'WhatsApp');
  };

  const blogUrl = bootstrap?.links.blogUrl || 'https://schulteretyang.substack.com';
  const blogSubscribeUrl = `${blogUrl.replace(/\/+$/, '')}/subscribe`;
  const whatsappUrl = getWhatsAppClickToChatUrl(
    bootstrap?.contact.whatsapp,
    Platform.OS === 'ios' ? 'ios' : 'android'
  );

  return (
    <View style={styles.screen}>
      <LinearGradient colors={activeStyle.pageGradient} style={StyleSheet.absoluteFill} />
      <BackgroundDecor theme={activeStyle} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 14, paddingBottom: insets.bottom + 110 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.lightingToggleRow}>
            <LightingToggleButton
              icon="moon"
              active={resolvedAppearance === 'night'}
              accessibilityLabel="Night lighting"
              onPress={() => void setPreference('night')}
            />
            <LightingToggleButton
              icon="sunny"
              active={resolvedAppearance === 'day'}
              accessibilityLabel="Day lighting"
              onPress={() => void setPreference('day')}
            />
          </View>

          <CardSurface
            theme={activeStyle}
            style={styles.labCard}
            backgroundColor={activeStyle.card}
            borderColor={activeStyle.borderStrong}
            borderRadius={activeStyle.radiusCard}
            shadowColor={activeStyle.shadow}
            disableInteractiveOutline
          >
            <Image source={LOGO_IMAGE} style={styles.logoImage} resizeMode="contain" />
          </CardSurface>

          <HeroCard
            theme={activeStyle}
            missionSupport={missionSupport}
            active={activeCardId === 'what-we-do'}
            onPress={() => setHomeActiveCard('what-we-do')}
          />

          <View ref={connectSectionRef} collapsable={false}>
            <CardSurface
              theme={activeStyle}
              style={styles.sectionCard}
              backgroundColor={activeStyle.card}
              borderColor={activeStyle.borderStrong}
              borderRadius={activeStyle.radiusCard}
              shadowColor={activeStyle.shadow}
            >
              <View
                style={[
                  styles.sectionLabelCard,
                  {
                    backgroundColor: activeStyle.cardAlt,
                  borderColor: activeStyle.borderStrong,
                },
              ]}
            >
              <Text style={[styles.eyebrow, { color: activeStyle.accent }]}>Next Steps</Text>
            </View>

            <View style={styles.actionGrid}>
              {quickActions.map((item) => (
                <QuickActionCard
                  key={item.id}
                  item={item}
                  theme={activeStyle}
                  active={activeCardId === item.id}
                  onPress={() => {
                    setHomeActiveCard(item.id);
                    item.onPress();
                  }}
                />
              ))}
            </View>
          </CardSurface>

          <CardSurface
            theme={activeStyle}
            style={styles.sectionCard}
            backgroundColor={activeStyle.card}
            borderColor={activeStyle.borderStrong}
            borderRadius={activeStyle.radiusCard}
            shadowColor={activeStyle.shadow}
          >
            <View
              style={[
                styles.sectionLabelCard,
                {
                  backgroundColor: activeStyle.cardAlt,
                  borderColor: activeStyle.borderStrong,
                },
              ]}
            >
              <Text style={[styles.eyebrow, { color: activeStyle.accent }]}>Connect</Text>
            </View>

            <View style={styles.contactGrid}>
              <ContactCard
                icon="mail"
                label="Subscribe"
                value="Receive weekly posts on Substack"
                theme={activeStyle}
                active={activeCardId === 'subscribe'}
                onPress={() => {
                  setHomeActiveCard('subscribe');
                  void openUrl(blogSubscribeUrl, 'Subscribe');
                }}
              />
              {whatsappUrl ? (
                <ContactCard
                  icon="whatsapp"
                  label="WhatsApp"
                  value="Start a conversation"
                  theme={activeStyle}
                  active={activeCardId === 'whatsapp'}
                  onPress={() => {
                    setHomeActiveCard('whatsapp');
                    void openWhatsAppUrl(whatsappUrl);
                  }}
                />
              ) : null}
            </View>

              <View style={styles.contactSingleRow}>
                <ContactCard
                  icon="share-nodes"
                  label="Follow Us"
                  value="Social channels"
                theme={activeStyle}
                active={activeCardId === 'follow'}
                onPress={() => {
                  setHomeActiveCard('follow');
                  setSheetOpen(true);
                }}
                />
              </View>
            </CardSurface>
          </View>

          <PageSlogan inverse />

          <View style={styles.footerLegal}>
            <View style={styles.footerRule} />
            <View style={styles.legalLinksRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                onPress={() => router.push('/privacy')}
              >
                <Text style={styles.legalLink}>POPIA Notice</Text>
              </TouchableOpacity>
              <Text style={styles.legalDivider}>•</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                onPress={() => void openUrl(CANONICAL_PRIVACY_URL, 'Privacy Policy')}
              >
                <Text style={styles.legalLink}>Privacy Policy</Text>
              </TouchableOpacity>
              <Text style={styles.legalDivider}>•</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                onPress={() => void openUrl(CANONICAL_TERMS_URL, 'Terms')}
              >
                <Text style={styles.legalLink}>Terms</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.versionText}>{versionLabel}</Text>
          </View>
        </View>
      </ScrollView>

      <Modal visible={sheetOpen} animationType="slide" transparent onRequestClose={() => setSheetOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setSheetOpen(false)}>
          <View style={[styles.modalBackdrop, { backgroundColor: activeStyle.backdrop }]} />
        </TouchableWithoutFeedback>

        <View
          style={[
            styles.sheet,
            {
              backgroundColor: activeStyle.modalSurface,
              borderTopColor: activeStyle.border,
            },
          ]}
        >
          <View style={[styles.sheetHandle, { backgroundColor: activeStyle.borderStrong }]} />
          <Text style={[styles.sheetTitle, { color: activeStyle.textPrimary }]}>Follow The Life Place</Text>
          <Text style={[styles.sheetCopy, { color: activeStyle.textSecondary }]}>
            Stay connected across the church's public channels from one place.
          </Text>

          <View style={styles.socialGrid}>
            {socialLinks.map((item) => (
              <CardSurface
                key={item.label}
                theme={activeStyle}
                style={styles.socialCard}
                backgroundColor={activeStyle.cardAlt}
                borderColor={activeStyle.borderStrong}
                borderRadius={22}
                onPress={() => {
                  setSheetOpen(false);
                  void openUrl(item.url, item.label);
                }}
              >
                <View
                  style={[
                    styles.socialCircle,
                    {
                      backgroundColor: activeStyle.accent,
                    },
                  ]}
                >
                  <AppIcon name={item.icon} size={20} color={activeStyle.textInverse} />
                </View>
                <Text style={[styles.socialLabel, { color: activeStyle.textPrimary }]}>{item.label}</Text>
              </CardSurface>
            ))}
          </View>

          <Pressable
            style={[
              styles.closeButton,
              {
                backgroundColor: activeStyle.secondaryButtonBg,
                borderColor: activeStyle.border,
              },
            ]}
            onPress={() => setSheetOpen(false)}
          >
            <Text style={[styles.closeButtonText, { color: activeStyle.secondaryButtonText }]}>Close</Text>
          </Pressable>
        </View>
      </Modal>

      {Platform.OS === 'ios' && whatsAppModalVisible && (
        <Pressable
          style={styles.waModalBackdrop}
          onPress={() => setWhatsAppModalVisible(false)}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.waModalCard,
                {
                  position: 'absolute',
                  left: PAGE_PADDING,
                  right: PAGE_PADDING,
                  top: waAnchorTop ?? 200,
                  backgroundColor: activeStyle.card,
                  borderColor: activeStyle.borderStrong,
                  shadowColor: activeStyle.shadow,
                  transform: [
                    {
                      translateY: waSheetAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-12, 0],
                      }),
                    },
                  ],
                  opacity: waSheetAnim,
                },
              ]}
            >
              <Text style={[styles.waModalBody, { color: activeStyle.textSecondary }]}>
                Copy the number and paste it in WhatsApp.
              </Text>
              <TouchableOpacity
                style={[
                  styles.waModalAction,
                  {
                    backgroundColor: activeStyle.accent,
                    shadowColor: activeStyle.shadow,
                  },
                ]}
                onPress={async () => {
                  try {
                    const Clipboard = await import('expo-clipboard');
                    await Clipboard.setStringAsync('27765639460');
                  } catch {
                    // ignore
                  } finally {
                    Animated.timing(waSheetAnim, {
                      toValue: 0,
                      duration: 180,
                      easing: Easing.in(Easing.quad),
                      useNativeDriver: true,
                    }).start(() => setWhatsAppModalVisible(false));
                  }
                }}
                accessibilityRole="button"
                accessibilityLabel="Copy WhatsApp number"
                activeOpacity={0.9}
              >
                  <Text style={styles.waModalActionText}>Copy</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Pressable>
      )}
    </View>
  );
}

function LightingToggleButton({
  icon,
  active,
  accessibilityLabel,
  onPress,
}: {
  icon: AppIconName;
  active: boolean;
  accessibilityLabel: string;
  onPress: () => void;
}) {
  const iconColor = active ? '#B3282D' : 'rgba(243,199,202,0.76)';

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.lightingToggleButton,
        {
          opacity: active ? 1 : 0.82,
          transform: [{ scale: active ? 1 : 0.94 }],
          zIndex: active ? 2 : 1,
        },
      ]}
    >
      <AppIcon name={icon} size={24} color={iconColor} />
    </TouchableOpacity>
  );
}

function CardSurface({
  children,
  theme,
  style,
  backgroundColor,
  borderColor,
  borderRadius,
  shadowColor,
  onPress,
  active = false,
  disableInteractiveOutline = false,
}: CardSurfaceProps) {
  return (
    <Pressable
      onPress={onPress}
      style={(state) => {
        const isHovered = 'hovered' in state && Boolean((state as { hovered?: boolean }).hovered);
        const isActive = disableInteractiveOutline ? false : active || isHovered || state.pressed;

        return [
          style,
          {
            backgroundColor,
            borderColor: isActive ? theme.accent : borderColor,
            borderRadius,
            shadowColor: shadowColor ?? theme.shadow,
          },
          isHovered && !disableInteractiveOutline ? styles.cardHoverOutline : null,
          state.pressed && !disableInteractiveOutline ? styles.cardPressed : null,
        ];
      }}
    >
      {children}
    </Pressable>
  );
}

function HeroCard({
  theme,
  missionSupport,
  active,
  onPress,
}: {
  theme: HomeStyle;
  missionSupport: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <CardSurface
      theme={theme}
      active={active}
      onPress={onPress}
      style={styles.heroShell}
      backgroundColor="transparent"
      borderColor={theme.borderStrong}
      borderRadius={theme.radiusHero}
      shadowColor={theme.shadow}
    >
      <LinearGradient colors={theme.heroGradient} style={StyleSheet.absoluteFill} />

      <View style={styles.heroCopyColumn}>
        <View
          style={[
            styles.heroKicker,
            {
              backgroundColor: theme.accentSoft,
              borderColor: theme.borderStrong,
            },
          ]}
        >
          <Text style={[styles.heroKickerText, { color: theme.accent }]}>
            The Life Place
          </Text>
        </View>

        <Text
          style={[
            styles.heroTitle,
            {
              color: theme.textPrimary,
              textShadowColor: theme.textPrimary,
              textAlign: 'center',
            },
          ]}
        >
          WHAT WE DO
        </Text>

        <Text
          style={[
            styles.heroSubtitle,
            {
              color: theme.textSecondary,
              textAlign: 'center',
            },
          ]}
        >
          {missionSupport}
        </Text>
      </View>
    </CardSurface>
  );
}

function QuickActionCard({
  item,
  theme,
  active,
  onPress,
}: {
  item: QuickActionItem;
  theme: HomeStyle;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <CardSurface
      theme={theme}
      onPress={onPress}
      active={active}
      style={[styles.actionCard, styles.actionCardNarrow]}
      backgroundColor={theme.card}
      borderColor={theme.borderStrong}
      borderRadius={theme.radiusCard}
      shadowColor={theme.shadow}
    >
      <View
        style={[
          styles.actionIconWrap,
          {
            backgroundColor: theme.accentSoft,
            borderColor: theme.borderStrong,
          },
        ]}
      >
        <AppIcon name={item.icon} size={22} color={theme.accent} />
      </View>
      <Text style={[styles.actionTitle, { color: theme.textPrimary }]}>{item.title}</Text>
      <Text style={[styles.actionDescription, { color: theme.textSecondary }]}>{item.description}</Text>
    </CardSurface>
  );
}

function ContactCard({
  icon,
  label,
  value,
  theme,
  onPress,
  active = false,
}: {
  icon: AppIconName;
  label: string;
  value: string;
  theme: HomeStyle;
  onPress?: () => void;
  active?: boolean;
}) {
  return (
    <CardSurface
      theme={theme}
      onPress={onPress}
      active={active}
      style={styles.contactCard}
      backgroundColor={theme.cardAlt}
      borderColor={theme.borderStrong}
      borderRadius={theme.radiusCard - 8}
    >
      <View
        style={[
          styles.contactIconWrap,
          {
            backgroundColor: theme.accentSoft,
          },
        ]}
      >
        <AppIcon name={icon} size={20} color={theme.accent} />
      </View>
      <Text style={[styles.contactLabel, { color: theme.textPrimary }]}>
        {label}
      </Text>
      <Text
        style={[styles.contactValue, { color: theme.textSecondary }]}
        numberOfLines={2}
      >
        {value}
      </Text>
    </CardSurface>
  );
}

function BackgroundDecor({ theme }: { theme: HomeStyle }) {
  return (
    <>
      <View style={[styles.orbLarge, { backgroundColor: theme.orbTop }]} />
      <View style={[styles.orbMedium, { backgroundColor: theme.orbMiddle }]} />
      <View style={[styles.orbSmall, { backgroundColor: theme.orbBottom }]} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: PAGE_PADDING,
    gap: 18,
  },
  lightingToggleRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginLeft: 2,
    gap: 2,
  },
  lightingToggleButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labCard: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  eyebrow: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
  },
  sectionLabelCard: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  welcomeBlockText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    lineHeight: 30,
    letterSpacing: 3.6,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  labTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    lineHeight: 28,
  },
  labSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  logoImage: {
    width: 82,
    height: 82,
  },
  styleRail: {
    flexDirection: 'row',
    gap: 10,
  },
  stylePill: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 22,
    borderWidth: 1,
    gap: 3,
  },
  stylePillLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  stylePillMeta: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  heroShell: {
    overflow: 'hidden',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 20,
    minHeight: 260,
    shadowOpacity: 0.12,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 6,
  },
  heroCopyColumn: {
    gap: 20,
  },
  heroKicker: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  heroKickerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: SECTION_HEADER_TITLE_SIZE,
    lineHeight: 34,
    textTransform: 'uppercase',
    letterSpacing: -0.4,
    textShadowOffset: { width: 0.5, height: 0 },
    textShadowRadius: 0,
  },
  heroSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    lineHeight: 28,
  },
  heroStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    padding: 14,
    borderWidth: 1,
    gap: 6,
  },
  statLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  statValue: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    lineHeight: 20,
  },
  heroVisual: {
    minHeight: 260,
    padding: 16,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  heroVisualPill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heroVisualPillText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  heroQuoteWrap: {
    gap: 10,
  },
  heroQuote: {
    maxWidth: 280,
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    lineHeight: 32,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    borderWidth: 1,
    padding: 16,
    gap: 10,
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  actionCardNarrow: {
    width: '48%',
    minHeight: 186,
  },
  actionIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    lineHeight: 22,
  },
  actionDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionCard: {
    borderWidth: 1,
    padding: 18,
    gap: 16,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  contactSingleRow: {
    alignItems: 'flex-start',
  },
  contactCard: {
    width: '48%',
    minHeight: 144,
    padding: 14,
    borderWidth: 1,
    gap: 10,
  },
  contactIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  contactValue: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  footerLegal: {
    paddingTop: 8,
    paddingBottom: 6,
    alignItems: 'center',
  },
  footerRule: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginBottom: 14,
  },
  legalLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  legalLink: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    lineHeight: 18,
    color: '#F3F4F6',
    textDecorationLine: 'underline',
  },
  legalDivider: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.55)',
  },
  versionText: {
    marginTop: 10,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  waModalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    paddingTop: 180,
    paddingHorizontal: PAGE_PADDING,
  },
  waModalCard: {
    width: '100%',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  waModalBody: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 14,
    paddingRight: 0,
  },
  waModalAction: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    alignSelf: 'center',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  waModalActionText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#fff',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 12,
  },
  sheetHandle: {
    width: 48,
    height: 5,
    borderRadius: 999,
    alignSelf: 'center',
  },
  sheetTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    textAlign: 'center',
  },
  sheetCopy: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  socialCard: {
    width: '47%',
    borderWidth: 1,
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 10,
  },
  socialCircle: {
    width: SOCIAL_ICON_SIZE,
    height: SOCIAL_ICON_SIZE,
    borderRadius: SOCIAL_ICON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  closeButton: {
    marginTop: 4,
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardHoverOutline: {
    shadowOpacity: 0.16,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 8,
  },
  cardPressed: {
    opacity: 0.96,
  },
  orbLarge: {
    position: 'absolute',
    top: -110,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  orbMedium: {
    position: 'absolute',
    top: 260,
    left: -70,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  orbSmall: {
    position: 'absolute',
    bottom: 120,
    right: 10,
    width: 160,
    height: 160,
    borderRadius: 80,
  },
});
