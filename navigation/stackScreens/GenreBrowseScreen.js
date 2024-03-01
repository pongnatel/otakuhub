import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import GetMedia from "../../components/GetMedia";

export default function GenreBrowseScreen({ route, navigation }) {
  const { category, genre } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        <GetMedia category={category} genre={genre} sort={["TRENDING_DESC"]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  mediaContainer: {},
});
