import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { IsString, IsDate, IsNotEmpty } from "class-validator";
import { Topic } from "../interfaces/topic.interface";

@modelOptions({
  schemaOptions: { collection: "topics" },
})
export class TopicSchema implements Topic {
  @prop({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @prop({ required: false })
  @IsString()
  result1: string;

  @prop({ required: false })
  @IsString()
  result2: string;

  @prop({ required: false })
  @IsString()
  result3: string;

  @prop({ required: false })
  @IsString()
  result4: string;

  @prop({ default: Date.now })
  @IsDate()
  createdAt: Date;
}

export const TopicModel = getModelForClass(TopicSchema);
