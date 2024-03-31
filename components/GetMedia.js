import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import React from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import AnimeCard from "./AnimeCard";
import { LOAD_MEDIA_LIST } from "../GraphQL/Queries";

function GetMedia({ category, genre, sort }) {
  const type = category.toUpperCase();
  const [mediaList, setMediaList] = useState([]);
  // Keep track the ids of rendered items
  const [renderedItems, setRenderedItems] = useState(new Set());
  const [pageInfo, setPageInfo] = useState({});
  const { data, loading, fetchMore, error } = useQuery(LOAD_MEDIA_LIST, {
    variables: { type: type, genre: genre, sort: sort },
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  useEffect(() => {
    if (!loading && data) {
      //update the set of id of rendered items
      const updateRenderedItem = new Set(
        data.Page.media.map((mediaItem) => mediaItem.id)
      );
      setRenderedItems(updateRenderedItem);

      //update medialist
      setMediaList(data.Page.media);
      setPageInfo(data.Page.pageInfo);

      // for debugging
      // print the current page and size of medialist
      console.log(pageInfo.currentPage + " " + renderedItems.size);
    }
  }, [data, loading]);

  const fetchMoreData = () => {
    if (!loading && data && pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          page: pageInfo.currentPage + 1,
          type,
          genre,
          sort,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          const newMedia = fetchMoreResult.Page.media.filter(
            (newItem) => !renderedItems.has(newItem.id)
          );

          setRenderedItems(
            new Set([...renderedItems, ...newMedia.map((item) => item.id)])
          );

          return {
            Page: {
              ...fetchMoreResult.Page,
              media: [...prev.Page.media, ...newMedia],
            },
          };
        },
        onError: (error) => {
          if (error.networkError && error.networkError.statusCode === 500) {
            // Retry fetchMore after a delay
            console.log("retry");
            setTimeout(fetchMoreData, 2000); // Retry after 2 seconds (adjust as needed)
          } else {
            console.error("An error occurred while fetching more data:", error);
            // Handle other types of errors here
          }
        },
      });
    }
  };

  const renderFooter = () => {
    return loading ? <Text>Loading more...</Text> : null;
  };

  if (error) {
    return <Text>An error occurred. Please try again later.</Text>;
  }

  return (
    <View>
      <FlatList
        data={mediaList}
        renderItem={({ item }) => (
          <AnimeCard
            key={item.id}
            animeId={item.id}
            title={item.title}
            image={item.coverImage.large}
            format={item.format}
            type={item.type}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>List Empty</Text>}
        numColumns={2}
        ListFooterComponent={renderFooter}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

export default GetMedia;
