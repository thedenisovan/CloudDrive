import { prisma } from '../lib/prisma.js';
import { deleteFromSupabase } from './supabase.js';
// Checks what is action value set to req.body and creates/deletes folder or file based on it
export default async function cdFolder(req, res) {
    const { action, selectedFolder, fileId, fileName, folderName, fileSize } = req.body;
    let profileId = null;
    try {
        profileId = await prisma.profile.findUnique({
            where: { userId: req.user.id },
            select: { id: true },
        });
        // Creates folder
        if (action === 'create') {
            await prisma.folder.create({
                data: { name: folderName, profileId: profileId.id },
            });
            // Deletes Folder
        }
        else if (action === 'delete') {
            await prisma.folder.deleteMany({
                where: {
                    name: selectedFolder,
                    profileId: profileId.id,
                },
            });
            // Deletes file and adds user storage space based on file size
        }
        else if (action === 'deleteFile') {
            const availStorage = await prisma.profile.findUnique({
                where: { id: profileId.id },
            });
            deleteFromSupabase(fileName, req.user.id, fileId);
            await prisma.file.delete({
                where: {
                    id: Number(fileId),
                },
            });
            await prisma.profile.update({
                where: {
                    id: profileId.id,
                },
                data: {
                    usedStorage: Math.round((Number(availStorage.usedStorage) + fileSize / 1_000_000) * 100) / 100,
                },
            });
        }
        res.redirect('/storage?folders=All+Files');
    }
    catch {
        res.status(404).redirect('404');
        throw new Error('Error durning CRUD operation.');
    }
}
//# sourceMappingURL=cdFolder.js.map