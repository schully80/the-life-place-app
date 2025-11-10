// app/ministries/[slug].tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import BackButton from '../../components/BackButton';

const BRAND_RED = '#B3282D';
const MUTED = '#6B7280';

type MDef = {
  title: string;
  image?: any;
  body: string[];
};

const CONTENT: Record<string, MDef> = {
  'bring-them-to-jesus': {
    title: 'Bring Them to Jesus',
    image: require('../../assets/min-bring-them-to-jesus.jpg'),
    body: [
      'A preparation journey for families dedicating their children—centered on Jesus and the gospel.',
      'Includes forms, pastoral support, and celebration together.',
    ],
  },
  'faith-and-work': {
    title: 'Faith & Work',
    image: require('../../assets/min-faith-and-work.jpg'),
    body: [
      'Following Jesus in the marketplace—vocation, ethics, generosity, and witness.',
    ],
  },
  gen: {
    title: 'thisgen',
    image: require('../../assets/min-this-gen.jpg'),
    body: ['A community initiative around growth, evangelism, and neighbourhood.'],
  },
  institue: {
    title: 'Institute', // kept your label; we can rename later if you like
    image: require('../../assets/min-institute.jpg'),
    body: ['Equipping followers of Jesus with the foundations of the faith and mission.'],
  },
  kids: {
    title: 'Kids',
    image: require('../../assets/min-kids.jpg'),
    body: [
      'Helping children Come. See. Jesus. through Scripture, prayer, and play.',
      'Coming soon as team and resources grow.',
    ],
  },
  'new-members': {
    title: 'New Members',
    image: require('../../assets/min-new-members.jpg'),
    body: [
      'Belong, believe, and build with us. Learn our story, convictions, and next steps.',
    ],
  },
  'premarital-counseling': {
    title: 'Premarital Counseling',
    image: require('../../assets/min-premarital-counseling.jpg'),
    body: [
      'A Jesus-centred journey preparing couples for marriage—hope, habits, and healthy communication.',
    ],
  },
  'relief-center': {
    title: 'Relief Center',
    image: require('../../assets/min-relief-center.jpg'),
    body: [
      'Compassion in action—mercy, food, and support for those in need.',
    ],
  },
};

export default function MinistryDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const data = CONTENT[slug ?? ''] ?? { title: 'Ministry', body: ['Details coming soon.'] };

  return (
    <>
      <Stack.Screen
        options={{
          title: data.title,
          headerLeft: () => <BackButton glass fallbackTo="/ministries" />, // go back to the hub
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {data.image ? <Image source={data.image} style={styles.hero} resizeMode="cover" /> : null}

        <Text style={styles.h1}>{data.title}</Text>

        {data.body.map((p, i) => (
          <Text key={i} style={styles.body}>
            {p}
          </Text>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 40, backgroundColor: '#FFFFFF' },
  hero: {
    width: '100%', height: 180, borderRadius: 14, marginBottom: 16,
    overflow: 'hidden',
  },
  h1: {
    fontFamily: 'Montserrat-SemiBold', fontSize: 24, color: '#111827', marginBottom: 8,
  },
  body: {
    fontFamily: 'Montserrat-Regular', fontSize: 16, lineHeight: 24, color: MUTED, marginTop: 8,
  },
});
