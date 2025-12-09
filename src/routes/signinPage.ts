import { Router } from 'express';
import signinValidator from '../validators/signin.validator.js';
import validatorMiddleware from '../validators/signin.validatorResult.js';
import passport from 'passport';

const signinPage = Router();

signinPage.get('/', (req, res) => res.render('signin', { errors: [] }));
signinPage.post(
  '/',
  signinValidator,
  validatorMiddleware,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureMessage: true,
  })
);

export default signinPage;
