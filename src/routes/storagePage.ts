import { Router } from 'express';
import getFolders from '../middleware/getFolders.js';
import cdFolder from '../middleware/cdFolder.js';
import folderValidator from '../validators/folder.validator.js';
import folderValidMw from '../middleware/folder.validResults.js';
import getFiles from '../middleware/getFiles.js';

const storagePage = Router();

storagePage.get('/', getFolders, getFiles, async (req, res) => {
  console.log(req.dbFile);
  res.render('storage', {
    user: req.user,
    folders: req.folders,
    // sif new folder is created or active one deleted set curr folder to last in folders list
    selectedFolder:
      req.query.folders || req.folders[req.folders.length - 1].name,
    files: req.dbFile,
  });
});

storagePage.post('/', folderValidator, folderValidMw, cdFolder);

export default storagePage;
