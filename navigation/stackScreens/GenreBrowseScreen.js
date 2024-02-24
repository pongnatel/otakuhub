import * as React from "react";
import { View, Text } from "react-native";

export default function GenreBrowseScreen({ route, navigation }) {
  const { genre } = route.params;
  return <Text>Genre Browse Screen: {genre}</Text>;
}
