import { Router } from 'express';
import getFolders from '../middleware/getFolders.js';
import { prisma } from '../lib/prisma.js';

const storagePage = Router();

storagePage.get(`/:folders`, getFolders, (req, res) => {
  console.log('hi');
  res.render('storage', {
    user: req.user,
    folders: req.folders,
  });
});
storagePage.get('/', getFolders, async (req, res) => {
  res.render('storage', {
    user: req.user,
    folders: req.folders,
    selectedFolder: req.query.folders,
  });
});

storagePage.post('/', async (req, res) => {
  const { action } = req.body;
  let profileId = null;

  if (action === 'create') {
    if (req.user) {
      profileId = await prisma.profile.findUnique({
        where: { userId: req.user.id },
        select: { id: true },
      });
    }

    if (profileId && req.user) {
      await prisma.folder.create({
        data: { name: req.body.folderName, profileId: profileId.id },
      });
    }
  }

  res.redirect('storage');
});

export default storagePage;
