import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import GetMangaWSort from "../../components/GetRecManga/GetMangaWSort";

export default function MangaScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRENDING</Text>
        <GetMangaWSort sort={"TRENDING_DESC"} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>POPULAR</Text>
        <GetMangaWSort sort={"POPULARITY_DESC"} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PEOPLE ALSO LIKE</Text>
        <GetMangaWSort sort={"FAVORITE_DESC"} />
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
