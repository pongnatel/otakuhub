import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { useEffect, useState } from "react";

import BrowseOptionCard from "../../components/BrowseOptionCard";

export default function BrowseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <BrowseOptionCard text={"Anime"} />
      <BrowseOptionCard text={"Manga"} />
      <BrowseOptionCard text={"Character"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 30,
    justifyContent: "center",
  },
});
