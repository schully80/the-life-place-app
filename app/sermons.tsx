
import { View, Text, FlatList, Linking } from 'react-native';
import { g } from '~/lib/styles';
import Button from '~/components/Button';
const sermons = [{ id: '1', title: 'Grace That Saves', url: 'https://youtu.be/dQw4w9WgXcQ' }];
export default function Sermons() {
  return (
    <View style={g.screen}>
      <Text style={g.h1}>Sermons</Text>
      <FlatList data={sermons} keyExtractor={(i)=>i.id} renderItem={({ item }) => (
        <View style={g.card}>
          <Text style={g.p}>{item.title}</Text>
          <Button title="Watch on YouTube" onPress={() => Linking.openURL(item.url)} />
        </View>
      )}/>
    </View>
  );
}
