declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      name: string;
      surname: string;
      password: string;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      folders: any;
      user: any;
    }
  }
}

export {};
