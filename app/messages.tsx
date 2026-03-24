import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fetchMessages, getMessageWatchUrl, MessageItem } from '~/lib/contentApi';
import { useBootstrap } from '~/hooks/useBootstrap';
import PageSlogan from '~/components/PageSlogan';

export default function Messages() {
  const { data: bootstrap, loading: bootstrapLoading, error: bootstrapError } = useBootstrap();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEnabled = bootstrap?.features.messagesEnabled ?? false;

  useEffect(() => {
    if (bootstrapLoading) {
      return;
    }

    if (bootstrapError || !messagesEnabled) {
      setMessages([]);
      setError(null);
      setLoading(false);
      return;
    }

    let active = true;

    (async () => {
      try {
        const items = await fetchMessages();
        if (!active) return;
        setMessages(items);
        setError(null);
      } catch (err: any) {
        if (!active) return;
        setError(err?.message || 'Failed to load messages');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [bootstrapError, bootstrapLoading, messagesEnabled]);

  if (bootstrapLoading || loading) {
    return (
      <View style={styles.stateWrap}>
        <ActivityIndicator size="large" color="#B3282D" />
        <Text style={styles.stateText}>Loading messages…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateTitle}>Messages unavailable</Text>
        <Text style={styles.stateText}>{error}</Text>
      </View>
    );
  }

  if (!messagesEnabled) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateTitle}>Messages hidden</Text>
        <Text style={styles.stateText}>
          This page is currently silenced in the app and can be re-enabled when you are ready.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Messages</Text>
          <Text style={styles.heading}>LATEST{'\n'}MESSAGES</Text>
          <Text style={styles.subheading}>
            Teaching and sermons from The Life Place, shaped around seeing Jesus clearly.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.88}
          style={styles.card}
          onPress={() => {
            const watchUrl = getMessageWatchUrl(item);
            if (watchUrl) Linking.openURL(watchUrl);
          }}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.image} resizeMode="cover" />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>
            {item.preacher} • {new Date(item.date).toLocaleDateString()}
          </Text>
          {item.description ? (
            <Text numberOfLines={3} style={styles.description}>
              {item.description}
            </Text>
          ) : null}
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View style={styles.stateWrap}>
          <Text style={styles.stateText}>No messages are available yet.</Text>
        </View>
      }
      ListFooterComponent={<PageSlogan />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 22,
    gap: 14,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingBottom: 18,
    alignItems: 'center',
  },
  eyebrow: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
  },
  heading: {
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: 36,
    lineHeight: 38,
    color: '#111827',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subheading: {
    marginTop: 10,
    maxWidth: 320,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 23,
    color: '#6B7280',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
  },
  image: {
    width: '100%',
    height: 190,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  title: {
    marginTop: 12,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  meta: {
    marginTop: 6,
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: '#6B7280',
  },
  description: {
    marginTop: 8,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
  },
  stateWrap: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  stateTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  stateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
