import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import GetTrendingAnime from "../../components/GetTrendingAnime";

const baseUrl = "https://anilist.co/search/anime/trending";

export default function AnimeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRENDING</Text>
        <GetTrendingAnime />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginVertical: 10,
    marginLeft: 5,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
