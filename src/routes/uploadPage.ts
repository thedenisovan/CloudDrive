import { Router } from 'express';
import getFolders from '../middleware/getFolders';
import multer from 'multer';

const uploadPage = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

uploadPage.get('', getFolders, (req, res) => {
  res.render('uploadFileForm', { folders: req.folders });
});

uploadPage.post('', upload.single('file'), (req, res) => {
  res.redirect('storage');
});

export default uploadPage;
