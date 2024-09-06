"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./instrument");
const Sentry = __importStar(require("@sentry/node"));
const apollo_server_express_1 = require("apollo-server-express");
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const topics_resolver_1 = __importDefault(require("./topics.resolver"));
const helmet_1 = __importDefault(require("helmet"));
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
    app.use((0, compression_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use((0, helmet_1.default)());
    Sentry.setupExpressErrorHandler(app);
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
