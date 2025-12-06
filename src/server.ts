import dotenv from 'dotenv';
import app from './app.ts';

dotenv.config();

const PORT = process.env.SERVER || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
