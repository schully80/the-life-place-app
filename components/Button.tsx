
import { Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { g } from '~/lib/styles';
export default function Button({ title, onPress }: { title: string; onPress?: (e: GestureResponderEvent) => void; }) {
  return (
    <TouchableOpacity style={g.button} onPress={onPress}>
      <Text style={g.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
