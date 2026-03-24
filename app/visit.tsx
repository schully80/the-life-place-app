import { ImageBackground, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useBootstrap } from '~/hooks/useBootstrap';
import AppIcon, { AppIconName } from '~/components/AppIcon';

const BRAND_RED = '#B3282D';
const INK = '#1F2937';
const MUTED = '#6B7280';

export default function Visit() {
  const { data, loading, error } = useBootstrap();

  if (loading) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateText}>Loading visit information…</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.stateWrap}>
        <Text style={styles.stateTitle}>Visit info unavailable</Text>
        <Text style={styles.stateText}>{error || 'Unable to load visit information.'}</Text>
      </View>
    );
  }

  const service = data.schedule.services[0];

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
          <Text style={styles.heroTitle}>
            At the heart of everything we believe and do is{'\n'}
            <Text style={styles.heroJesus}>Jesus</Text> and His finished work.
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.headingBlock}>
        <Text style={styles.heading}>VISIT US</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>
          When & <Text style={styles.sectionAccent}>Where</Text>
        </Text>

        <View style={styles.infoStack}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoHeading}>Sunday</Text>
            <Text style={styles.infoTime}>{service.label.replace(/^Sunday\s*/i, '')}</Text>
            <Text style={styles.infoCopy}>{service.description}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoHeading}>Our Location</Text>
            <Text style={styles.locationVenue}>{data.location.venue}</Text>
            <Text style={styles.infoCopy}>{data.location.address.line1}</Text>
            <Text style={styles.infoCopy}>{data.location.address.line2}</Text>
            <Text style={styles.infoCopy}>{data.location.address.line3}</Text>
            <Text style={styles.infoCopy}>{data.location.address.line4}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoHeading}>First Time Visiting?</Text>
            <Text style={styles.infoCopy}>
              We&apos;d love to meet you. Expect a warm welcome, genuine community, and a clear
              view of Jesus.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.directionCard}>
        <Text style={styles.directionTitle}>Get Directions</Text>
        <View style={styles.directionButtons}>
          <DirectionButton
            icon="google"
            label="Google Maps"
            onPress={() => Linking.openURL(data.location.mapsQueryUrl)}
          />
          <DirectionButton
            icon="apple"
            label="Apple Maps"
            onPress={() => Linking.openURL(data.location.appleMapsUrl)}
          />
          <DirectionButton
            icon="navigate"
            label="Waze"
            onPress={() => Linking.openURL(data.location.wazeUrl)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function DirectionButton({
  icon,
  label,
  onPress,
}: {
  icon: AppIconName;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.directionButton} onPress={onPress} activeOpacity={0.88}>
      <AppIcon name={icon} size={20} color={INK} />
      <Text style={styles.directionButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 44,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    minHeight: 300,
    justifyContent: 'center',
  },
  heroImage: {
    opacity: 0.95,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroInner: {
    paddingHorizontal: 24,
    paddingVertical: 36,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  heroTitle: {
    maxWidth: 340,
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    lineHeight: 40,
    color: '#FFFFFF',
    textAlign: 'right',
  },
  heroJesus: {
    color: BRAND_RED,
  },
  headingBlock: {
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 38,
    lineHeight: 40,
    color: INK,
    letterSpacing: 1,
  },
  sectionCard: {
    marginTop: 22,
    marginHorizontal: 20,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    lineHeight: 34,
    color: INK,
    marginBottom: 18,
    textTransform: 'uppercase',
  },
  sectionAccent: {
    color: BRAND_RED,
  },
  infoStack: {
    gap: 18,
  },
  infoBlock: {
    borderLeftWidth: 4,
    borderLeftColor: BRAND_RED,
    paddingLeft: 14,
  },
  infoHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: INK,
    marginBottom: 4,
  },
  infoTime: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: MUTED,
    marginBottom: 6,
  },
  locationVenue: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: MUTED,
    marginBottom: 6,
  },
  infoCopy: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: MUTED,
  },
  directionCard: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 28,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  directionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: INK,
    textAlign: 'center',
    marginBottom: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  directionButtons: {
    gap: 10,
  },
  directionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(179,40,45,0.22)',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  directionButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: INK,
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
