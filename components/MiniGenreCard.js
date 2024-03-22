import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function MiniGenreCard({ category, text }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("MediaListScreen", {
          genre: text,
          category: category,
        })
      }
    >
      <View style={styles.card}>
        <Text style={styles.cardName}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    alignSelf: "flex-start",
  },
  cardName: {
    textAlign: "center",
    fontSize: 14,
    // color: "white",
  },
});
