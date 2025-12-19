import { createClient } from '@supabase/supabase-js';
import { prisma } from '../lib/prisma.js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API!
);

// Upload file to user's supabase
async function uploadFile(
  userId: string | number,
  file: Express.File,
  folder: string
) {
  if (!file) throw new Error('No file provided');

  const { data, error } = await supabase.storage
    .from('folder')
    .upload(`${userId}/${folder}/${file.originalname}`, file.buffer, {
      upsert: false,
    });

  if (error) return null;
  return data;
}

// Upload file url from supabase to neon database
export async function uploadUrlToDb(
  userId: string | number,
  file: Express.File,
  folder: string
) {
  const result = await uploadFile(userId, file, folder);

  if (result === null) return null;

  const { data } = await supabase.storage
    .from('folder')
    .getPublicUrl(`${userId}/${folder}/${file.originalname}`);

  const profileId = await prisma.profile.findUnique({
    where: {
      userId: Number(userId),
    },
    select: { id: true },
  });

  const folderId = await prisma.folder.findFirst({
    where: {
      name: folder,
      profileId: profileId!.id,
    },
    select: { id: true },
  });

  await prisma.file.create({
    data: {
      data: data.publicUrl,
      folderId: folderId!.id,
      name: file.originalname,
      size: file.size,
    },
  });
}

// Helper function to find folder name based on fileId input
async function getFolderName(fileId: string | number) {
  const file = await prisma.file.findFirst({ where: { id: Number(fileId) } });
  const folder = await prisma.folder.findFirst({
    where: { id: Number(file!.folderId) },
  });

  return folder!.name;
}

export async function deleteFromSupabase(
  fileName: string,
  userId: string | number,
  fileId: string | number
) {
  const folderName = await getFolderName(fileId);

  const { data, error } = await supabase.storage
    .from('folder')
    .remove([`${userId}/${folderName}/${fileName}`]);

  if (error) throw error;
  return data;
}
