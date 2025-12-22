import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const fileViewPage = Router();

fileViewPage.get('/:fileId', async (req, res) =>
  res.render('fileViewPage', {
    file: await prisma.file.findUnique({
      where: { id: Number(req.params.fileId) },
    }),
  })
);

export default fileViewPage;
