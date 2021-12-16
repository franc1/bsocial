export interface RegisterBody {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  createdDate: number;
}

export interface RegisterResult {
  hits: {
    total: number;
    hits: Array<{
      _source: RegisterBody;
    }>;
  };
}
