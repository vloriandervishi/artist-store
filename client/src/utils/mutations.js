import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_ART = gql`
  mutation saveart($artData: artInput!) {
    saveart(artData: $artData) {
      _id
      username
      email
      savedarts {
        artId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const REMOVE_ART = gql`
  mutation removeart($artId: ID!) {
    removeart(artId: $artId) {
      _id
      username
      email
      savedarts {
        artId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
