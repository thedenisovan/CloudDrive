import { body } from 'express-validator';
import { prisma } from '../lib/prisma.js';

const folderValidator = [
  body('folderName').custom(async (value, { req }) => {
    const { action } = req.body;

    if (action === 'create') {
      const profile = await prisma.profile.findUnique({
        where: { userId: req.user.id },
      });

      if (!profile) return;

      const folder = await prisma.folder.findFirst({
        where: { profileId: profile.id, name: value },
      });

      if (folder) throw new Error('Folder with given name exists.');
    }
  }),
];

export default folderValidator;
