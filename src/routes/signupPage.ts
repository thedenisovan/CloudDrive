import { Router } from 'express';

const signupPage = Router();

signupPage.get('/', (req, res) => res.render('signup'));

export default signupPage;
