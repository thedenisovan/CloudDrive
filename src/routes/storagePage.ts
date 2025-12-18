import { Router } from 'express';
import getFolders from '../middleware/getFolders.js';
import cdFolder from '../middleware/cdFolder.js';
import folderValidator from '../validators/folder.validator.js';
import folderValidMw from '../middleware/folder.validResults.js';
import getFiles from '../middleware/getFiles.js';
import { prisma } from '../lib/prisma.js';

const storagePage = Router();

storagePage.get('/', getFolders, getFiles, async (req, res) => {
  res.render('storage', {
    user: req.user,
    profile: await prisma.profile.findUnique({
      where: { userId: req.user!.id },
    }),
    folders: req.folders,
    selectedFolder:
      req.query.folders || req.folders[req.folders.length - 1].name,
    files: req.dbFile,
  });
});

storagePage.post('/', folderValidator, folderValidMw, cdFolder);

export default storagePage;
