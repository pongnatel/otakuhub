import { gql } from "@apollo/client";

export const GET_GENRE_LIST = gql`
  query {
    GenreCollection
  }
`;
