import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import AnimeScreen from "./screens/AnimeScreen";
import MangaScreen from "./screens/MangaScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import BrowseScreen from "./screens/BrowseScreen";

//Screen names
const animeName = "Anime";
const mangaName = "Manga";
const favoriteName = "Favorite";
const browseName = "Browse";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={animeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === animeName) {
              iconName = focused ? "film" : "film-outline";
            } else if (rn === mangaName) {
              iconName = focused ? "book" : "book-outline";
            } else if (rn === favoriteName) {
              iconName = focused ? "bookmark" : "bookmark-outline";
            } else if (rn === browseName) {
              iconName = focused ? "search" : "search-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarStyle: { padding: 10, height: 70 },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
        })}
      >
        <Tab.Screen name={animeName} component={AnimeScreen} />
        <Tab.Screen name={mangaName} component={MangaScreen} />
        <Tab.Screen name={favoriteName} component={FavoriteScreen} />
        <Tab.Screen name={browseName} component={BrowseScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
