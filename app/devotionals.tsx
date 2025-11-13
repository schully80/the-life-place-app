// app/devotionals.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  brand: '#B3282D',
  ink: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  card: '#FFFFFF',
  bg: '#FFFFFF',
};

type Devotion = {
  title: string;
  scripture: string;
  body: string[];
  prayer?: string;
  action?: string;
  reference?: string;
};

const DEVOTIONS: Devotion[] = [
  {
    title: 'Come. See. Jesus',
    scripture: 'John 1:39',
    body: [
      'When Jesus says, “Come and you will see,” He invites us into more than information—He offers Himself.',
      'Today, receive His welcome. Let your heart rest in the One who knows you fully and loves you completely.',
    ],
    prayer: 'Jesus, draw me to Yourself today. Let me see You as You are—true, good, beautiful, and kind.',
    action: 'Pause for two minutes. Breathe slowly. Whisper: “Jesus, I come to You.”',
    reference: 'ESV',
  },
  {
    title: 'Grace for the Guilty',
    scripture: 'Romans 5:8',
    body: [
      'Grace is not a reward for the worthy; it is the gift of God to the unworthy.',
      'Your failures do not disqualify you—His finished work qualifies you.',
    ],
    prayer: 'Thank You, Jesus, for loving me first. Teach me to live from Your grace, not for it.',
    action: 'Write one sentence: “In Christ, I am…” and complete it with truth from Scripture.',
  },
  {
    title: 'Strength in Weakness',
    scripture: '2 Corinthians 12:9',
    body: [
      'Weakness isn’t the end of your story—His power is made perfect there.',
      'Boast in Christ, not in your strength.',
    ],
    prayer: 'Lord, be strong in my weakness. I choose to rely on You.',
    action: 'Identify one burden today and consciously hand it to Jesus in prayer.',
  },
];

export default function Devotionals() {
  // Pick “today’s” devotion deterministically by day-of-month
  const todayIndex = useMemo(() => {
    const d = new Date().getDate();
    return (d - 1) % DEVOTIONS.length;
  }, []);

  const [index, setIndex] = useState<number>(todayIndex);
  const devo = DEVOTIONS[index];

  const onPrev = () => setIndex((i) => (i - 1 + DEVOTIONS.length) % DEVOTIONS.length);
  const onNext = () => setIndex((i) => (i + 1) % DEVOTIONS.length);

  const onShare = async () => {
    try {
      const text = [
        `“${devo.title}” — ${devo.scripture}`,
        ...devo.body,
        devo.prayer ? `\nPrayer: ${devo.prayer}` : '',
        devo.action ? `\nToday: ${devo.action}` : '',
        '\n— The Life Place',
      ]
        .filter(Boolean)
        .join('\n\n');

      await Share.share({ message: text });
    } catch {}
  };

  const prettyDate = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Devotion of the Day' }} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header strip */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.date}>{prettyDate}</Text>
            <Text style={styles.title}>{devo.title}</Text>
          </View>

          <TouchableOpacity onPress={onShare} style={styles.iconBtn} accessibilityLabel="Share devotion">
            <Ionicons name="share-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Scripture card */}
        <View style={styles.card}>
          <Text style={styles.scriptureRef}>{devo.scripture}{devo.reference ? ` • ${devo.reference}` : ''}</Text>
        </View>

        {/* Body */}
        <View style={styles.card}>
          {devo.body.map((p, i) => (
            <Text key={i} style={styles.bodyText}>{p}</Text>
          ))}

          {devo.prayer ? (
            <>
              <View style={styles.rule} />
              <Text style={styles.sectionLabel}>Prayer</Text>
              <Text style={styles.bodyText}>{devo.prayer}</Text>
            </>
          ) : null}

          {devo.action ? (
            <>
              <View style={styles.rule} />
              <Text style={styles.sectionLabel}>Today</Text>
              <Text style={styles.bodyText}>{devo.action}</Text>
            </>
          ) : null}
        </View>

        {/* Pager */}
        <View style={styles.pager}>
          <TouchableOpacity onPress={onPrev} style={[styles.pillBtn, styles.pillLeft]} accessibilityLabel="Previous devotion">
            <Ionicons name="chevron-back" size={18} color={COLORS.brand} />
            <Text style={styles.pillText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onNext} style={[styles.pillBtn, styles.pillRight]} accessibilityLabel="Next devotion">
            <Text style={styles.pillText}>Next</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.brand} />
          </TouchableOpacity>
        </View>

        {/* Footnote */}
        <Text style={styles.footnote}>Come. See. Jesus</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 36,
    gap: 12,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  date: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: COLORS.muted,
  },
  title: {
    marginTop: 2,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    color: COLORS.ink,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  scriptureRef: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: COLORS.brand,
    textAlign: 'center',
  },

  bodyText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.ink,
    marginBottom: 10,
  },

  sectionLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    color: COLORS.muted,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  rule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },

  pager: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    borderRadius: 999,
    backgroundColor: '#fff',
  },
  pillLeft: {},
  pillRight: {},
  pillText: {
    color: COLORS.brand,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },

  footnote: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORS.muted,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
});
