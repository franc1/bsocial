export interface LoginBody {
  id: number;
  email: string;
  username: string;
  timestamp: number;
}

export interface LoginResult {
  hits: {
    total: number;
    hits: Array<{
      _source: LoginBody;
    }>;
  };
}
