import multer from 'multer';
let idx = 0;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body.folder);
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
