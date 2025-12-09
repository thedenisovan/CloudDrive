import { body } from 'express-validator';
import { prisma } from '../lib/prisma.js';

const signupValidator = [
  body('name')
    .trim()
    .notEmpty()
    .isAlpha()
    .withMessage('First name must contain only alphabet characters.'),
  body('surname')
    .trim()
    .notEmpty()
    .isAlpha()
    .withMessage('Last name must contain only alphabetic characters.'),
  body('email')
    .trim()
    .isEmail()
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { email: value } });

      if (user) throw new Error('E-mail all ready in use.');
    }),
  body('password')
    .trim()
    .matches(/^(?=.*[A-Z])(?=.*\d).{6,}$/)
    .withMessage('Password must be 6+ chars with uppercase and number.'),
  body('passwordConfirm')
    .trim()
    .custom(async (value, { req }) => {
      if (value !== req.body.password)
        throw new Error('Passwords did not match.');
    }),
];

export default signupValidator;
