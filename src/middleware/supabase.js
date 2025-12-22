import { createClient } from '@supabase/supabase-js';
import { prisma } from '../lib/prisma.js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API);
// Upload file to user's supabase
async function uploadFile(userId, file, folder) {
    if (!file)
        throw new Error('No file provided');
    const { data, error } = await supabase.storage
        .from('folder')
        .upload(`${userId}/${folder}/${file.originalname}`, file.buffer, {
        upsert: false,
    });
    if (error)
        return null;
    return data;
}
// Upload file url from supabase to neon database
export async function uploadUrlToDb(userId, file, folder) {
    const result = await uploadFile(userId, file, folder);
    if (result === null)
        return null;
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
            profileId: profileId.id,
        },
        select: { id: true },
    });
    await prisma.file.create({
        data: {
            data: data.publicUrl,
            folderId: folderId.id,
            name: file.originalname,
            size: file.size,
        },
    });
    const availStorage = await prisma.profile.findUnique({
        where: { id: profileId.id },
    });
    await prisma.profile.update({
        where: {
            id: profileId.id,
        },
        data: {
            usedStorage: Math.round((Number(availStorage.usedStorage) - file.size / 1_000_000) * 100) / 100,
        },
    });
}
// Helper function to find folder name based on fileId input
async function getFolderName(fileId) {
    const file = await prisma.file.findFirst({ where: { id: Number(fileId) } });
    const folder = await prisma.folder.findFirst({
        where: { id: Number(file.folderId) },
    });
    return folder.name;
}
export async function deleteFromSupabase(fileName, userId, fileId) {
    const folderName = await getFolderName(fileId);
    const { data, error } = await supabase.storage
        .from('folder')
        .remove([`${userId}/${folderName}/${fileName}`]);
    if (error)
        throw error;
    return data;
}
//# sourceMappingURL=supabase.js.map