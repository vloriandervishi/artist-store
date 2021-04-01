const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    artCount: Int
    savedArtss: [Art]
  }

  type Art {
    artId: ID!
    artists: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input ArtInput {
    artists: [String]
    description: String!
    artId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveArt(artData: ArtInput!): User
    removeArt(artId: ID!): User
  }
`;

module.exports = typeDefs;
