import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export default async function cdFolder(req: Request, res: Response) {
  const { action, selectedFolder } = req.body;
  let profileId = null;

  try {
    profileId = await prisma.profile.findUnique({
      where: { userId: req.user!.id },
      select: { id: true },
    });

    if (action === 'create' && profileId) {
      await prisma.folder.create({
        data: { name: req.body.folderName, profileId: profileId.id },
      });
    }

    if (action === 'delete' && profileId) {
      await prisma.folder.deleteMany({
        where: {
          name: selectedFolder,
          profileId: profileId.id,
        },
      });
    }

    res.redirect('storage');
  } catch {
    res.status(404).redirect('404');
    throw new Error('Error durning CRUD operation.');
  }
}
