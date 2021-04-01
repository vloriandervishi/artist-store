const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    ArtCount: Int
    savedArts: [Art]
  }

  type Art {
    ArtId: ID!
    authors: [String]
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
    authors: [String]
    description: String!
    ArtId: String!
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
    saveArt(ArtData: ArtInput!): User
    removeArt(ArtId: ID!): User
  }
`;

module.exports = typeDefs;
