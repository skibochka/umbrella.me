declare namespace Express {
  export interface Request {
    user?: {
      id?: number;
      name?: string;
      role?: string;
      phoneNumber?: string;
    }
    files?: {
      avatar?: any
    }
  }
}
