import { Router } from 'express';

const uploadPage = Router();

uploadPage.get('', (req, res) => res.render('uploadFileForm'));

export default uploadPage;
