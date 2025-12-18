import { Router } from 'express';
import getFolders from '../middleware/getFolders.js';
import multer from 'multer';
import { uploadFile } from '../middleware/supbase.js';

const uploadPage = Router();
const upload = multer(); // memory storage

uploadPage.get('', getFolders, (req, res) => {
  res.render('uploadFileForm', {
    folders: req.folders,
  });
});

uploadPage.post('', upload.single('file'), async (req, res) => {
  try {
    const userId = req.user!.id; // Passport user
    const file = req.file;
    const folder = req.body.folder;

    await uploadFile(userId, file, folder);
    await uploadFile(userId, file, 'All Files');
    res.redirect('storage');
  } catch (err) {
    console.error(err);
    res.status(500).redirect('404');
  }
});

export default uploadPage;
