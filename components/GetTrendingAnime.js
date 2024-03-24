import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { LOAD_TRENDING_ANIME } from "../GraphQL/Queries";
import AnimeCard from "./AnimeCard";

const GetTrendingAnime = () => {
  const [mediaList, setMediaList] = useState([]);
  // Keep track the ids of rendered items
  const [renderedItems, setRenderedItems] = useState(new Set());
  const [pageInfo, setPageInfo] = useState({});

  const { loading, error, data, fetchMore } = useQuery(LOAD_TRENDING_ANIME, {
    variables: { perPage: 3 },
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

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const fetchMoreData = () => {
    if (!loading && data && pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          page: pageInfo.currentPage + 1, // Fetch next page
          perPage: 3,
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
    return loading ? <ActivityIndicator /> : null;
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
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </View>
  );
};

export default GetTrendingAnime;
