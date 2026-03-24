import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import BackButton from '../../components/BackButton';
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

export default function MinistryDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, loading, error } = useBootstrap();
  const ministriesEnabled = data?.features.ministriesEnabled ?? false;
  const ministry = data?.ministries.find((item) => item.slug === slug);

  return (
    <>
      <Stack.Screen
        options={{
          title: ministry?.title || 'Ministry',
          headerLeft: () => <BackButton glass fallbackTo="/ministries" />,
        }}
      />
      {loading ? (
        <View style={styles.stateWrap}>
          <Text style={styles.stateText}>Loading ministry…</Text>
        </View>
      ) : error || !data ? (
        <View style={styles.stateWrap}>
          <Text style={styles.stateTitle}>Ministry unavailable</Text>
          <Text style={styles.stateText}>{error || 'Unable to load ministry details.'}</Text>
        </View>
      ) : !ministriesEnabled ? (
        <View style={styles.stateWrap}>
          <Text style={styles.stateTitle}>Ministry hidden</Text>
          <Text style={styles.stateText}>
            Ministries are currently silenced in the app and will appear again when re-enabled.
          </Text>
        </View>
      ) : !ministry ? (
        <View style={styles.stateWrap}>
          <Text style={styles.stateTitle}>Ministry unavailable</Text>
          <Text style={styles.stateText}>Unable to load ministry details.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {IMAGES[ministry.slug] ? (
            <Image source={IMAGES[ministry.slug]} style={styles.hero} resizeMode="cover" />
          ) : null}
          <Text style={styles.h1}>{ministry.title}</Text>
          <Text style={styles.summary}>{ministry.summary}</Text>
          {ministry.body.map((paragraph) => (
            <Text key={paragraph} style={styles.body}>
              {paragraph}
            </Text>
          ))}
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
  hero: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
  },
  h1: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 8,
  },
  summary: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: '#B3282D',
  },
  body: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280',
    marginTop: 10,
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
