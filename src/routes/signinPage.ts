import { Router } from 'express';
import signinValidator from '../validators/signin.validator.js';
import validatorMiddleware from '../middleware/signin.validResults.js';
import passport from 'passport';

const signinPage = Router();

signinPage.get('/', (req, res) => res.render('signin', { errors: [] }));
signinPage.post(
  '/',
  signinValidator,
  validatorMiddleware,
  passport.authenticate('local', {
    successRedirect: '/storage?folders=All+Files',
    failureRedirect: '/',
    failureMessage: true,
  })
);

export default signinPage;
