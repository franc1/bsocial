export interface CommentBody {
  senderUsername: string;
  senderEmail: string;
  senderId: number;
  timestamp: number;
  postId: number;
  commentId: number;
  commentContent: string;
}

export interface CommentResult {
  hits: {
    total: number;
    hits: Array<{
      _source: CommentBody;
    }>;
  };
}
