const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    user: User!
    todo(id: ID!): Todo!
    todos: [Todo!]!
  }

  type Mutation {
    signUp(fields: AuthInput!): User!
    loginUser(fields: AuthInput!): User!
    createTodo(fields: TodoInput!): Todo!
    updateTodo(fields: UpdateTodo!): Todo!
    deleteTodo(id: ID!): Todo!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    name: String
    lastname: String
    token: String
    todos: [Todo!]!
  }

  type Todo {
    _id: ID!
    title: String!
    content: String!
    author: String!
    status: TodoStatus
    created_at: String
    updated_at: String
  }

  input TodoInput {
    title: String!
    content: String!
    status: TodoStatus
  }

  input UpdateTodo {
    id: ID!
    status: TodoStatus
  }

  input AuthInput {
    email: String!
    password: String!
  }

  enum TodoStatus {
    NOT_DONE
    DONE
  }
`;

module.exports = { typeDefs };
