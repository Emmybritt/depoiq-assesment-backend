"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicService = void 0;
const topic_model_1 = require("./model/topic.model");
class TopicService {
    async findManyTopics(input) {
        const { lean = true, limit = 12, name, offset = 0, page = 1, populate = [], search, select = [], sort = ["createdAt", "1"], } = input;
        const query = {};
        if (name)
            query.name = { $in: name };
        if (search)
            query.$or = search.map((term) => ({ name: new RegExp(term, "i") }));
        // Calculate the skip value considering the offset
        const skipValue = offset + (page - 1) * limit;
        const docs = await topic_model_1.TopicModel.find(query)
            .select(select.join(" "))
            .skip(skipValue)
            .limit(limit)
            .sort(sort.join(" "))
            .lean(lean)
            .populate(populate.join(" "));
        const totalDocs = await topic_model_1.TopicModel.countDocuments(query);
        const totalPages = Math.ceil(totalDocs / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        return {
            docs,
            hasNextPage,
            hasPrevPage,
            limit,
            nextPage: hasNextPage ? page + 1 : null,
            offset,
            page,
            pagingCounter: skipValue + 1,
            prevPage: hasPrevPage ? page - 1 : null,
            totalDocs,
            totalPages,
        };
    }
    async addTopic(input) {
        const newTopic = new topic_model_1.TopicModel(input);
        await newTopic.save();
        return newTopic;
    }
    async updateTopic(id, input) {
        return topic_model_1.TopicModel.findByIdAndUpdate(id, input, {
            new: true,
            runValidators: true,
        }).lean();
    }
}
exports.TopicService = TopicService;
