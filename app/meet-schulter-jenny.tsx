import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import { useBootstrap } from '~/hooks/useBootstrap';
import { openExternalUrl } from '~/lib/externalLinks';
import PageSlogan from '~/components/PageSlogan';

const BRAND_RED = '#B3282D';
const WARM = '#4B5563';

export default function MeetSchulterJenny() {
  const { data } = useBootstrap();
  const substackUrl = data?.links.blogUrl || 'https://schulteretyang.substack.com';
  const snapscanUrl = data?.giving.snapscan.url || 'https://pos.snapscan.io/qr/VISFNLkM';

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Stack.Screen options={{ title: 'Schulter & Genevieve' }} />

      <View style={styles.heroWrap}>
        <Image
          source={require('../assets/schulter-jenny.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.paragraph}>
          Schulter and Genevieve (Jenny) Etyang are the founders of
          <Text style={styles.bold}> The Life Place</Text>, Craigavon AH, Sandton, South Africa.
        </Text>

        <Text style={styles.paragraph}>
          Fifteen years ago, they encountered the good news of who Jesus is and what He has done,
          which became the central mission of their lives: inviting others to
          <Text style={styles.red}> Come. See. Jesus</Text>
        </Text>

        <Text style={styles.paragraph}>
          The Etyangs enjoy conversations about Jesus, being at home, travelling, exercise,
          watching sports, Netflix and chill, and the simple things in life.
        </Text>

        <Text style={styles.h2}>Connect with us</Text>

        <View style={styles.cardsWrap}>
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Read Schulter&apos;s writing</Text>
              <Text style={styles.cardText}>
                Open the shared blog destination to read the latest posts and reflections.
              </Text>

              <TouchableOpacity
                style={styles.ctaOutline}
                activeOpacity={0.9}
                onPress={() => void openExternalUrl(substackUrl, { label: 'Substack' })}
                accessibilityRole="button"
                accessibilityLabel="Open Schulter’s Substack"
              >
                <Text style={styles.ctaOutlineText}>Substack</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Partner with The Life Place</Text>
              <Text style={styles.cardText}>
                Open the shared giving destination to support the work of The Life Place.
              </Text>

              <TouchableOpacity
                style={styles.ctaOutline}
                activeOpacity={0.9}
                onPress={() => void openExternalUrl(snapscanUrl, { label: 'SnapScan' })}
                accessibilityRole="button"
                accessibilityLabel="Open SnapScan portal"
              >
                <Text style={styles.ctaOutlineText}>SnapScan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <PageSlogan />
      </ScrollView>
    </View>
  );
}

const HERO_H = 260;

const styles = StyleSheet.create({
  heroWrap: {
    height: HERO_H,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  heroImage: { width: '100%', height: '100%' },
  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
  },
  paragraph: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#333',
    lineHeight: 24,
    marginBottom: 14,
  },
  bold: { fontFamily: 'Montserrat-SemiBold' },
  red: { color: BRAND_RED, fontWeight: '600' },
  h2: {
    marginTop: 6,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  cardsWrap: {
    gap: 14,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#111827',
    lineHeight: 22,
  },
  cardText: {
    marginTop: 6,
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: WARM,
    lineHeight: 18,
  },
  ctaOutline: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: BRAND_RED,
  },
  ctaOutlineText: {
    fontFamily: 'Montserrat-SemiBold',
    color: BRAND_RED,
    fontSize: 14,
  },
});
