import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Button,
} from "react-native";

export default function TabBar({ onPressTab }) {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <Pressable style={styles.tabItem} onPress={() => onPressTab("info")}>
          <Text style={styles.tabTitle}>Info</Text>
        </Pressable>
        <Pressable
          style={styles.tabItem}
          onPress={() => onPressTab("character")}
        >
          <Text style={styles.tabTitle}>Characters</Text>
        </Pressable>
        <Pressable style={styles.tabItem} onPress={() => onPressTab("staff")}>
          <Text style={styles.tabTitle}>Staff</Text>
        </Pressable>
        <Pressable
          style={styles.tabItem}
          onPress={() => onPressTab("recommendation")}
        >
          <Text style={styles.tabTitle}>Recommendation</Text>
        </Pressable>
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
