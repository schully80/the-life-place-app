// app/ministries/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Stack, useRouter } from 'expo-router';

const BRAND_RED = '#B3282D';

type Ministry = { title: string; slug: string; image: any };

const MINISTRIES: Ministry[] = [
  { title: 'Bring Them to Jesus',   slug: 'bring-them-to-jesus',   image: require('../../assets/min-bring-them-to-jesus.jpg') },
  { title: 'Faith & Work',          slug: 'faith-and-work',        image: require('../../assets/min-faith-and-work.jpg') },
  { title: 'thisgen',               slug: 'this-gen',              image: require('../../assets/min-this-gen.jpg') },
  { title: 'Institute',              slug: 'institute',              image: require('../../assets/min-institute.jpg') }, // kept your spelling
  { title: 'Kids',                  slug: 'kids',                  image: require('../../assets/min-kids.jpg') },
  { title: 'New Members',           slug: 'new-members',           image: require('../../assets/min-new-members.jpg') },
  { title: 'Premarital Counseling', slug: 'premarital-counseling', image: require('../../assets/min-premarital-counseling.jpg') },
  { title: 'Relief Center',         slug: 'relief-center',         image: require('../../assets/min-relief-center.jpg') },
];

export default function MinistriesIndex() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Ministries' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.h1}>Life at The Life Place</Text>
        <Text style={styles.sub}>
          Come. See. <Text style={styles.subEmph}>Jesus</Text>
        </Text>
        <Text style={styles.intro}>
          Our ministries are designed to help people grow in Jesus, build strong families,
          and live out their faith in every sphere of life.
        </Text>

        <View style={styles.grid}>
          {MINISTRIES.map((m) => (
            <TouchableOpacity
              key={m.slug}
              activeOpacity={0.9}
              onPress={() => router.push(`/ministries/${m.slug}`)}
            >
              <ImageBackground
                source={m.image}
                style={styles.tile}
                imageStyle={styles.tileImg}
                resizeMode="cover"
              >
                <View style={styles.overlay} />
                <Text style={styles.tileTitle}>{m.title}</Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 40, backgroundColor: '#FFFFFF' },
  h1: { fontFamily: 'Montserrat-SemiBold', fontSize: 28, color: '#111827', textAlign: 'center' },
  sub: { marginTop: 8, fontFamily: 'Montserrat-Medium', fontSize: 18, color: '#6B7280', textAlign: 'center' },
  subEmph: { color: BRAND_RED, fontFamily: 'Montserrat-Bold' },
  intro: {
    marginTop: 10, fontFamily: 'Montserrat-Regular', fontSize: 16, lineHeight: 24, color: '#6B7280', textAlign: 'center',
  },

  grid: { marginTop: 16, rowGap: 14, columnGap: 14 },

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
    letterSpacing: 0.3,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
});
