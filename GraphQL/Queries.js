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

export const LOAD_MEDIA_BY_ID = gql`
  query ($id: Int) {
    Media(id: $id) {
      id
      startDate {
        year
        month
        day
      }
      status
      type
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

export const LOAD_TRENDING_ANIME = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, sort: TRENDING_DESC) {
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
