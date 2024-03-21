import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import React from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import AnimeCard from "./AnimeCard";
import { LOAD_MEDIA } from "../GraphQL/Queries";

function GetMedia({ category, genre, sort }) {
  const type = category.toUpperCase();
  const [mediaList, setMediaList] = useState([]);
  // Keep track the ids of rendered items
  const [renderedItems, setRenderedItems] = useState(new Set());
  const [pageInfo, setPageInfo] = useState({});
  const { data, loading, fetchMore } = useQuery(LOAD_MEDIA, {
    variables: { type: type, genre: genre, sort: sort },
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
          page: pageInfo.currentPage + 1, // Fetch next page
          type: type,
          genre: genre,
          sort: sort,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          else {
            const updateMedia = fetchMoreResult.Page.media.filter(
              (mediaItem) => {
                // Check if the media item id is not in the renderedItems set
                if (!renderedItems.has(mediaItem.id)) {
                  return true; // Keep this media item in the filtered array
                }
                return false; // Exclude this media item from the filtered array
              }
            );

            // Merge the new media to the existing media list
            return {
              Page: {
                ...fetchMoreResult.Page,
                media: [...prev.Page.media, ...updateMedia],
              },
            };
          }
        },
      });
    }
  };

  const renderFooter = () => {
    return loading ? <Text>Loading more...</Text> : null;
  };

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
