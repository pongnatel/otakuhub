import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import React from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import AnimeCard from "./AnimeCard";
import { LOAD_MEDIA } from "../GraphQL/Queries";

function GetMedia({ category, genre, sort }) {
  const type = category.toUpperCase();
  const [mediaList, setMediaList] = useState([]);
  const [renderedItems, setRenderedItems] = useState(new Set());
  const [pageInfo, setPageInfo] = useState({});
  const { data, loading, fetchMore } = useQuery(LOAD_MEDIA, {
    variables: { type: type, genre: genre, sort: sort },
  });

  useEffect(() => {
    if (!loading && data) {
      setMediaList(data.Page.media);
      setPageInfo(data.Page.pageInfo);
      console.log(pageInfo.currentPage + " " + pageInfo.hasNextPage);
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
          return {
            Page: {
              ...fetchMoreResult.Page,
              media: [...prev.Page.media, ...fetchMoreResult.Page.media],
            },
          };
        },
      });
    }
  };

  const renderFooter = () => {
    return loading ? <Text>Loading more...</Text> : null;
  };

  return (
    <View>
      {/* <TextInput value={searchString} onChangeText={setSearchString} />
      <Button
        title="Search"
        onPress={() => refetch({ search: searchString })}
      ></Button> */}
      <FlatList
        data={mediaList}
        renderItem={({ item }) => (
          <AnimeCard
            key={item.id}
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
