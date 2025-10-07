
import { View, Text, Image } from 'react-native';
import { g } from '~/lib/styles';
import Button from '~/components/Button';
import { Link } from 'expo-router';
export default function Home() {
  return (
    <View style={g.screen}>
      <Image source={require('../assets/icon.png')} style={{ width: 72, height: 72, borderRadius: 16, marginBottom: 16 }}/>
      <Text style={g.h1}>The Life Place</Text>
      <Text style={g.p}>Come. See. Jesus.</Text>
      <View style={{ height: 12 }} />
      <Link href="/sermons" asChild><Button title="Watch Sermons" /></Link>
      <Link href="/give" asChild><Button title="Give" /></Link>
      <Link href="/prayer" asChild><Button title="Request Prayer" /></Link>
      <Link href="/events" asChild><Button title="Events" /></Link>
      <Link href="/devotionals" asChild><Button title="Daily Devotions" /></Link>
      <Link href="/about" asChild><Button title="About" /></Link>
    </View>
  );
}
