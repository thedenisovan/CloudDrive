import { Router } from 'express';
import sharedAccess from '../controllers/sharedAccess';
import signinValidator from '../validators/signin.validator';
import validatorMiddleware from '../validators/signin.validatorResult';
import passport from 'passport';

const homePage = Router();

homePage.get('/', (req, res) => res.render('index', { sharedAccess }));
homePage.post(
  '/',
  //   signinValidator,
  //   validatorMiddleware,
  passport.authenticate('local', {
    successRedirect: '/storage',
    failureRedirect: '/',
    failureMessage: true,
  })
);

export default homePage;
