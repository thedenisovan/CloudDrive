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
      buffer: Buffer; // better than Blob in Node
      size: number;
    }

    interface DbFile {
      data: string;
      id: number;
      name: string;
      createdAt: Date;
      size: number;
      folderId: number;
    }

    interface Request {
      folders?: any;
      user?: User;
      file?: File;
      dbFile?: DbFile[]; // or Array<File>
    }
  }
}

export {};
