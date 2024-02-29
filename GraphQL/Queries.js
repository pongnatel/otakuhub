import { gql } from "@apollo/client";

export const GET_GENRE_LIST = gql`
  query {
    GenreCollection
  }
`;

export const LOAD_MEDIA = gql`
  query ($type: MediaType, $genre: String) {
    Page(page: 1, perPage: 20) {
      media(type: $type, genre: $genre) {
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
