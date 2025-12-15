import { Router } from 'express';
import getFolders from '../middleware/getFolders.js';
import cdFolder from '../middleware/cdFolder.js';

const storagePage = Router();

storagePage.get('/', getFolders, async (req, res) => {
  res.render('storage', {
    user: req.user,
    folders: req.folders,
    selectedFolder: req.query.folders,
  });
});

storagePage.post('/', cdFolder);

export default storagePage;
