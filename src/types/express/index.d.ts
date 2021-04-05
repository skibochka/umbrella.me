declare namespace Express {
  export interface Request {
    user?: {
      id?: number;
      login?: string;
      isAdmin?: boolean;
    }
    files?: {
      avatar?: any
    }
  }
}
