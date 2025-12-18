import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { File } from 'buffer';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API!
);

export async function uploadFile(
  userId: string | number,
  file: Express.File | any,
  folder: string
) {
  if (!file) throw new Error('No file provided');

  const { data, error } = await supabase.storage
    .from('folder')
    .upload(`${userId}/${folder}/${file.originalname}`, file.buffer, {
      upsert: true,
    });

  if (error) throw error;
  return data;
}
