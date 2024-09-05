import { ApolloServer, gql } from "apollo-server-express";
import resolvers from "./topics.resolver";
import express from "express";
import fs from "fs";
import path from "path";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const typeDefs = gql`
  ${fs.readFileSync(path.resolve(__dirname, "./schema.gql"), "utf8")}
`;

const MONGO_URI =
  `${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}` ?? "";

mongoose
  .connect(MONGO_URI, {})
  .then(async () => {
    console.log("Connected to MongoDB");

    const server = new ApolloServer({ typeDefs, resolvers });

    const app = express();
    app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(
        `Server listening on http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
