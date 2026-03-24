import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppIcon from '~/components/AppIcon';
import PageSlogan from '~/components/PageSlogan';
import { useDevotionals } from '~/hooks/useDevotionals';
import { HOME_STYLES, type HomeStyle } from '~/lib/homeDesignStyles';

const BLOG_URL = 'https://schulteretyang.substack.com';

function formatDateLabel(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getDayOfYear(date = new Date()) {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function addDays(date: Date, delta: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + delta);
  return next;
}

export default function Devotionals() {
  const insets = useSafeAreaInsets();
  const theme = HOME_STYLES.find((style) => style.id === 'glass') ?? HOME_STYLES[0];
  const { data: devotionals, loading, error } = useDevotionals();
  const [activeDate, setActiveDate] = useState(() => new Date());
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const currentDateLabel = useMemo(() => formatDateLabel(activeDate), [activeDate]);
  const yearDevotionals = useMemo(() => {
    const activeYear = activeDate.getFullYear();
    const blogDevotionals = devotionals
      .filter((item) => {
        if (item.sourceType !== 'blog' || !item.publishedAt) return false;
        const publishedAt = new Date(item.publishedAt);
        if (Number.isNaN(publishedAt.getTime())) return false;
        return publishedAt.getFullYear() === activeYear;
      })
      .sort((left, right) => {
        const leftTime = left.publishedAt ? new Date(left.publishedAt).getTime() : 0;
        const rightTime = right.publishedAt ? new Date(right.publishedAt).getTime() : 0;
        return leftTime - rightTime;
      });

    if (blogDevotionals.length > 0) return blogDevotionals;

    return devotionals.filter((item) => item.sourceType !== 'blog');
  }, [activeDate, devotionals]);
  const activeIndex = useMemo(
    () => (yearDevotionals.length ? (getDayOfYear(activeDate) - 1) % yearDevotionals.length : 0),
    [activeDate, yearDevotionals]
  );
  const devotion = yearDevotionals[activeIndex];

  const openUrl = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      // Keep the screen quiet if the device cannot open the link.
    }
  };

  const eyebrow = devotion?.sourceType === 'blog' ? 'Daily Devotional' : 'Daily Devotional';
  const metaLine = devotion?.sourceType === 'blog'
    ? [devotion.categories?.[0]].filter(Boolean).join(' • ')
    : [devotion?.scripture, devotion?.reference].filter(Boolean).join(' • ');

  const onShare = async () => {
    if (!devotion) return;

    const text = [
      'The Life Place Devotional',
      devotion.title,
      currentDateLabel,
      metaLine,
      ...devotion.body,
      devotion.prayer,
      devotion.action,
      devotion.sourceUrl ? `Read more: ${devotion.sourceUrl}` : null,
    ]
      .filter(Boolean)
      .join('\n\n');

    await Share.share({ message: text });
  };

  return (
    <View style={styles.screen}>
      <LinearGradient colors={theme.pageGradient} style={StyleSheet.absoluteFill} />
      <BackgroundDecor theme={theme} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {loading ? (
            <StateCard
              theme={theme}
              title="Loading devotionals"
              body="Pulling in today’s reading from the devotional stream."
              loading
            />
          ) : error || !devotion ? (
            <StateCard
              theme={theme}
              title="Devotionals unavailable"
              body={
                error ||
                `No devotionals are available for ${activeDate.getFullYear()} right now.`
              }
              actionLabel="Open Blog"
              onPress={() => {
                void openUrl(BLOG_URL);
              }}
            />
          ) : (
            <>
              <View
                style={[
                  styles.heroCard,
                  {
                    borderColor: theme.heroBorder,
                    borderRadius: theme.radiusHero,
                    shadowColor: theme.shadow,
                  },
                ]}
              >
                <LinearGradient colors={theme.heroGradient} style={StyleSheet.absoluteFill} />

                <View
                  style={[
                    styles.heroKicker,
                    {
                      backgroundColor: theme.accentSoft,
                      borderColor: theme.borderStrong,
                    },
                  ]}
                >
                  <Text style={[styles.heroKickerText, { color: theme.accent }]}>{eyebrow}</Text>
                </View>

                <View style={styles.heroTopRow}>
                  <View style={styles.heroTextBlock}>
                    <Text style={[styles.heroDate, { color: theme.textSecondary }]}>
                      {currentDateLabel}
                    </Text>
                    <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>
                      {devotion.title}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => {
                      setActiveActionId('share');
                      void onShare();
                    }}
                    style={(state) => {
                      const isHovered = 'hovered' in state && Boolean((state as { hovered?: boolean }).hovered);
                      const isActive = activeActionId === 'share' || isHovered || state.pressed;

                      return [
                        styles.shareButton,
                        {
                          backgroundColor: theme.cardAlt,
                          borderColor: isActive ? theme.accent : theme.borderStrong,
                          shadowColor: theme.shadow,
                        },
                        isHovered ? styles.shareButtonHover : null,
                        state.pressed ? styles.shareButtonPressed : null,
                      ];
                    }}
                  >
                    <AppIcon name="share-nodes" size={16} color={theme.accent} />
                    <Text style={[styles.shareButtonText, { color: theme.textPrimary }]}>Share</Text>
                  </Pressable>
                </View>

                {metaLine ? (
                  <View
                    style={[
                      styles.metaCard,
                      {
                        backgroundColor: theme.cardAlt,
                        borderColor: theme.borderStrong,
                        borderRadius: theme.radiusCard - 6,
                      },
                    ]}
                  >
                    <Text style={[styles.metaText, { color: theme.accent }]}>{metaLine}</Text>
                  </View>
                ) : null}
              </View>

              <View
                style={[
                  styles.contentCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.borderStrong,
                    borderRadius: theme.radiusCard,
                    shadowColor: theme.shadow,
                  },
                ]}
              >
                {devotion.body.map((paragraph) => (
                  <Text key={paragraph} style={[styles.bodyText, { color: theme.textPrimary }]}>
                    {paragraph}
                  </Text>
                ))}

                {devotion.prayer ? (
                  <PanelCard theme={theme} label="Prayer" body={devotion.prayer} />
                ) : null}

                {devotion.action ? (
                  <PanelCard theme={theme} label="Today" body={devotion.action} accent />
                ) : null}
              </View>

              {devotion.sourceUrl ? (
                <TouchableOpacity
                  activeOpacity={0.88}
                  style={[
                    styles.primaryButton,
                    {
                      backgroundColor: theme.accent,
                      borderColor: theme.borderStrong,
                    },
                  ]}
                  onPress={() => {
                    void openUrl(devotion.sourceUrl!);
                  }}
                >
                  <Text style={[styles.primaryButtonText, { color: theme.textInverse }]}>
                    Read Devotional
                  </Text>
                </TouchableOpacity>
              ) : null}

              <View style={styles.pager}>
                <TouchableOpacity
                  activeOpacity={0.88}
                  style={[
                    styles.pagerButton,
                    {
                      backgroundColor: theme.cardAlt,
                      borderColor: theme.borderStrong,
                    },
                  ]}
                  onPress={() => setActiveDate((current) => addDays(current, -1))}
                >
                  <Text style={[styles.pagerButtonText, { color: theme.textPrimary }]}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.88}
                  style={[
                    styles.pagerButton,
                    {
                      backgroundColor: theme.cardAlt,
                      borderColor: theme.borderStrong,
                    },
                  ]}
                  onPress={() => setActiveDate((current) => addDays(current, 1))}
                >
                  <Text style={[styles.pagerButtonText, { color: theme.textPrimary }]}>Next</Text>
                </TouchableOpacity>
              </View>

              <PageSlogan inverse />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function PanelCard({
  theme,
  label,
  body,
  accent = false,
}: {
  theme: HomeStyle;
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <View
      style={[
        styles.panelCard,
        {
          backgroundColor: accent ? theme.accentSoft : theme.cardAlt,
          borderColor: accent ? theme.accentMuted : theme.borderStrong,
          borderRadius: theme.radiusCard - 8,
        },
      ]}
    >
      <Text
        style={[
          styles.panelLabel,
          {
            color: accent ? theme.accent : theme.textSecondary,
          },
        ]}
      >
        {label}
      </Text>
      <Text style={[styles.panelBody, { color: theme.textPrimary }]}>{body}</Text>
    </View>
  );
}

