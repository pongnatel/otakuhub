import { gql } from "@apollo/client";

export const GET_GENRE_LIST = gql`
  query {
    GenreCollection
  }
`;

export const LOAD_MEDIA_LIST = gql`
  query ($type: MediaType, $genre: String, $sort: [MediaSort], $page: Int) {
    Page(page: $page, perPage: 8) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(type: $type, genre: $genre, sort: $sort) {
        id
        title {
          english
          romaji
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        format
        type
      }
    }
  }
`;

export const LOAD_MEIDA_BY_ID = gql`
  query ($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      description
      season
      seasonYear
      episodes
      chapters
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      coverImage {
        extraLarge
        large
        medium
        color
      }
      genres
      favourites
    }
  }
`;
