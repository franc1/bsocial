import { Request } from 'express';

export class Token {
  constructor(
    public id: number,
    public email: string,
    public username: string,
  ) {}
}

export interface RequestWithToken extends Request {
  user: Token;
}