function StateCard({
  theme,
  title,
  body,
  actionLabel,
  onPress,
  loading = false,
}: {
  theme: HomeStyle;
  title: string;
  body: string;
  actionLabel?: string;
  onPress?: () => void;
  loading?: boolean;
}) {
  return (
    <View
      style={[
        styles.stateCard,
        {
          backgroundColor: theme.card,
          borderColor: theme.borderStrong,
          borderRadius: theme.radiusCard,
          shadowColor: theme.shadow,
        },
      ]}
    >
      {loading ? <ActivityIndicator size="large" color={theme.accent} /> : null}
      <Text style={[styles.stateTitle, { color: theme.textPrimary }]}>{title}</Text>
      <Text style={[styles.stateBody, { color: theme.textSecondary }]}>{body}</Text>
      {actionLabel && onPress ? (
        <TouchableOpacity
          activeOpacity={0.88}
          style={[
            styles.primaryButton,
            styles.stateButton,
            {
              backgroundColor: theme.accent,
              borderColor: theme.borderStrong,
            },
          ]}
          onPress={onPress}
        >
          <Text style={[styles.primaryButtonText, { color: theme.textInverse }]}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
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
    backgroundColor: '#07111F',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 20,
    gap: 24,
  },
  heroCard: {
    overflow: 'hidden',
    borderWidth: 1,
    padding: 24,
    gap: 24,
    shadowOpacity: 0.12,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 6,
  },
  heroKicker: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  heroKickerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 18,
  },
  heroTextBlock: {
    flex: 1,
    gap: 12,
  },
  heroDate: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    lineHeight: 38,
  },
  shareButton: {
    minWidth: 132,
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  shareButtonHover: {
    shadowOpacity: 0.16,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 8,
  },
  shareButtonPressed: {
    opacity: 0.96,
  },
  shareButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  metaCard: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  metaText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  contentCard: {
    borderWidth: 1,
    padding: 22,
    gap: 22,
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  bodyText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 26,
  },
  panelCard: {
    borderWidth: 1,
    padding: 18,
    gap: 12,
  },
  panelLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  panelBody: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 24,
  },
  primaryButton: {
    alignSelf: 'center',
    minHeight: 46,
    borderWidth: 1,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 14,
  },
  primaryButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  pager: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  pagerButton: {
    minHeight: 42,
    borderWidth: 1,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pagerButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  stateCard: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  stateTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    textAlign: 'center',
  },
  stateBody: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  stateButton: {
    alignSelf: 'stretch',
    marginTop: 4,
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
