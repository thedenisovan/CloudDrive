import multer from 'multer';
import { uploadFile } from '../middleware/supbase.js';
let idx = 0;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads');
  },
  filename: function (req, file, cb) {
    const parts = file.originalname.split('.');

    const uniqueSuffix = parts[0]! + '|' + idx + '.' + parts[parts.length - 1];
    cb(null, uniqueSuffix);

    idx++;
  },
});

const upload = multer({ storage });

export default upload;
