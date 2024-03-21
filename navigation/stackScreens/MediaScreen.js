import { Text, View } from "react-native";

export default function MediaScreen({ route }) {
  const { animeId } = route.params;

  return (
    <View>
      <Text>{animeId}</Text>
    </View>
  );
}
