import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const localClient = new Pool({
  connectionString: process.env.LOCAL_CONNECTION,
});

export default localClient;
