"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topics_service_1 = require("./topics.service");
const topicService = new topics_service_1.TopicService();
const resolvers = {
    Query: {
        async findManyTopics(_, { topicsInput }) {
            return topicService.findManyTopics(topicsInput);
        },
    },
    Mutation: {
        async addTopic(_, { input }) {
            return topicService.addTopic(input);
        },
        updateTopic: async (_, { id, input }) => {
            return await topicService.updateTopic(id, input);
        },
    },
};
exports.default = resolvers;
