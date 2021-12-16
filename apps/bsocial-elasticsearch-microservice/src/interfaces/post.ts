export interface PostBody {
  username: string;
  email: string;
  userId: number;
  timestamp: number;
  postId: number;
  messageContent: string;
}

export interface PostResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostBody;
    }>;
  };
}
