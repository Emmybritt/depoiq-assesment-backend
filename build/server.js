"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const topics_resolver_1 = __importDefault(require("./topics.resolver"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const typeDefs = (0, apollo_server_express_1.gql) `
  ${fs_1.default.readFileSync(path_1.default.resolve(__dirname, "./schema.gql"), "utf8")}
`;
const MONGO_URI = `${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}` ?? "";
mongoose_1.default
    .connect(MONGO_URI, {})
    .then(async () => {
    console.log("Connected to MongoDB");
    const server = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers: topics_resolver_1.default });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: "*",
        credentials: true,
    }));
    await server.start();
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}${server.graphqlPath}`);
    });
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
});
