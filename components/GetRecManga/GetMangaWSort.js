import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { LOAD_MEDIA_W_SORT } from "../../GraphQL/Queries";
import AnimeCard from "../AnimeCard";

const GetMangaWSort = ({ sort }) => {
  const [mediaList, setMediaList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  const { loading, error, data, fetchMore } = useQuery(LOAD_MEDIA_W_SORT, {
    variables: { page: 1, perPage: 3, type: "MANGA", sort: sort },
    fetchPolicy: "cache-and-networks",
    errorPolicy: "all",
  });

  useEffect(() => {
    if (!loading && data) {
      setMediaList(data.Page.media);
      setPageInfo(data.Page.pageInfo);
    }
  }, [data, loading]);

  const fetchMoreData = () => {
    if (!loading && data && pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          page: pageInfo.currentPage + 1,
          perPage: 3,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const updateMedia = fetchMoreResult.Page.media.filter(
            (mediaItem) => !mediaList.some((item) => item.id === mediaItem.id)
          );
          setMediaList([...mediaList, ...updateMedia]);
          setPageInfo(fetchMoreResult.Page.pageInfo);
        },
      });
    }
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator /> : null;
  };

  if (loading && !mediaList.length) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
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
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<Text>List Empty</Text>}
      onEndReached={fetchMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
    />
  );
};

export default GetMangaWSort;
