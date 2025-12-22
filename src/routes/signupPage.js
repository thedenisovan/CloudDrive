import { Router } from 'express';
import signupValidator from '../validators/signup.validator.js';
import signupUser from '../middleware/signupUser.js';
const signupPage = Router();
signupPage.get('/', (req, res) => res.render('signup', { errors: [] }));
signupPage.post('/', signupValidator, signupUser);
export default signupPage;
//# sourceMappingURL=signupPage.js.map