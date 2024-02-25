import * as React from "react";
import { View, Text } from "react-native";

export default function BrowseByScreen({ route, navigation }) {
  const { category } = route.params;
  return <Text>Browse: {category}</Text>;
}
