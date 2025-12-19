import { Router } from 'express';
import getFolders from '../middleware/getFolders.js';
import multer from 'multer';
import { uploadUrlToDb } from '../middleware/supabase.js';
import { prisma } from '../lib/prisma.js';

const uploadPage = Router();
const upload = multer(); // memory storage

uploadPage.get('', getFolders, async (req, res) => {
  res.render('uploadFileForm', {
    folders: req.folders,
    profile: await prisma.profile.findUnique({
      where: { userId: req.user!.id },
    }),
  });
});

uploadPage.post('', upload.single('file'), async (req, res) => {
  try {
    const userId = req.user!.id; // Passport user
    const file = req.file;
    const folder = req.body.folder;

    // await uploadFile(userId, file!, folder);
    await uploadUrlToDb(userId, file!, folder);
    res.redirect('storage?folders=All+Files');
  } catch (err) {
    console.error(err);
    res.status(500).redirect('404');
  }
});

export default uploadPage;
