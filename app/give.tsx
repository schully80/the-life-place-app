
import { View, Text, Linking } from 'react-native';
import { g } from '~/lib/styles';
import Button from '~/components/Button';
export default function Give() {
  return (
    <View style={g.screen}>
      <Text style={g.h1}>Give</Text>
      <Text style={g.p}>Support the work of The Life Place.</Text>
      <View style={g.card}>
        <Text style={g.p}>Bank Transfer (EFT)</Text>
        <Text style={g.p}>Standard Bank • Acc: 30 152 4351 • Branch: 051001</Text>
      </View>
      <View style={g.card}>
        <Text style={g.p}>Online Giving</Text>
        <Button title="Open Giving Page" onPress={() => Linking.openURL('https://example.com/give')} />
      </View>
    </View>
  );
}
