import {
  AddTopicInput,
  FindManyTopicsInput,
  UpdateTopicInput,
} from "./interfaces/topic.interface";
import { TopicService } from "./topics.service";

const topicService = new TopicService();

const resolvers = {
  Query: {
    async findManyTopics(
      _: any,
      { topicsInput }: { topicsInput: FindManyTopicsInput }
    ) {
      return topicService.findManyTopics(topicsInput);
    },
  },
  Mutation: {
    async addTopic(_: any, { input }: { input: AddTopicInput }) {
      return topicService.addTopic(input);
    },

    updateTopic: async (
      _: any,
      { id, input }: { id: string; input: UpdateTopicInput }
    ) => {
      return await topicService.updateTopic(id, input);
    },
  },
};

export default resolvers;
