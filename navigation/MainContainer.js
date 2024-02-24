import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import AnimeScreen from "./screens/AnimeScreen";
import MangaScreen from "./screens/MangaScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import BrowseScreen from "./screens/BrowseScreen";
import GenreBrowseScreen from "./stackScreens/GenreBrowseScreen";

//Screen names
const animeTab = "Anime";
const mangaTab = "Manga";
const favoriteTab = "Favorite";
const browseTab = "Browse";
const browseStack = "BrowseStack";
const genreStack = "GenreStack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={animeTab}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === animeTab) {
              iconName = focused ? "film" : "film-outline";
            } else if (rn === mangaTab) {
              iconName = focused ? "book" : "book-outline";
            } else if (rn === favoriteTab) {
              iconName = focused ? "bookmark" : "bookmark-outline";
            } else if (rn === browseTab) {
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
        <Tab.Screen name={animeTab} component={AnimeScreen} />
        <Tab.Screen name={mangaTab} component={MangaScreen} />
        <Tab.Screen name={favoriteTab} component={FavoriteScreen} />
        <Tab.Screen
          name={browseTab}
          component={BrowseStackNavigator}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function BrowseStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={browseStack} component={BrowseScreen} />
      <Stack.Screen name={genreStack} component={GenreBrowseScreen} />
    </Stack.Navigator>
  );
}

export default MainContainer;
