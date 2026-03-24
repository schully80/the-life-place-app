import { ImageBackground, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIcon, { AppIconName } from '~/components/AppIcon';
import PageSlogan from '~/components/PageSlogan';
import { useBootstrap } from '~/hooks/useBootstrap';
import { getCanonicalPrimaryService, getCanonicalVisitLocation } from '~/lib/contentApi';
import { HOME_STYLES, type HomeStyle } from '~/lib/homeDesignStyles';

const IMAGE_SOURCE = require('../assets/wide-strip5.jpg');
const SECTION_HEADER_TITLE_SIZE = 30;

export default function Visit() {
  const { data, loading, error } = useBootstrap();
  const theme = HOME_STYLES.find((style) => style.id === 'glass') ?? HOME_STYLES[0];

  if (loading) {
    return (
      <ScreenShell theme={theme}>
        <StateCard theme={theme} title="Loading visit information" body="Pulling in the details for Sunday and directions." />
      </ScreenShell>
    );
  }

  if (error || !data) {
    return (
      <ScreenShell theme={theme}>
        <StateCard
          theme={theme}
          title="Visit info unavailable"
          body={error || 'Unable to load visit information.'}
        />
      </ScreenShell>
    );
  }

  const service = getCanonicalPrimaryService(data.schedule.services[0]);
  const location = getCanonicalVisitLocation(data.location);

  return (
    <ScreenShell theme={theme}>
      <ImageBackground
        source={IMAGE_SOURCE}
        resizeMode="cover"
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroInner}>
          <Text style={styles.heroTitle}>
            At the heart of everything we believe and do is{'\n'}
            <Text style={[styles.heroJesus, { color: theme.accent }]}>Jesus</Text> and His finished work.
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.borderStrong,
              borderRadius: theme.radiusCard,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <View style={styles.sectionLabelRow}>
            <View
              style={[
                styles.sectionLabel,
                {
                  backgroundColor: theme.cardAlt,
                  borderColor: theme.borderStrong,
                },
              ]}
            >
              <Text style={[styles.sectionLabelText, { color: theme.accent }]}>When</Text>
            </View>
            <View
              style={[
                styles.sectionLabel,
                {
                  backgroundColor: theme.cardAlt,
                  borderColor: theme.borderStrong,
                },
              ]}
            >
              <Text style={[styles.sectionLabelText, { color: theme.accent }]}>Where</Text>
            </View>
          </View>

          <View style={styles.infoStack}>
            <InfoBlock
              theme={theme}
              title="Sunday"
              titleAccent={service.label.replace(/^Sunday\s*/i, '')}
              copy={service.description}
            />

            <InfoBlock
              theme={theme}
              title="Our Location"
              titleAccent={location.venue}
              copy={[
                location.address.line1,
                location.address.line2,
                location.address.line3,
                location.address.line4,
              ].join('\n')}
            />

            <InfoBlock
              theme={theme}
              title="First Time Visiting?"
              copy="We’d love to meet you. Expect a warm welcome, genuine community, and a clear view of Jesus."
            />
          </View>
        </View>

        <View
          style={[
            styles.directionCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.borderStrong,
              borderRadius: theme.radiusCard,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <Text style={[styles.directionTitle, { color: theme.textPrimary }]}>Get Directions</Text>
          <View style={styles.directionButtons}>
            <DirectionButton
              theme={theme}
              icon="google"
              label="Google Maps"
              onPress={() => {
                void Linking.openURL(location.mapsQueryUrl);
              }}
            />
            <DirectionButton
              theme={theme}
              icon="apple"
              label="Apple Maps"
              onPress={() => {
                void Linking.openURL(location.appleMapsUrl);
              }}
            />
            <DirectionButton
              theme={theme}
              icon="navigate"
              label="Waze"
              onPress={() => {
                void Linking.openURL(location.wazeUrl);
              }}
            />
          </View>
        </View>
      </View>
    </ScreenShell>
  );
}

function ScreenShell({
  theme,
  children,
}: {
  theme: HomeStyle;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.screen}>
      <LinearGradient colors={theme.pageGradient} style={StyleSheet.absoluteFill} />
      <BackgroundDecor theme={theme} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {children}
        <PageSlogan inverse />
      </ScrollView>
    </View>
  );
}

function InfoBlock({
  theme,
  title,
  titleAccent,
  copy,
}: {
  theme: HomeStyle;
  title: string;
  titleAccent?: string;
  copy: string;
}) {
  return (
    <View
      style={[
        styles.infoBlock,
        {
          backgroundColor: theme.cardAlt,
          borderColor: theme.borderStrong,
        },
      ]}
    >
      <Text style={[styles.infoHeading, { color: theme.textPrimary }]}>{title}</Text>
      {titleAccent ? (
        <Text style={[styles.infoAccent, { color: theme.accent }]}>{titleAccent}</Text>
      ) : null}
      <Text style={[styles.infoCopy, { color: theme.textSecondary }]}>{copy}</Text>
    </View>
  );
}

function DirectionButton({
  theme,
  icon,
  label,
  onPress,
}: {
  theme: HomeStyle;
  icon: AppIconName;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.directionButton,
        {
          backgroundColor: theme.cardAlt,
          borderColor: theme.borderStrong,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View
        style={[
          styles.directionIconWrap,
          {
            backgroundColor: theme.accentSoft,
            borderColor: theme.borderStrong,
          },
        ]}
      >
        <AppIcon name={icon} size={18} color={theme.accent} />
      </View>
      <Text style={[styles.directionButtonText, { color: theme.textPrimary }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function StateCard({
  theme,
  title,
  body,
}: {
  theme: HomeStyle;
  title: string;
  body: string;
}) {
  return (
    <View style={styles.content}>
      <View
        style={[
          styles.stateCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.borderStrong,
            borderRadius: theme.radiusCard,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <Text style={[styles.stateTitle, { color: theme.textPrimary }]}>{title}</Text>
        <Text style={[styles.stateText, { color: theme.textSecondary }]}>{body}</Text>
      </View>
    </View>
  );
}

function BackgroundDecor({ theme }: { theme: HomeStyle }) {
  return (
    <>
      <View style={[styles.orbLarge, { backgroundColor: theme.orbTop }]} />
      <View style={[styles.orbMedium, { backgroundColor: theme.orbMiddle }]} />
      <View style={[styles.orbSmall, { backgroundColor: theme.orbBottom }]} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#07111F',
  },
  container: {
    paddingBottom: 44,
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
  heroJesus: {},
  content: {
    paddingHorizontal: 20,
    paddingTop: 52,
    gap: 28,
  },
  sectionCard: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 22,
    gap: 18,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
  },
  sectionLabel: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sectionLabelText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  infoStack: {
    gap: 14,
  },
  infoBlock: {
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 6,
  },
  infoHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 19,
  },
  infoAccent: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  infoCopy: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  directionCard: {
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 20,
    gap: 14,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  directionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: SECTION_HEADER_TITLE_SIZE,
    lineHeight: 34,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0,
  },
  directionButtons: {
    alignItems: 'center',
    gap: 10,
  },
  directionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  directionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  directionButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
  stateCard: {
    marginTop: 24,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
    gap: 10,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  stateTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    textAlign: 'center',
  },
  stateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  orbLarge: {
    position: 'absolute',
    top: -110,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  orbMedium: {
    position: 'absolute',
    top: 280,
    left: -70,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  orbSmall: {
    position: 'absolute',
    bottom: 120,
    right: 10,
    width: 160,
    height: 160,
    borderRadius: 80,
  },
});
