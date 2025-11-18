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

const TILE_HEIGHT = 160;
const TILE_RADIUS = 16;

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
  const hasYouTube = Boolean(YOUTUBE_API_KEY && YOUTUBE_CHANNEL_ID);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videos, setVideos] = useState<YTItem[]>([]);

  useEffect(() => {
    let mounted = true;

    // If no API creds, hide the section by skipping fetch and clearing state
    if (!hasYouTube) {
      setLoading(false);
      setError(null);
      setVideos([]);
      return () => {
        mounted = false;
      };
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);

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
  }, [hasYouTube, YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID]);

  // 2-column card sizing for messages
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
      source={require('../../assets/sandton-skyline.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* ✅ Full-width white header (logo only) */}
        <View style={[styles.headerWrap, { paddingTop: insets.top + EXTRA_HEADER_OFFSET }]}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Page body */}
        <View style={styles.body}>
          {/* 📺 Featured — HIDDEN entirely when no API key/channel */}
          {hasYouTube && (
            <>
              <Text style={styles.sectionTitle}>FEATURED</Text>

              {loading ? (
                <View style={styles.stateWrap}>
                  <ActivityIndicator size="large" color="#B3282D" />
                  <Text style={styles.stateText}>Loading sermons…</Text>
                </View>
              ) : error ? (
                // Don’t show error text during capture; render nothing
                <View />
              ) : videos.length === 0 ? (
                <View style={styles.stateWrap}>
                  <Ionicons name="albums-outline" size={20} color="#6B7280" />
                  <Text style={styles.stateText}>No messages yet.</Text>
                </View>
              ) : (
                <View style={{ gap: CARD_GAP }}>
                  {/* first row */}
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
                          <Text numberOfLines={2} style={styles.cardTitle}>
                            {item.snippet.title}
                          </Text>
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

                  {/* remaining rows */}
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
                              <Text numberOfLines={2} style={styles.cardTitle}>
                                {item.snippet.title}
                              </Text>
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
            </>
          )}

          {/* 🌿 Feature Cards (bigger but spaced, not touching) */}
          <View style={[styles.cards, { marginTop: hasYouTube ? 24 : 6 }]}>
            <Link href="/events" asChild>
              <TouchableOpacity style={styles.cardSingle}>
                <Ionicons name="calendar-outline" size={28} color="#B3282D" />
                <Text style={styles.cardText}>EVENTS</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/devotionals" asChild>
              <TouchableOpacity style={styles.cardSingle}>
                <Ionicons name="book-outline" size={28} color="#B3282D" />
                <Text style={styles.cardText}>DEVOTIONALS</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/meet-schulter-jenny" asChild>
              <TouchableOpacity style={styles.cardSingle}>
                <Ionicons name="people-outline" size={28} color="#B3282D" />
                <Text style={styles.cardText}>SCHULTER AND GENEVIEVE</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/blog" asChild>
              <TouchableOpacity style={styles.cardSingle}>
                <Ionicons name="newspaper-outline" size={28} color="#B3282D" />
                <Text style={styles.cardText}>OUR BLOG</Text>
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

  body: { paddingHorizontal: PAGE_PADDING, paddingTop: 20 },

  sectionTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 10,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: TILE_RADIUS,
    height: TILE_HEIGHT,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 14,
    width: '100%',
  },
  cardImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    paddingTop: 10,
    minHeight: 44,
    textAlign: 'center',
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  cardMetaText: {
    fontSize: 12,
    color: '#6B7280',
  },

  cards: {
    flexDirection: 'column',
    gap: 0,
  },
  cardSingle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    minHeight: 160,
    marginBottom: 18,
  },
  cardText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#111827',
    marginTop: 8,
    letterSpacing: 2.0,
  },

  stateWrap: { alignItems: 'center', gap: 8, paddingVertical: 16 },
  stateText: { color: '#6B7280' },
});
