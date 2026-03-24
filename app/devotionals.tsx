import { Share, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useBootstrap } from '~/hooks/useBootstrap';
import AppIcon from '~/components/AppIcon';

export default function Devotionals() {
  const { data, loading, error } = useBootstrap();
  const devotionals = data?.devotionals || [];
  const todayIndex = useMemo(
    () => (devotionals.length ? (new Date().getDate() - 1) % devotionals.length : 0),
    [devotionals.length]
  );
  const [index, setIndex] = useState(0);
  const activeIndex = devotionals.length ? (index || todayIndex) % devotionals.length : 0;
  const devotion = devotionals[activeIndex];

  if (loading) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateText}>Loading devotionals…</Text>
      </View>
    );
  }

  if (error || !devotion) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateTitle}>Devotionals unavailable</Text>
        <Text style={styles.stateText}>{error || 'No devotionals are available right now.'}</Text>
      </View>
    );
  }

  const onShare = async () => {
    const text = [devotion.title, devotion.scripture, ...devotion.body, devotion.prayer, devotion.action]
      .filter(Boolean)
      .join('\n\n');
    await Share.share({ message: text });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>Daily Devotional</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
          <Text style={styles.title}>{devotion.title}</Text>
        </View>
        <TouchableOpacity onPress={onShare} style={styles.iconBtn}>
          <AppIcon name="share-nodes" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.scripture}>
          {devotion.scripture}
          {devotion.reference ? ` • ${devotion.reference}` : ''}
        </Text>
      </View>

      <View style={styles.card}>
        {devotion.body.map((paragraph) => (
          <Text key={paragraph} style={styles.bodyText}>
            {paragraph}
          </Text>
        ))}

        {devotion.prayer ? (
          <>
            <Text style={styles.sectionLabel}>Prayer</Text>
            <Text style={styles.bodyText}>{devotion.prayer}</Text>
          </>
        ) : null}

        {devotion.action ? (
          <>
            <Text style={styles.sectionLabel}>Today</Text>
            <Text style={styles.bodyText}>{devotion.action}</Text>
          </>
        ) : null}
      </View>

      <View style={styles.pager}>
        <TouchableOpacity
          onPress={() => setIndex((activeIndex - 1 + devotionals.length) % devotionals.length)}
          style={styles.pillBtn}
        >
          <AppIcon name="back" size={18} color="#B3282D" />
          <Text style={styles.pillText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIndex((activeIndex + 1) % devotionals.length)}
          style={styles.pillBtn}
        >
          <Text style={styles.pillText}>Next</Text>
          <AppIcon name="forward" size={18} color="#B3282D" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
    paddingBottom: 36,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  eyebrow: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
  },
  date: {
    marginTop: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: {
    marginTop: 4,
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    lineHeight: 34,
    color: '#111827',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#B3282D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    gap: 10,
  },
  scripture: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: '#B3282D',
    textAlign: 'center',
  },
  bodyText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: '#111827',
  },
  sectionLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 8,
  },
  pager: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  pillText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#B3282D',
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
