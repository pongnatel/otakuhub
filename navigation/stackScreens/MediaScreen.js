import { Text, View, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { LOAD_MEIDA_BY_ID } from "../../GraphQL/Queries";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

export default function MediaScreen({ route }) {
  const { animeId } = route.params;
  const { width } = useWindowDimensions();
  const { loading, error, data } = useQuery(LOAD_MEIDA_BY_ID, {
    variables: { id: animeId },
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const media = data?.Media;

  console.log("Media:", media);

  return (
    <View>
      <Text>{media.status}</Text>
      <RenderHtml contentWidth={width} source={{ html: media.description }} />
    </View>
  );
}
