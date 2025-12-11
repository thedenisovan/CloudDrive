import { Router } from 'express';
import getFolders from '../middleware/getFolders.js';

const storagePage = Router();

storagePage.get('/', getFolders, async (req, res) => {
  res.render('storage', { user: req.user, folders: req.folders });
});
export default storagePage;
