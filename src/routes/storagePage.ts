import { Router } from 'express';
import getFolders from '../middleware/getFolders.js';
import cdFolder from '../middleware/cdFolder.js';
import folderValidator from '../validators/folderValidator.js';
import folderValidMw from '../middleware/folderValidator.result.js';

const storagePage = Router();

storagePage.get('/', getFolders, async (req, res) => {
  res.render('storage', {
    user: req.user,
    folders: req.folders,
    selectedFolder: req.query.folders,
  });
});

storagePage.post('/', folderValidator, folderValidMw, cdFolder);

export default storagePage;
