import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function GenreCard({ text }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("GenreStack", { genre: text })}
    >
      <View style={styles.card}>
        <Text style={styles.cardName}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    alignSelf: "flex-start",
  },
  cardName: {
    textAlign: "center",
    fontSize: 25,
    // color: "white",
  },
});
