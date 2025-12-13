import { Router } from 'express';
import getFolders from '../middleware/getFolders';
import upload from '../middleware/multerConfig';

const uploadPage = Router();

uploadPage.get('', getFolders, (req, res) => {
  res.render('uploadFileForm', { folders: req.folders });
});

uploadPage.post('', upload.single('file'), (req, res) => {
  res.redirect('storage');
});

export default uploadPage;
