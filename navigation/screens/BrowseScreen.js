import * as React from "react";
import { View, Text } from "react-native";

export default function BrowseScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert('This is the "Browse" screen.')}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Browse Screen
      </Text>
    </View>
  );
}
