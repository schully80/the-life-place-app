import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { EventItem, fetchEvents } from '~/lib/contentApi';

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const items = await fetchEvents();
        if (!active) return;
        setEvents(items);
        setError(null);
      } catch (err: any) {
        if (!active) return;
        setError(err?.message || 'Failed to load events');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.stateWrap}>
        <ActivityIndicator size="large" color="#B3282D" />
        <Text style={styles.stateText}>Loading events…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateTitle}>Events unavailable</Text>
        <Text style={styles.stateText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events.map((event) => (
        <View key={event.id} style={styles.card}>
          <Text style={styles.date}>
            {new Date(event.start).toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
          <Text style={styles.title}>{event.summary}</Text>
          <Text style={styles.meta}>
            {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            {event.end
              ? ` - ${new Date(event.end).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`
              : ''}
          </Text>
          {event.location ? <Text style={styles.copy}>{event.location}</Text> : null}
          {event.description ? <Text style={styles.copy}>{event.description}</Text> : null}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
    gap: 14,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    gap: 6,
  },
  date: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    color: '#B3282D',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: '#111827',
  },
  meta: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  copy: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
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
    color: '#111827',
  },
  stateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
