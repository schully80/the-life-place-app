import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlogItem, fetchBlogFeed } from '~/lib/contentApi';
import { useBootstrap } from '~/hooks/useBootstrap';
import AppIcon from '~/components/AppIcon';
import PageSlogan from '~/components/PageSlogan';

const BRAND_RED = '#B3282D';
const INK = '#111827';
const MUTED = '#6B7280';

export default function Blog() {
  const { data: bootstrap } = useBootstrap();
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const payload = await fetchBlogFeed();
        if (!active) return;
        setItems(payload.items.slice(0, 12));
        setError(null);
      } catch (err: any) {
        if (!active) return;
        setError(err?.message || 'Failed to load blog');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const featuredItem = items[0] || null;
  const remainingItems = useMemo(() => items.slice(1), [items]);
  const blogUrl = bootstrap?.links.blogUrl || 'https://schulteretyang.substack.com';

  if (loading) {
    return (
      <View style={styles.stateWrap}>
        <ActivityIndicator size="large" color={BRAND_RED} />
        <Text style={styles.stateText}>Loading blog…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateTitle}>Blog unavailable</Text>
        <Text style={styles.stateText}>{error}</Text>
        <TouchableOpacity
          style={styles.fallbackButton}
          activeOpacity={0.88}
          onPress={() => Linking.openURL(blogUrl)}
        >
          <AppIcon name="newspaper" size={18} color="#FFFFFF" />
          <Text style={styles.fallbackButtonText}>Open Substack</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!featuredItem && items.length === 0) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateTitle}>No blog posts available</Text>
        <Text style={styles.stateText}>
          The feed is empty right now, but you can still open the full blog directly.
        </Text>
        <TouchableOpacity
          style={styles.fallbackButton}
          activeOpacity={0.88}
          onPress={() => Linking.openURL(blogUrl)}
        >
          <AppIcon name="newspaper" size={18} color="#FFFFFF" />
          <Text style={styles.fallbackButtonText}>Open Substack</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {featuredItem ? (
        <View style={styles.hero}>
          <View style={styles.heroGlowLeft} />
          <View style={styles.heroGlowRight} />

          <Text style={styles.heroEyebrow}>Latest Post</Text>
          <Text style={styles.heroTitle}>{featuredItem.title}</Text>

          {featuredItem.categories?.length ? (
            <View style={styles.heroTagRow}>
              {featuredItem.categories.slice(0, 3).map((category) => (
                <View key={category} style={styles.heroTag}>
                  <Text style={styles.heroTagText}>{category}</Text>
                </View>
              ))}
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.heroButton}
            activeOpacity={0.88}
            onPress={() => Linking.openURL(featuredItem.link)}
          >
            <Text style={styles.heroButtonText}>Read Now</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEyebrow}>Archive</Text>
        <Text style={styles.sectionTitle}>ALL BLOG POSTS</Text>
        <Text style={styles.sectionCopy}>
          Recent writing from The Life Place, opened through the app and read on Substack.
        </Text>
      </View>

      <View style={styles.cardList}>
        {(remainingItems.length ? remainingItems : items).map((item) => (
          <TouchableOpacity
            key={item.link}
            style={styles.card}
            activeOpacity={0.88}
            onPress={() => Linking.openURL(item.link)}
          >
            <View style={styles.cardTop}>
              {item.date ? (
                <View style={styles.datePill}>
                  <Text style={styles.datePillText}>{formatDate(item.date)}</Text>
                </View>
              ) : null}
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.opensOn}>Opens on Substack</Text>

            {item.categories?.length ? (
              <View style={styles.tagRow}>
                {item.categories.slice(0, 4).map((category) => (
                  <View key={category} style={styles.tagChip}>
                    <Text style={styles.tagText}>{category}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {item.excerpt ? (
              <Text numberOfLines={4} style={styles.excerpt}>
                {item.excerpt}
              </Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footerActions}>
        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.88}
          onPress={() => Linking.openURL(blogUrl)}
        >
          <AppIcon name="newspaper" size={18} color={INK} />
          <Text style={styles.secondaryButtonText}>Open Substack</Text>
        </TouchableOpacity>
      </View>

      <PageSlogan />
    </ScrollView>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 280,
    backgroundColor: '#111827',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroGlowLeft: {
    position: 'absolute',
    top: -70,
    left: -90,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(179,40,45,0.25)',
  },
  heroGlowRight: {
    position: 'absolute',
    bottom: -60,
    right: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(220,38,38,0.18)',
  },
  heroEyebrow: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    color: '#FCA5A5',
    textAlign: 'center',
  },
  heroTitle: {
    marginTop: 14,
    maxWidth: 340,
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    lineHeight: 36,
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  heroTagRow: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  heroTag: {
    borderRadius: 999,
    backgroundColor: 'rgba(179,40,45,0.82)',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  heroTagText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  heroButton: {
    marginTop: 22,
    borderRadius: 18,
    backgroundColor: BRAND_RED,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  heroButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionHeader: {
    paddingHorizontal: 22,
    paddingTop: 26,
    alignItems: 'center',
  },
  sectionEyebrow: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    color: MUTED,
    textAlign: 'center',
  },
  sectionTitle: {
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: 34,
    lineHeight: 38,
    color: INK,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  sectionCopy: {
    marginTop: 10,
    maxWidth: 320,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 23,
    color: MUTED,
    textAlign: 'center',
  },
  cardList: {
    paddingHorizontal: 22,
    paddingTop: 18,
    gap: 14,
  },
  card: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePill: {
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  datePillText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: MUTED,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 14,
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    lineHeight: 28,
    color: INK,
  },
  opensOn: {
    marginTop: 6,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: MUTED,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tagRow: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    borderRadius: 999,
    backgroundColor: 'rgba(179,40,45,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: BRAND_RED,
    textTransform: 'uppercase',
  },
  excerpt: {
    marginTop: 14,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
  },
  footerActions: {
    paddingHorizontal: 22,
    paddingTop: 22,
  },
  secondaryButton: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  secondaryButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: INK,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  stateWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  stateTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: INK,
  },
  stateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: MUTED,
    textAlign: 'center',
  },
  fallbackButton: {
    marginTop: 14,
    borderRadius: 18,
    backgroundColor: BRAND_RED,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fallbackButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
