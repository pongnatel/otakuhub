import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import GetTrendingAnime from "../../components/GetTrendingAnime";
import GetPopularAnime from "../../components/GetPopularAnime";

const baseUrl = "https://anilist.co/search/anime/trending";

export default function AnimeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRENDING</Text>
        <GetTrendingAnime />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRENDING</Text>
        <GetPopularAnime />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRENDING</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginVertical: 10,
    marginLeft: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
