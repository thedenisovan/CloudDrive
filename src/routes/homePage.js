import { Router } from 'express';
import signinValidator from '../validators/signin.validator.js';
import validatorMiddleware from '../middleware/signin.validResults.js';
import passport from 'passport';
const homePage = Router();
homePage.get('/', (req, res) => res.render('index'));
homePage.post('/', signinValidator, validatorMiddleware, passport.authenticate('local', {
    successRedirect: '/storage?folders=All+Files',
    failureRedirect: '/',
    failureMessage: true,
}));
export default homePage;
//# sourceMappingURL=homePage.js.map