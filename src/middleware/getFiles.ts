import { prisma } from '../lib/prisma.js';
import { Request, Response, NextFunction } from 'express-serve-static-core';

export default async function getFiles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const currFolder = req.query.folders;

  const profile = await prisma.profile.findFirst({
    where: { userId: req.user!.id },
    select: { id: true },
  });

  const folder = await prisma.folder.findFirst({
    where: {
      profileId: profile!.id,
      name: currFolder as string,
    },
  });

  // If user is currently in all files folder display all files else display single folder files
  const whereClause =
    currFolder !== 'All Files'
      ? { folderId: folder!.id }
      : { folder: { profileId: profile!.id } };

  let files = await prisma.file.findMany({ where: whereClause });

  req.dbFile = files;

  next();
}
