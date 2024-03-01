import { gql } from "@apollo/client";

export const GET_GENRE_LIST = gql`
  query {
    GenreCollection
  }
`;

export const LOAD_MEDIA = gql`
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
