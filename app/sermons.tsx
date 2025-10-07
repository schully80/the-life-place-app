import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { g } from '~/lib/styles';
import { config } from '~/lib/appConfig';

type YTItem = {
  id: { videoId: string };
  snippet: { title: string; thumbnails: { medium?: { url: string }, high?: { url: string } } };
};

export default function Sermons() {
  const [items, setItems] = useState<YTItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (!config.youtubeApiKey || !config.youtubeChannelId) {
          setError('YouTube not configured yet.');
          setLoading(false);
          return;
        }
        const qs = new URLSearchParams({
          key: config.youtubeApiKey,
          channelId: config.youtubeChannelId,
          part: 'snippet',
          order: 'date',
          maxResults: '15',
          type: 'video'
        });
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${qs.toString()}`);
        const data = await res.json();
        if (data?.error) throw new Error(data.error?.message || 'YouTube API error');
        setItems(data.items || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load sermons');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={g.screen}>
      <Text style={g.h1}>Sermons</Text>
      {loading && <ActivityIndicator />}
      {error && <Text style={g.p}>Error: {error}</Text>}
      {!loading && !error && (
        <FlatList
          data={items}
          keyExtractor={(i, idx) => i.id?.videoId || String(idx)}
          renderItem={({ item }) => {
            const vid = item.id?.videoId;
            const thumb = item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url;
            return (
              <TouchableOpacity onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${vid}`)}>
                <View style={g.card}>
                  {thumb ? <Image source={{ uri: thumb }} style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 8 }} /> : null}
                  <Text style={g.p}>{item.snippet?.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}
