import { StatusBar } from "expo-status-bar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StyleSheet, Text, View } from "react-native";
import MainContainer from "./navigation/MainContainer";

// Define your custom merge function
const customMergeFunction = (
  existing,
  incoming,
  { args: { page = 1, perPage = 10 } }
) => {
  // If no existing data, return the incoming data
  if (!existing) {
    return incoming;
  }

  // Merge pagination information
  const mergedPageInfo = {
    ...existing.pageInfo,
    ...incoming.pageInfo,
  };

  // Combine media items, ensuring uniqueness based on ID
  const mergedMedia = Array.from(
    new Map(
      [...existing.media, ...incoming.media].map((item) => [item.id, item])
    ).values()
  );

  return {
    ...incoming,
    pageInfo: mergedPageInfo,
    media: mergedMedia,
  };
};

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          Page: {
            keyArgs: ["type", "sort"],
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
