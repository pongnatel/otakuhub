import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function BrowseOptionCard({ text }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("GenreScreen", {
          category: text,
        });
      }}
    >
      <View style={styles.card}>
        <Text style={styles.cardName}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "85%",
    height: 150,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "black",
    justifyContent: "center",
    alignSelf: "center",
  },
  cardName: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    // color: "white",
  },
});
