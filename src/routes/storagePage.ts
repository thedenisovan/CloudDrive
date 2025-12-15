import { Router } from 'express';
import getFolders from '../middleware/getFolders.js';
import cdFolder from '../middleware/cdFolder.js';
import folderValidator from '../validators/folder.validator.js';
import folderValidMw from '../middleware/folder.validResults.js';

const storagePage = Router();

storagePage.get('/', getFolders, async (req, res) => {
  res.render('storage', {
    user: req.user,
    folders: req.folders,
    selectedFolder: req.query.folders || 'All Files',
  });
});

storagePage.post('/', folderValidator, folderValidMw, cdFolder);

export default storagePage;
