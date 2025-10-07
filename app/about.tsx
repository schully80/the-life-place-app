
import { View, Text, Linking } from 'react-native';
import { g } from '~/lib/styles';
export default function About() {
  return (
    <View style={g.screen}>
      <Text style={g.h1}>About The Life Place</Text>
      <Text style={g.p}>We are a Jesus-centred community in Johannesburg. Our heartbeat is simple: Come. See. Jesus.</Text>
      <View style={{ height: 12 }} />
      <Text style={g.p} onPress={() => Linking.openURL('mailto:hello@thelifeplace.example')}>Contact: hello@thelifeplace.example</Text>
      <Text style={g.p} onPress={() => Linking.openURL('https://thelifeplace.example')}>Website: thelifeplace.example</Text>
    </View>
  );
}
