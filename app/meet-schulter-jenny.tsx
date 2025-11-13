// app/meet-schulter-jenny.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { Stack } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';

const BRAND_RED = '#B3282D';
const WARM = '#4B5563';

const SUBSTACK_URL = 'https://schulteretyang.substack.com';
const SNAPSCAN_URL = 'https://pos.snapscan.io/qr/VISFNLkM';

export default function MeetSchulterJenny() {
  const openUrl = async (url: string, label?: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Unable to open link', `${label ?? 'This link'} is not supported on this device.`);
        return;
      }
      await Linking.openURL(url);
    } catch {
      Alert.alert('Something went wrong', 'Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Stack.Screen options={{ title: 'Schulter & Genevieve' }} />

      {/* Header photo with rounded corners and NO text */}
      <View style={styles.heroWrap}>
        <Image
          source={require('../assets/schulter-jenny.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Bio */}
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

        {/* Connect with us */}
        <Text style={styles.h2}>Connect with us</Text>

        <View style={styles.cardsWrap}>
          {/* Substack card */}
          <View style={styles.card}>
            <View style={styles.qrWrap}>
              <QRCode value={SUBSTACK_URL} size={Platform.OS === 'ios' ? 160 : 150} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>
                Subscribe to {'\n'}Schulter’s Substack
              </Text>
              <Text style={styles.cardText}>
                Scan the code or tap below to get new posts from Schulter.
              </Text>

              <TouchableOpacity
                style={styles.ctaOutline}
                activeOpacity={0.9}
                onPress={() => openUrl(SUBSTACK_URL, 'Substack')}
                accessibilityRole="button"
                accessibilityLabel="Open Schulter’s Substack"
              >
                <Text style={styles.ctaOutlineText}>Substack</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* SnapScan card */}
          <View style={styles.card}>
            <View style={styles.qrWrap}>
              <QRCode value={SNAPSCAN_URL} size={Platform.OS === 'ios' ? 160 : 150} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>
                Partner with {'\n'}The Life Place
              </Text>
              <Text style={styles.cardText}>
                Scan or tap to open our SnapScan portal directly.
              </Text>

              <TouchableOpacity
                style={styles.ctaOutline}
                activeOpacity={0.9}
                onPress={() => openUrl(SNAPSCAN_URL, 'SnapScan')}
                accessibilityRole="button"
                accessibilityLabel="Open SnapScan portal"
              >
                <Text style={styles.ctaOutlineText}>SnapScan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.note}>
          Trouble scanning? Use the buttons above to open the links directly.
        </Text>
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
    flexDirection: 'row',
    gap: 14,
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
  qrWrap: {
    width: 170,
    height: 170,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
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

  note: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
});
