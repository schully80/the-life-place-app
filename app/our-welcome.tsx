import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBootstrap } from '~/hooks/useBootstrap';

const BRAND_RED = '#B3282D';
const INK = '#1F2937';
const MUTED = '#4B5563';

export default function OurWelcome() {
  const { data, loading, error } = useBootstrap();

  if (loading) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateText}>Loading welcome content…</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateTitle}>Welcome unavailable</Text>
        <Text style={styles.stateText}>{error || 'Unable to load welcome content.'}</Text>
      </View>
    );
  }

  const [introLine, ...restLines] = data.welcome.lines;

  return (
    <View style={styles.screen}>
      <View style={styles.blobTopRight} />
      <View style={styles.blobBottomLeft} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.preheader}>Welcome to The Life Place</Text>

        <View style={styles.heroBlock}>
          <Text style={styles.heroLead}>We open wide our doors with a welcome from</Text>
          <Text style={styles.heroJesus}>Jesus,</Text>

          <View style={styles.heroLines}>
            {restLines.map((line) => (
              <Text key={line} style={styles.heroLine}>
                {highlightLine(line)}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.invitationBlock}>
          <Text style={styles.invitationLabel}>Our Invitation</Text>
          <Text style={styles.invitationWord}>Come</Text>
          <Text style={styles.invitationWord}>See</Text>
          <Text style={styles.invitationJesus}>Jesus</Text>
        </View>

        <View style={styles.copyCard}>
          <Text style={styles.copy}>
            This is what we&apos;re about: encountering <Text style={styles.copyEmphasis}>Jesus</Text>{' '}
            together and letting who He is and what He has done transform everything.
          </Text>
          <Text style={styles.copyClosing}>
            Seeing <Text style={styles.copyEmphasis}>Jesus</Text> changes everything.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function highlightLine(line: string) {
  const keywords = ['Embracer', 'Defender', 'Justifier', 'Friend'];
  const keyword = keywords.find((item) => line.includes(item));

  if (!keyword) {
    return line;
  }

  const [before, after] = line.split(keyword);
  return (
    <>
      {before}
      <Text style={styles.heroHighlight}>{keyword}</Text>
      {after}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 48,
  },
  preheader: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    color: INK,
    marginBottom: 18,
  },
  heroBlock: {
    marginBottom: 34,
    alignItems: 'center',
  },
  heroLead: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    lineHeight: 22,
    color: INK,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
  },
  heroJesus: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 42,
    lineHeight: 48,
    color: BRAND_RED,
    marginTop: 6,
    textAlign: 'center',
  },
  heroLines: {
    marginTop: 10,
    gap: 8,
    alignItems: 'center',
  },
  heroLine: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 34,
    lineHeight: 40,
    color: INK,
    textAlign: 'center',
  },
  heroHighlight: {
    color: BRAND_RED,
  },
  invitationBlock: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    paddingVertical: 28,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  invitationLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    color: BRAND_RED,
    marginBottom: 18,
  },
  invitationWord: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 48,
    lineHeight: 52,
    color: INK,
  },
  invitationJesus: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 54,
    lineHeight: 58,
    color: BRAND_RED,
  },
  copyCard: {
    marginTop: 24,
    borderRadius: 26,
    padding: 22,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  copy: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    lineHeight: 26,
    color: MUTED,
    textAlign: 'center',
  },
  copyClosing: {
    marginTop: 18,
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    lineHeight: 28,
    color: INK,
    textAlign: 'center',
  },
  copyEmphasis: {
    color: BRAND_RED,
  },
  blobTopRight: {
    position: 'absolute',
    top: -40,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(179,40,45,0.08)',
  },
  blobBottomLeft: {
    position: 'absolute',
    bottom: 80,
    left: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(31,41,55,0.05)',
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
    color: '#6B7280',
    textAlign: 'center',
  },
});
