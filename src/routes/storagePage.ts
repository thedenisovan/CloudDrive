import { Router } from 'express';

const storagePage = Router();

storagePage.get('/', (req, res) => res.render('storage', { user: req.user }));

export default storagePage;
