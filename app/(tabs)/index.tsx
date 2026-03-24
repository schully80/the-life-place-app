import { useMemo, useState, type ReactNode } from 'react';
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppIcon, { AppIconName } from '~/components/AppIcon';
import PageSlogan from '~/components/PageSlogan';
import { useBootstrap } from '~/hooks/useBootstrap';
import {
  getCanonicalSocials,
  getCanonicalWhatsAppUrl,
  getWhatsAppAppUrl,
} from '~/lib/contentApi';
import { openExternalUrl } from '~/lib/externalLinks';
import { HOME_STYLES, HomeStyle } from '~/lib/homeDesignStyles';

const PAGE_PADDING = 20;
const SOCIAL_ICON_SIZE = 54;
const SECTION_HEADER_TITLE_SIZE = 30;
const LOGO_IMAGE = require('../../assets/logo.png');

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
  const { data: bootstrap } = useBootstrap();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(lastActiveHomeCardId);
  const activeStyle = HOME_STYLES.find((style) => style.id === 'glass') ?? HOME_STYLES[0];

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

  const openWhatsAppUrl = async (url?: string) => {
    const webUrl = getCanonicalWhatsAppUrl(url);
    const appUrl = getWhatsAppAppUrl(url);

    try {
      await Linking.openURL(appUrl);
    } catch {
      await openUrl(webUrl, 'WhatsApp');
    }
  };

  const blogUrl = bootstrap?.links.blogUrl || 'https://schulteretyang.substack.com';
  const blogSubscribeUrl = `${blogUrl.replace(/\/+$/, '')}/subscribe`;
  const whatsappUrl = getCanonicalWhatsAppUrl(bootstrap?.contact.whatsapp);

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

          <PageSlogan inverse />
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
    </View>
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
  labCard: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
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
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
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
