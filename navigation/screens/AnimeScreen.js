import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import GetTrendingAnime from "../../components/GetRecAnime/GetTrendingAnime";
import GetPopularAnime from "../../components/GetRecAnime/GetPopularAnime";
import GetFavoriteAnime from "../../components/GetRecAnime/GetFavoriteAnime";

const baseUrl = "https://anilist.co/search/anime/trending";

export default function AnimeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRENDING</Text>
        <GetTrendingAnime />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>POPULAR</Text>
        <GetPopularAnime />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PEOPLE ALSO LIKE</Text>
        <GetFavoriteAnime />
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
