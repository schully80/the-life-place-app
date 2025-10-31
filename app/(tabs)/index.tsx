// app/(tabs)/index.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

type YTItem = {
  id: { videoId?: string } | string;
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: { medium?: { url: string }; high?: { url: string } };
  };
};

export default function Home() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const EXTRA_HEADER_OFFSET = 8;

  const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } =
    (Constants.expoConfig?.extra as any) ?? {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videos, setVideos] = useState<YTItem[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
          throw new Error('Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID in app.json → extra');
        }

        const url =
          `https://www.googleapis.com/youtube/v3/search` +
          `?part=snippet&channelId=${encodeURIComponent(YOUTUBE_CHANNEL_ID)}` +
          `&maxResults=12&order=date&type=video&key=${encodeURIComponent(YOUTUBE_API_KEY)}`;

        const res = await fetch(url);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || 'YouTube API error');

        if (mounted) setVideos(json.items || []);
      } catch (e: any) {
        if (mounted) setError(e?.message || 'Failed to load messages');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID]);

  // 2-column card sizing
  const CARD_GAP = 12;
  const H_PADDING = 24;
  const cardWidth = useMemo(() => {
    const screenW = Dimensions.get('window').width;
    return (screenW - H_PADDING * 2 - CARD_GAP) / 2;
  }, []);

  const openVideo = (item: YTItem) => {
    const videoId = typeof item.id === 'string' ? item.id : item.id?.videoId || '';
    router.push({ pathname: '/messages', params: { video: videoId } });
  };

  return (
    <ImageBackground
      source={require('../../assets/sandton-skyline.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* ✅ Full-width white header (logo only) */}
        <View style={[styles.headerWrap, { paddingTop: insets.top + EXTRA_HEADER_OFFSET}]}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Page body */}
        <View style={styles.body}>
     
          {/* 📺 Latest Messages */}
          <Text style={styles.sectionTitle}>FEATURED</Text>

          {loading ? (
            <View style={styles.stateWrap}>
              <ActivityIndicator size="large" color="#B3282D" />
              <Text style={styles.stateText}>Loading sermons…</Text>
            </View>
          ) : error ? (
            <View style={styles.stateWrap}>
              <Ionicons name="warning-outline" size={20} color="#B3282D" />
              <Text style={styles.stateText}>{error}</Text>
            </View>
          ) : videos.length === 0 ? (
            <View style={styles.stateWrap}>
              <Ionicons name="albums-outline" size={20} color="#6B7280" />
              <Text style={styles.stateText}>No messages yet.</Text>
            </View>
          ) : (
            <View style={{ gap: CARD_GAP }}>
              {/* manual 2-column layout to keep your ScrollView */}
              <View style={{ flexDirection: 'row', gap: CARD_GAP, marginBottom: CARD_GAP }}>
                {videos.slice(0, 2).map((item, i) => {
                  const thumb =
                    item.snippet.thumbnails.high?.url ||
                    item.snippet.thumbnails.medium?.url ||
                    '';
                  return (
                    <TouchableOpacity
                      key={`v0-${i}`}
                      onPress={() => openVideo(item)}
                      activeOpacity={0.85}
                      style={[styles.card, { width: cardWidth }]}
                    >
                      <Image source={{ uri: thumb }} style={styles.cardImage} resizeMode="cover" />
                      <Text numberOfLines={2} style={styles.cardTitle}>{item.snippet.title}</Text>
                      <View style={styles.cardMeta}>
                        <Ionicons name="time-outline" size={14} color="#6B7280" />
                        <Text style={styles.cardMetaText}>
                          {new Date(item.snippet.publishedAt).toLocaleDateString()}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* render the rest in rows of two */}
              {Array.from({ length: Math.ceil((videos.length - 2) / 2) }).map((_, rowIdx) => {
                const start = 2 + rowIdx * 2;
                const row = videos.slice(start, start + 2);
                return (
                  <View key={`row-${rowIdx}`} style={{ flexDirection: 'row', gap: CARD_GAP }}>
                    {row.map((item, i) => {
                      const thumb =
                        item.snippet.thumbnails.high?.url ||
                        item.snippet.thumbnails.medium?.url ||
                        '';
                      return (
                        <TouchableOpacity
                          key={`v${start}-${i}`}
                          onPress={() => openVideo(item)}
                          activeOpacity={0.85}
                          style={[styles.card, { width: cardWidth }]}
                        >
                          <Image source={{ uri: thumb }} style={styles.cardImage} resizeMode="cover" />
                          <Text numberOfLines={2} style={styles.cardTitle}>{item.snippet.title}</Text>
                          <View style={styles.cardMeta}>
                            <Ionicons name="time-outline" size={14} color="#6B7280" />
                            <Text style={styles.cardMetaText}>
                              {new Date(item.snippet.publishedAt).toLocaleDateString()}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                    {row.length === 1 && <View style={{ width: cardWidth }} />}
                  </View>
                );
              })}
            </View>
          )}

          {/* 🌿 Feature Cards */}
          <View style={[styles.cards, { marginTop: 24 }]}>
            <Link href="/events" asChild>
              <TouchableOpacity style={styles.cardSingle}>
                <Ionicons name="calendar-outline" size={26} color="#B3282D" />
                <Text style={styles.cardText}>Events</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/devotionals" asChild>
              <TouchableOpacity style={styles.cardSingle}>
                <Ionicons name="book-outline" size={26} color="#B3282D" />
                <Text style={styles.cardText}>Devotionals</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/meet-schulter-jenny" asChild>
              <TouchableOpacity style={styles.cardSingle}>
                <Ionicons name="people-outline" size={26} color="#B3282D" />
                <Text style={styles.cardText}>Schulter & Jenny</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/blog" asChild>
              <TouchableOpacity style={styles.cardSingle}>
                <Ionicons name="newspaper-outline" size={26} color="#B3282D" />
                <Text style={styles.cardText}>Our Blog</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const PAGE_PADDING = 24;

const styles = StyleSheet.create({
  bg: { flex: 1 },

  // Full-bleed white bar (edge-to-edge)
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

  // Body
  body: { paddingHorizontal: PAGE_PADDING, paddingTop: 20 },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  quickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFFEE',
  },
  quickText: {
    fontFamily: 'Inter-SemiBold',
    color: '#B3282D',
    fontSize: 15,
  },

  // Section
sectionTitle: {
  fontFamily: 'Montserrat-SemiBold',
  fontSize: 18,
  color: '#111827',
  marginBottom: 10,

  // ⬇️ right-align
  textAlign: 'right',
  alignSelf: 'flex-end',
  // If the parent uses row/center layouts and it still won’t budge:
  // width: '100%',
},


  // Message cards (grid)
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  cardImage: {
    width: '100%',
    height: 110,
    backgroundColor: '#F3F4F6',
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    paddingHorizontal: 10,
    paddingTop: 10,
    minHeight: 44,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  cardMetaText: {
    fontSize: 12,
    color: '#6B7280',
  },

  // Feature cards (single-column)
  cards: { flexDirection: 'column', gap: 16 },
  cardSingle: {
    backgroundColor: '#FFFFFFEE',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginTop: 8,
  },

  // States
  stateWrap: { alignItems: 'center', gap: 8, paddingVertical: 16 },
  stateText: { color: '#6B7280' },
});
