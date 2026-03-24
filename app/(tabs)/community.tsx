import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useBootstrap } from '~/hooks/useBootstrap';
import AppIcon, { AppIconName } from '~/components/AppIcon';
import PageSlogan from '~/components/PageSlogan';

const BRAND_RED = '#B3282D';
const INK = '#111827';
const MUTED = '#6B7280';
const SURFACE = '#F9FAFB';

export default function Community() {
  const router = useRouter();
  const { data } = useBootstrap();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.heading}>Find your next step.</Text>
          <Text style={styles.subheading}>
            Explore the front-facing pages of the app through a quieter icon-first directory.
          </Text>
        </View>

        <View style={styles.tileGrid}>
          <Tile
            title="OUR WELCOME"
            subtitle="How we open wide our doors."
            icon="hand-holding-heart"
            onPress={() => router.push('/our-welcome')}
          />
          <Tile
            title="ABOUT US"
            subtitle="What shapes life at The Life Place."
            icon="book-open"
            onPress={() => router.push('/about')}
          />
          <Tile
            title="VISIT US"
            subtitle="When, where, and how to find us."
            icon="location-dot"
            onPress={() => router.push('/visit')}
          />
          <Tile
            title="BLOG"
            subtitle="Writing, reflections, and recent posts."
            icon="newspaper"
            onPress={() => router.push('/blog')}
          />
        {data?.features.ministriesEnabled ? (
            <Tile
              title="MINISTRIES"
              subtitle="Communities and church life."
              icon="people-group"
              onPress={() => router.push('/ministries')}
            />
        ) : null}
        {data?.features.messagesEnabled ? (
            <Tile
              title="MESSAGES"
              subtitle="Teaching and recent sermons."
              icon="youtube"
              onPress={() => router.push('/messages')}
            />
        ) : null}
        </View>

        <View style={styles.privacyRow}>
          <Link href="/privacy" asChild>
            <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.privacy}>Privacy</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <PageSlogan />
      </ScrollView>
    </View>
  );
}

function Tile({
  title,
  subtitle,
  icon,
  onPress,
}: {
  title: string;
  subtitle: string;
  icon: AppIconName;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.tile}>
      <View style={styles.iconBadge}>
        <AppIcon name={icon} size={28} color={BRAND_RED} />
      </View>
      <Text style={styles.tileTitle}>{title}</Text>
      <Text style={styles.tileSubtitle}>{subtitle}</Text>
      <View style={styles.tileFooter}>
        <Text style={styles.tileAction}>Open</Text>
        <AppIcon name="forward" size={16} color={BRAND_RED} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 60 },
  header: {
    alignItems: 'center',
    paddingBottom: 18,
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 38,
    lineHeight: 40,
    color: INK,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subheading: {
    marginTop: 10,
    maxWidth: 320,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 23,
    color: MUTED,
    textAlign: 'center',
  },
  tileGrid: {
    gap: 14,
  },
  tile: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: SURFACE,
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(179,40,45,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tileTitle: {
    color: INK,
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    lineHeight: 28,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tileSubtitle: {
    marginTop: 8,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: MUTED,
    textAlign: 'center',
  },
  tileFooter: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  tileAction: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    color: BRAND_RED,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  privacyRow: { marginTop: 8, alignItems: 'flex-end', paddingHorizontal: 12 },
  privacy: {
    color: MUTED,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
