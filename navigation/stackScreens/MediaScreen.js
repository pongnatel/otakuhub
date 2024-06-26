import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { useQuery } from "@apollo/client";
import { LOAD_MEDIA_BY_ID } from "../../GraphQL/Queries";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import MiniGenreCard from "../../components/MiniGenreCard";

export default function MediaScreen({ route }) {
  const { animeId } = route.params;
  const { width } = useWindowDimensions();
  const { loading, error, data } = useQuery(LOAD_MEDIA_BY_ID, {
    variables: { id: animeId },
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const media = data?.Media;

  console.log("Media:", media);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={{
              uri: media.bannerImage
                ? media.bannerImage
                : media.coverImage.extraLarge,
            }}
            accessibilityLabel={"${title} anime"}
            style={styles.image}
            resizeMode="cover"
          ></Image>
        </View>
        <View>
          <Text style={styles.title}>
            {media.title.english ? media.title.english : media.title.romaji}
          </Text>
        </View>
        <View style={styles.shortInfo}>
          {media.startDate.year ? <Text>{media.startDate.year}</Text> : null}
          {media.season ? <Text>{media.season}</Text> : null}
          {media.episodes ? <Text>{media.episodes} episodes</Text> : null}
          {media.chapters ? <Text>{media.chapters} chapters</Text> : null}
          <Text style={{ fontWeight: "500" }}>{media.status}</Text>
        </View>
        <View style={styles.genreContainer}>
          {media.genres.map((genre, index) => {
            if (genre != "Hentai" && genre != "Ecchi") {
              return (
                <MiniGenreCard key={index} text={genre} category={media.type} />
              );
            }
          })}
        </View>
        <RenderHtml contentWidth={width} source={{ html: media.description }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 0,
    marginBottom: 5,
    backgroundColor: "#F8F7F4",
  },
  image: {
    width: "100%",
    height: 400,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  shortInfo: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },
  genreContainer: {
    marginVertical: 5,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
  },
});
