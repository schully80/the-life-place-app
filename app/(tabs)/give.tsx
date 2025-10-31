// app/give.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const COLORS = {
  brandRed: '#B3282D',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  cardBorder: '#D1D5DB',
  surface: '#FFFFFF',
  surfaceAlt: '#F9FAFB',
};

export default function Give() {
  const params = useLocalSearchParams<{ event?: string }>();
  const eventName = params?.event || 'Support the Mission';

  const [confirmed, setConfirmed] = useState(false);

  const onConfirmSnapScan = () => {
    setConfirmed(true);
    Alert.alert('Thank you!', 'We’ve received your confirmation.');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.h1}>Generosity</Text>
        <Text style={styles.heroP}>
          Generosity is our expression of who Jesus is and what He does.
        </Text>
        <Text style={[styles.heroP, { marginTop: 8 }]}>
          Your generosity helps others <Text style={{ color: COLORS.brandRed, fontFamily: 'Montserrat-SemiBold' }}>Come. See. Jesus</Text>
        </Text>
      </View>

      {/* EFT + In-Person */}
      <View style={{ gap: 16 }}>
        {/* EFT */}
        <View style={styles.card}>
          <View style={styles.cardIconRow}>
            <Image
              source={require('../../assets/giving/laptop.png')}
              style={styles.iconLg}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.h2}>EFT Banking Details</Text>
          <View style={styles.divider} />

          <View style={{ gap: 8 }}>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Account Name:</Text> The Life Place</Text>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Bank:</Text> Standard Bank</Text>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Account Number:</Text> 30 152 4351</Text>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Branch Code:</Text> 051001</Text>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Account Type:</Text> Current</Text>
            <Text style={styles.detail}><Text style={styles.detailLabel}>SWIFT:</Text> SBZA ZA JJ</Text>
          </View>
        </View>

        {/* In-Person */}
        <View style={styles.card}>
          <View style={styles.cardIconRow}>
            <Image
              source={require('../../assets/giving/hand-heart.png')}
              style={styles.iconLg}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.h2}>Give In Person</Text>
          <View style={styles.divider} />
          <Text style={styles.p}>
            While we encourage online giving for security and simplicity, we gladly receive in-person gifts during our weekend gatherings.
          </Text>
        </View>
      </View>

      {/* SnapScan */}
      <View style={[styles.card, { marginTop: 16 }]}>
        <View style={styles.cardIconRow}>
          <Image
            source={require('../../assets/giving/phone.png')}
            style={styles.iconLg}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.h2}>SnapScan</Text>
        <View style={styles.divider} />

        <Image
          source={require('../../assets/giving/SnapCode.png')}
          style={styles.qr}
          resizeMode="contain"
        />

        <Text style={[styles.h3, { marginTop: 16 }]}>Give Securely</Text>
        <Text style={[styles.p, { textAlign: 'center', marginTop: 8 }]}>
          Whether once-off or recurring, your generosity helps us create more space and resources so others can{' '}
          <Text style={{ color: COLORS.brandRed, fontFamily: 'Montserrat-SemiBold' }}>Come. See. Jesus</Text>
        </Text>

        {/* Confirm form */}
        <View style={{ marginTop: 16 }}>
          <Text style={[styles.p, { textAlign: 'center' }]}>
            Event: <Text style={{ fontFamily: 'Montserrat-SemiBold', color: COLORS.textPrimary }}>{eventName}</Text>
          </Text>

          <TouchableOpacity style={styles.primaryBtn} onPress={onConfirmSnapScan} accessibilityRole="button">
            <Text style={styles.primaryBtnText}>I’ve Given</Text>
          </TouchableOpacity>

          {confirmed && (
            <View style={styles.confirmBanner}>
              <Text style={styles.confirmText}>Thank you for your generosity. We’ve received your confirmation.</Text>
            </View>
          )}
        </View>

        {/* Optional helper link */}
        {/* <TouchableOpacity onPress={() => Linking.openURL('https://www.snapscan.co.za/')} style={{ marginTop: 10 }}>
          <Text style={[styles.link, { textAlign: 'center' }]}>What is SnapScan?</Text>
        </TouchableOpacity> */}
      </View>

      {/* Featured (Annual Report) */}
      <View style={[styles.featureCard, { marginTop: 24 }]}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Coming Soon</Text>
        </View>

        <Text style={styles.featureTitle}>Annual Financial Report</Text>
        <Text style={[styles.p, { textAlign: 'center', marginTop: 8 }]}>
          We value transparency. See how generosity is stewarded at The Life Place.
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => Linking.openURL('/reports/annual-report-2024.pdf')}
            style={styles.cta}
          >
            <Text style={styles.ctaText}>Download 2024 (PDF)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('/reports/annual-report-2024.pdf')}
            style={styles.ctaOutline}
          >
            <Text style={styles.ctaOutlineText}>View Online</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.surface, paddingHorizontal: 24 },
  hero: { alignItems: 'center', paddingTop: 72, paddingBottom: 8 },
  h1: {
    fontFamily: 'Montserrat-Semibold',
    fontSize: 20,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroP: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardIconRow: { alignItems: 'center', marginBottom: 8 },
  iconLg: { width: 44, height: 44 },

  h2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  detail: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  detailLabel: { fontFamily: 'Montserrat-SemiBold', color: COLORS.textPrimary },

  p: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  h3: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  qr: {
    width: 192,
    height: 192,
    alignSelf: 'center',
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  primaryBtn: {
    backgroundColor: COLORS.brandRed,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    alignSelf: 'center',
    minWidth: 160,
  },
  primaryBtnText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  confirmBanner: {
    marginTop: 12,
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  confirmText: {
    color: '#166534',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },

  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: COLORS.brandRed,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 8,
  },
  badgeText: { color: '#fff', fontFamily: 'Montserrat-Bold' },
  featureTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  actions: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
  },
  cta: {
    backgroundColor: COLORS.brandRed,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  ctaText: { color: '#fff', fontFamily: 'Montserrat-SemiBold' },
  ctaOutline: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  ctaOutlineText: {
    color: COLORS.textPrimary,
    fontFamily: 'Montserrat-SemiBold',
  },
});
