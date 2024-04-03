import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Button,
} from "react-native";

export default function TabBar() {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <Pressable style={styles.tabItem} onPress={() => alert("Hello")}>
          <Text style={styles.tabTitle}>Info</Text>
        </Pressable>
        <View style={styles.tabItem}>
          <Text style={styles.tabTitle}>Characters</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabTitle}>Staff</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabTitle}>Recommendation</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tabItem: {
    // backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tabTitle: {
    fontSize: 22,
    fontWeight: "500",
  },
});
