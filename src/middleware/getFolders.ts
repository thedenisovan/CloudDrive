import { prisma } from '../lib/prisma.js';
import { Request, Response, NextFunction } from 'express-serve-static-core';

// get all folder what are available for current user
export default async function getFolders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let folders;
  let profileId;

  if (req.user) {
    profileId = await prisma.profile.findFirst({
      where: { userId: req.user.id },
      select: { id: true },
    });

    if (profileId) {
      folders = await prisma.folder.findMany({
        where: {
          profileId: profileId.id,
        },
      });
    }
  }

  req.folders = folders;

  next();
}
