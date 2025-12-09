import { Router } from 'express';
import signupValidator from '../validators/signup.validator.js';
import signupUser from '../controllers/signupUser.js';

const signupPage = Router();

signupPage.get('/', (req, res) => res.render('signup', { errors: [] }));
signupPage.post('/', signupValidator, signupUser);

export default signupPage;
