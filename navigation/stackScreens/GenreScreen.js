import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import GenreCard from "../../components/GenreCard";
import { GET_GENRE_LIST } from "../../GraphQL/Queries";

export default function GenreScreen({ route, navigation }) {
  const { category } = route.params;
  const [genres, setGenres] = useState([]);

  const { data } = useQuery(GET_GENRE_LIST);

  useEffect(() => {
    if (data && data.GenreCollection) {
      setGenres(data.GenreCollection);
    }
  }, [data]);
  if (category === "Character") return <Text>Browse: {category}</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Genre </Text>

      <View style={styles.genreContainer}>
        {genres.map((genre, index) => {
          if (genre != "Hentai" && genre != "Ecchi") {
            return <GenreCard key={index} text={genre} category={category} />;
          }
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  genreContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 25,
  },
});
