
import { View, Text } from 'react-native';
import { g } from '~/lib/styles';
export default function Events() {
  return (
    <View style={g.screen}>
      <Text style={g.h1}>Events</Text>
      <View style={g.card}><Text style={g.p}>Add your upcoming events here.</Text></View>
    </View>
  );
}
