import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import React from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import AnimeCard from "./AnimeCard";
import { LOAD_MEDIA } from "../GraphQL/Queries";

function GetMedia({ category, genre }) {
  const type = category.toUpperCase();
  const { data } = useQuery(LOAD_MEDIA, {
    variables: { type: type, genre: genre },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <View>
      {/* <TextInput value={searchString} onChangeText={setSearchString} />
      <Button
        title="Search"
        onPress={() => refetch({ search: searchString })}
      ></Button> */}
      <FlatList
        data={data?.Page?.media || []}
        renderItem={({ item }) => (
          <AnimeCard
            title={item.title}
            image={item.coverImage.large}
            format={item.format}
            type={item.type}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>List Empty</Text>}
        numColumns={2}
      />
    </View>
  );
}

export default GetMedia;
