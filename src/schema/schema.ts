import { gql } from 'apollo-server-express';

// Define the GraphQL types
export const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedDate: String
  }

  type Student {
    id: ID!
    name: String!
    books: [Book]
  }

  type Teacher {
    id: ID!
    name: String!
    students: [Student]
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    students: [Student]
    student(id: ID!): Student
    teachers: [Teacher]
    teacher(id: ID!): Teacher
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    updateBook(id: ID!, title: String, author: String): Book
    deleteBook(id: ID!): Book
    addStudent(name: String!): Student
    addTeacher(name: String!): Teacher
  }
`;
