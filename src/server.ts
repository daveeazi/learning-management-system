// import express from "express";
// import { ApolloServer, gql } from "apollo-server-express";
// import cors from "cors";
// import helmet from "helmet";
// import dotenv from "dotenv";
// import mongoose from 'mongoose';
// import { bookResolver } from './resolvers/bookResolver';
// import { studentResolver } from './resolvers/studentResolver';
// import { teacherResolver } from './resolvers/teacherResolver';

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(helmet());
// app.use(express.json());

// // ✅ Define GraphQL schema
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// // ✅ Define resolvers
// const resolvers = {
//   Query: {
//     hello: () => "Hello, GraphQL!"
//   }
// };

// // ✅ Set up Apollo Server
// const server = new ApolloServer({
//     typeDefs: `type Query { hello: String }`,
//     resolvers: { Query: { hello: () => "Hello, GraphQL!" } },
//     introspection: true, // Enable introspection for queries
//   });

// async function startServer() {
//   await server.start();
//   server.applyMiddleware({ app: app as any, path: '/graphql' });

//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//     console.log(`GraphQL available at http://localhost:${PORT}/graphql`);
//   });
// }

// startServer();

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import { typeDefs } from './schema/schema';
import { bookResolver } from './resolvers/bookResolver';
import { studentResolver } from './resolvers/studentResolver';
import { teacherResolver } from './resolvers/teacherResolver';
import bookRoutes from './routes/bookRoutes';
import studentRoutes from './routes/studentRoutes';
import teacherRoutes from './routes/teacherRoutes';

// Initialize Express app
const app = express();

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers: [bookResolver, studentResolver, teacherResolver],
});

// Apply Apollo middleware
server.applyMiddleware({ app: app as any, path: '/graphql' });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/library-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(4000, () => {
      console.log('Server is running on http://localhost:4000/graphql');
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
