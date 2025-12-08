import { Router } from 'express';

const signinPage = Router();

signinPage.get('/', (req, res) => res.render('signin'));

export default signinPage;
