import { Router } from 'express';
import signinValidator from '../validators/signin.validator';
import validatorMiddleware from '../middleware/signin.validatorResult';
import passport from 'passport';

const homePage = Router();

homePage.get('/', (req, res) => res.render('index'));
homePage.post(
  '/',
  signinValidator,
  validatorMiddleware,
  passport.authenticate('local', {
    successRedirect: '/storage',
    failureRedirect: '/',
    failureMessage: true,
  })
);

export default homePage;
