import { StatusBar } from "expo-status-bar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StyleSheet, Text, View } from "react-native";
import MainContainer from "./navigation/MainContainer";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          Page: {
            merge(existing, incoming) {
              const merged = { ...existing };
              if (existing && incoming) {
                merged.pageInfo = incoming.pageInfo;
                merged.media = [
                  ...(existing.media || []),
                  ...(incoming.media || []),
                ];
              } else if (incoming) {
                merged.pageInfo = incoming.pageInfo;
                merged.media = incoming.media || [];
              }
              return merged;
            },
          },
        },
      },
    },
  }),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MainContainer />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
