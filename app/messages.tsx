// app/messages.tsx
import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { g } from '~/lib/styles';
import { config } from '~/lib/appConfig';

type YTItem = {
  id: { videoId?: string } | string;
  snippet: {
    title: string;
    thumbnails: { medium?: { url: string }; high?: { url: string } };
  };
};

function MessagesPlaceholder() {
  const channelUrl = config.youtubeChannelId
    ? `https://www.youtube.com/channel/${config.youtubeChannelId}`
    : 'https://www.youtube.com';

  return (
    <View style={[g.card, { alignItems: 'center' }]}>
      <Ionicons name="albums-outline" size={36} color="#B3282D" />
      <Text style={[g.h2, { marginTop: 8 }]}>Messages coming soon</Text>
      <Text style={[g.p, { textAlign: 'center', marginTop: 6 }]}>
        We’re getting our latest messages ready. Check back shortly.
      </Text>

      {/* ⬇️ Icon-only, round, clickable YouTube button */}
      <TouchableOpacity
        onPress={() => Linking.openURL(channelUrl)}
        accessibilityRole="button"
        accessibilityLabel="Visit our YouTube channel"
        style={{
          marginTop: 12,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#B3282D',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
        }}
        activeOpacity={0.85}
      >
        <Ionicons name="logo-youtube" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

export default function Sermons() {
  const [items, setItems] = useState<YTItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Hide YouTube errors and show a clean placeholder when not configured
  const hasYouTube = Boolean(config.youtubeApiKey && config.youtubeChannelId);

  useEffect(() => {
    let mounted = true;

    if (!hasYouTube) {
      setItems([]);
      setLoading(false);
      return () => {
        mounted = false;
      };
    }

    (async () => {
      try {
        setLoading(true);
        const qs = new URLSearchParams({
          key: String(config.youtubeApiKey),
          channelId: String(config.youtubeChannelId),
          part: 'snippet',
          order: 'date',
          maxResults: '15',
          type: 'video',
        });
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${qs.toString()}`);
        const data = await res.json();
        if (!mounted) return;
        setItems(data?.items || []);
      } catch {
        if (!mounted) return;
        // Swallow errors during capture — show empty state instead of an error
        setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [hasYouTube]);

  return (
    <View style={g.screen}>

      {!hasYouTube ? (
        <MessagesPlaceholder />
      ) : (
        <>
          {loading && <ActivityIndicator />}

          {!loading && items.length === 0 && (
            <View style={[g.card, { alignItems: 'center' }]}>
              <Text style={[g.p, { textAlign: 'center', marginTop: 6 }]}>
                New messages will appear here soon.
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    config.youtubeChannelId
                      ? `https://www.youtube.com/channel/${config.youtubeChannelId}`
                      : 'https://www.youtube.com'
                  )
                }
                accessibilityRole="button"
                accessibilityLabel="Visit our YouTube channel"
                style={{
                  marginTop: 12,
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#B3282D',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                activeOpacity={0.85}
              >
                <Ionicons name="logo-youtube" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}

          {!loading && items.length > 0 && (
            <FlatList
              data={items}
              keyExtractor={(i, idx) =>
                typeof i.id === 'string' ? i.id : i.id?.videoId || String(idx)
              }
              renderItem={({ item }) => {
                const vid = typeof item.id === 'string' ? item.id : item.id?.videoId;
                const thumb =
                  item.snippet?.thumbnails?.high?.url ||
                  item.snippet?.thumbnails?.medium?.url;

                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (vid) Linking.openURL(`https://www.youtube.com/watch?v=${vid}`);
                    }}
                  >
                    <View style={g.card}>
                      {thumb ? (
                        <Image
                          source={{ uri: thumb }}
                          style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 8 }}
                        />
                      ) : null}
                      <Text style={g.p}>{item.snippet?.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </>
      )}
    </View>
  );
}
