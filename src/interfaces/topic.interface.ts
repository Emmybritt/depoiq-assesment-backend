export interface Topic {
  name: string;
  result1: string;
  result2: string;
  result3: string;
  result4: string;
  createdAt: Date;
}
export interface FindManyTopicsInput {
  lean?: boolean;
  limit?: number;
  name?: string[];
  offset?: number;
  page?: number;
  populate?: string[];
  search?: string[];
  select?: string[];
  sort?: string[];
}

export interface FindManyTopicsResponseDto {
  docs: Topic[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  offset: number;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
}

export type AddTopicInput = Omit<Topic, "createdAt">;

export type UpdateTopicInput = Partial<AddTopicInput>;
