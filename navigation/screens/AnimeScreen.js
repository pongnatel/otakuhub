import * as React from "react";
import { View, Text } from "react-native";

export default function AnimeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert('This is the "Anime" screen.')}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Anime Screen
      </Text>
    </View>
  );
}
