import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Pressable, Image, Text } from "react-native";

export default function AnimeCard({ animeId, title, image, format, type }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("MediaScreen", { animeId: animeId })}
      style={styles.card}
    >
      <Image
        source={{ uri: image }}
        accessibilityLabel={"${title} anime"}
        style={styles.image}
        resizeMode="contain"
      ></Image>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {title.english ? title.english : title.romaji}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text>{type}</Text>
        <Text> - </Text>
        <Text>{format}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    borderRadius: 10,
    margin: 16,
  },
  image: {
    width: "100%",
    height: 240,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  titleContainer: {
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionContainer: {
    backgroundColor: "transparent",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
  },
});
