import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { g } from '~/lib/styles';
import { config } from '~/lib/appConfig';
import { parseICS, CalendarEvent } from '~/lib/ics';

export default function Events() {
  const [events, setEvents] = useState<CalendarEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (!config.icsCalendarUrl) {
          setError('Calendar not configured yet.');
          return;
        }
        const res = await fetch(config.icsCalendarUrl);
        const text = await res.text();
        const all = parseICS(text);
        const now = new Date();
        const upcoming = all
          .filter(e => e.start >= new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1))
          .slice(0, 12);
        setEvents(upcoming);
      } catch (e: any) {
        setError(e.message || 'Failed to load events');
      }
    })();
  }, []);

  return (
    <View style={g.screen}>
      <Text style={g.h1}>Events</Text>
      {!events && !error && <ActivityIndicator />}
      {error && <Text style={g.p}>Error: {error}</Text>}
      {events && events.length === 0 && <Text style={g.p}>No upcoming events.</Text>}
      {events && events.map((evt, idx) => (
        <View key={idx} style={g.card}>
          <Text style={g.p}>{evt.summary}</Text>
          <Text style={g.p}>
            {evt.start.toDateString()}{evt.end ? ` • ${evt.end.toDateString()}` : ''}
          </Text>
          {evt.location ? <Text style={g.p}>Venue: {evt.location}</Text> : null}
          {evt.description ? <Text style={g.p}>{evt.description}</Text> : null}
        </View>
      ))}
    </View>
  );
}
