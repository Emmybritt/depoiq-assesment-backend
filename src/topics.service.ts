import {
  AddTopicInput,
  FindManyTopicsInput,
  FindManyTopicsResponseDto,
  Topic,
  UpdateTopicInput,
} from "./interfaces/topic.interface";
import { TopicModel } from "./model/topic.model";

export class TopicService {
  async findManyTopics(
    input: FindManyTopicsInput
  ): Promise<FindManyTopicsResponseDto> {
    const {
      lean = true,
      limit = 12,
      name,
      offset = 0,
      page = 1,
      populate = [],
      search,
      select = [],
      sort = ["createdAt", "1"],
    } = input;

    const query: any = {};
    if (name) query.name = { $in: name };
    if (search)
      query.$or = search.map((term) => ({ name: new RegExp(term, "i") }));

    // Calculate the skip value considering the offset
    const skipValue = offset + (page - 1) * limit;

    const docs = await TopicModel.find(query)
      .select(select.join(" "))
      .skip(skipValue)
      .limit(limit)
      .sort(sort.join(" "))
      .lean(lean)
      .populate(populate.join(" "));

    const totalDocs = await TopicModel.countDocuments(query);
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

  async addTopic(input: AddTopicInput): Promise<Topic> {
    const newTopic = new TopicModel(input);
    await newTopic.save();
    return newTopic;
  }
  async updateTopic(
    id: string,
    input: UpdateTopicInput
  ): Promise<Topic | null> {
    return TopicModel.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    }).lean();
  }
}
