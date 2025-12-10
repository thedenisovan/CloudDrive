import { Router } from 'express';

const storagePage = Router();

storagePage.get('/', (req, res) => res.render('storage'));

export default storagePage;
