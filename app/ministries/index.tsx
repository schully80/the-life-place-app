import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useBootstrap } from '~/hooks/useBootstrap';

const IMAGES: Record<string, any> = {
  'bring-them-to-jesus': require('../../assets/min-bring-them-to-jesus.jpg'),
  'faith-and-work': require('../../assets/min-faith-and-work.jpg'),
  'this-gen': require('../../assets/min-this-gen.jpg'),
  institute: require('../../assets/min-institute.jpg'),
  kids: require('../../assets/min-kids.jpg'),
  'new-members': require('../../assets/min-new-members.jpg'),
  'premarital-counseling': require('../../assets/min-premarital-counseling.jpg'),
  'relief-center': require('../../assets/min-relief-center.jpg'),
};

export default function MinistriesIndex() {
  const router = useRouter();
  const { data, loading, error } = useBootstrap();
  const ministriesEnabled = data?.features.ministriesEnabled ?? false;

  return (
    <>
      <Stack.Screen options={{ title: 'Ministries' }} />
      {loading ? (
        <View style={styles.stateWrap}>
          <Text style={styles.stateText}>Loading ministries…</Text>
        </View>
      ) : error || !data ? (
        <View style={styles.stateWrap}>
          <Text style={styles.stateTitle}>Ministries unavailable</Text>
          <Text style={styles.stateText}>{error || 'Unable to load ministries.'}</Text>
        </View>
      ) : !ministriesEnabled ? (
        <View style={styles.stateWrap}>
          <Text style={styles.stateTitle}>Ministries hidden</Text>
          <Text style={styles.stateText}>
            This page is currently silenced in the app and can be re-enabled when you are ready.
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.h1}>Life at The Life Place</Text>
          <Text style={styles.sub}>Come. See. Jesus</Text>
          <Text style={styles.intro}>
            Explore the ministries and communities that help shape life at The Life Place.
          </Text>

          <View style={styles.grid}>
            {data.ministries.map((ministry) => (
              <TouchableOpacity
                key={ministry.slug}
                activeOpacity={0.9}
                onPress={() =>
                  router.push({
                    pathname: '/ministries/[slug]',
                    params: { slug: ministry.slug },
                  })
                }
              >
                <ImageBackground
                  source={IMAGES[ministry.slug]}
                  style={styles.tile}
                  imageStyle={styles.tileImg}
                  resizeMode="cover"
                >
                  <View style={styles.overlay} />
                  <Text style={styles.tileTitle}>{ministry.title}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  h1: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 28,
    color: '#111827',
    textAlign: 'center',
  },
  sub: {
    marginTop: 8,
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: '#B3282D',
    textAlign: 'center',
  },
  intro: {
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280',
    textAlign: 'center',
  },
  grid: {
    marginTop: 16,
    rowGap: 14,
    columnGap: 14,
  },
  tile: {
    height: 120,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileImg: { opacity: 0.9 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.25)' },
  tileTitle: {
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 12,
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
