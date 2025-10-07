
import { View, Text, Linking } from 'react-native';
import { g } from '~/lib/styles';
import Button from '~/components/Button';
export default function Devotionals() {
  return (
    <View style={g.screen}>
      <Text style={g.h1}>Daily Devotions</Text>
      <Text style={g.p}>Start your day in the Scriptures and good news of Jesus.</Text>
      <Button title="Open Devotionals" onPress={() => Linking.openURL('https://example.com/devotionals')} />
    </View>
  );
}
