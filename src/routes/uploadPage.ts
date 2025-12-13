import { Router } from 'express';
import getFolders from '../middleware/getFolders.js';
import upload from '../middleware/multerConfig.js';

const uploadPage = Router();

uploadPage.get('', getFolders, (req, res) => {
  res.render('uploadFileForm', { folders: req.folders });
});

uploadPage.post('', upload.single('file'), (req, res) => {
  res.redirect('storage');
});

export default uploadPage;
