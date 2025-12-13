import { Router } from 'express';
import getFolders from '../middleware/getFolders.js';

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
  res.redirect('storage');
  console.log(req.query.folders);
});

export default storagePage;
