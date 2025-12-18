declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      name: string;
      surname: string;
      password: string;
    }
    interface File {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      buffer: Blob;
      size: number;
    }
    interface Request {
      folders: any;
      user: any;
      file: any;
    }
  }
}

export {};
