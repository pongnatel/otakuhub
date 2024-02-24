import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import GenreCard from "../../components/GenreCard";
import { GET_GENRE_LIST } from "../../GraphQL/Queries";

export default function BrowseScreen({ navigation }) {
  const { data } = useQuery(GET_GENRE_LIST);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (data && data.GenreCollection) {
      setGenres(data.GenreCollection);
    }
  }, [data]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {genres.map((genre, index) => (
          <GenreCard key={index} text={genre} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
  },
});
