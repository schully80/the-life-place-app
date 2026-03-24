import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBootstrap } from '~/hooks/useBootstrap';
import AppIcon, { AppIconName } from '~/components/AppIcon';

const BRAND_RED = '#B3282D';
const INK = '#1F2937';
const MUTED = '#6B7280';

const VALUE_ICONS: Record<string, AppIconName> = {
  scripture: 'book-open',
  community: 'people-group',
  generosity: 'hand-holding-heart',
  mission: 'cross',
};

export default function About() {
  const { data, loading, error } = useBootstrap();

  if (loading) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateText}>Loading about content…</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateTitle}>About unavailable</Text>
        <Text style={styles.stateText}>{error || 'Unable to load about content.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../assets/sandton-skyline.jpg')}
        resizeMode="cover"
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroInner}>
          <Text style={styles.heroLabel}>What We Do</Text>
          <Text style={styles.heroTitle}>
            Every time we meet we see how true good beautiful and kind <Text style={styles.heroJesus}>Jesus</Text> is.
          </Text>
          <Text style={styles.heroCopy}>{data.about.missionSupport}</Text>
          <Text style={styles.heroClosing}>
            Seeing <Text style={styles.heroJesus}>Jesus</Text> changes everything.
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.valuesIntroCard}>
        <Text style={styles.valuesLabel}>Our Values</Text>
        <Text style={styles.valuesTitle}>
          OUR CORE{'\n'}
          <Text style={styles.valuesTitleAccent}>VALUES</Text>
        </Text>
        <Text style={styles.valuesStatement}>
          We are intentional about The Life Place being a community where all that we are and do communicates the{' '}
          <Text style={styles.valuesStatementAccent}>beauty, gentleness and kindness</Text> of who{' '}
          <Text style={styles.valuesStatementAccent}>Jesus</Text> is.
        </Text>
      </View>

      <View style={styles.valuesGrid}>
        {data.about.values.map((value) => (
          <View key={value.id} style={styles.valueCard}>
            <View style={styles.iconWrap}>
              <AppIcon name={VALUE_ICONS[value.id] || 'cross'} size={28} color={BRAND_RED} />
            </View>
            <Text style={styles.valueTitle}>{value.title}</Text>
            <Text style={styles.valueBody}>{value.body}</Text>
          </View>
        ))}
      </View>

      <View style={styles.finalInvite}>
        <Text style={styles.finalInviteTitle}>
          Come. See. <Text style={styles.finalInviteAccent}>Jesus</Text>
        </Text>
        <Text style={styles.finalInviteCopy}>Join us this Sunday.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    minHeight: 440,
    justifyContent: 'center',
    marginBottom: 24,
  },
  heroImage: {
    opacity: 0.98,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },
  heroInner: {
    paddingHorizontal: 24,
    paddingVertical: 44,
    alignItems: 'center',
  },
  heroLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 38,
    lineHeight: 46,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  heroJesus: {
    color: BRAND_RED,
  },
  heroCopy: {
    marginTop: 18,
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    lineHeight: 25,
    color: '#F3F4F6',
    textAlign: 'center',
    maxWidth: 340,
  },
  heroClosing: {
    marginTop: 22,
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    lineHeight: 28,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  valuesIntroCard: {
    marginHorizontal: 20,
    borderRadius: 28,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingVertical: 26,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  valuesLabel: {
    alignSelf: 'center',
    marginBottom: 14,
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    color: MUTED,
  },
  valuesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 38,
    lineHeight: 40,
    color: INK,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  valuesTitleAccent: {
    color: BRAND_RED,
  },
  valuesStatement: {
    marginTop: 18,
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    lineHeight: 30,
    color: INK,
    textAlign: 'center',
  },
  valuesStatementAccent: {
    color: BRAND_RED,
  },
  valuesGrid: {
    paddingHorizontal: 20,
    paddingTop: 22,
    gap: 14,
  },
  valueCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(179,40,45,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  valueTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    lineHeight: 30,
    color: INK,
    textAlign: 'center',
  },
  valueBody: {
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 23,
    color: MUTED,
    textAlign: 'center',
  },
  finalInvite: {
    paddingTop: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  finalInviteTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 34,
    lineHeight: 40,
    color: INK,
    textAlign: 'center',
  },
  finalInviteAccent: {
    color: BRAND_RED,
  },
  finalInviteCopy: {
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: MUTED,
    textAlign: 'center',
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
