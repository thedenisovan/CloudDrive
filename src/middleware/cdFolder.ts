import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { deleteFromSupabase } from './supabase.js';

export default async function cdFolder(req: Request, res: Response) {
  const { action, selectedFolder, fileId, fileName, folderName } = req.body;
  let profileId = null;

  try {
    profileId = await prisma.profile.findUnique({
      where: { userId: req.user!.id },
      select: { id: true },
    });

    if (action === 'create') {
      await prisma.folder.create({
        data: { name: folderName, profileId: profileId!.id },
      });
    } else if (action === 'delete') {
      await prisma.folder.deleteMany({
        where: {
          name: selectedFolder,
          profileId: profileId!.id,
        },
      });
    } else if (action === 'deleteFile') {
      deleteFromSupabase(fileName, req.user!.id, fileId);
      await prisma.file.delete({
        where: {
          id: Number(fileId),
        },
      });
    }

    res.redirect('/storage?folders=All+Files');
  } catch {
    res.status(404).redirect('404');
    throw new Error('Error durning CRUD operation.');
  }
}
