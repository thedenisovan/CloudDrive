import { body } from 'express-validator';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
const signinValidator = [
    body('username').custom(async (value, { req }) => {
        const user = await prisma.user.findUnique({ where: { email: value } });
        if (!user)
            throw new Error('No user with given email exists.');
        req.user = user;
    }),
    body('password').custom(async (value, { req }) => {
        const user = req.user;
        if (!user)
            return; // If username failed, skip password check
        const passMatch = await bcrypt.compare(value, user.password);
        if (!passMatch)
            throw new Error('Incorrect password.');
    }),
];
export default signinValidator;
//# sourceMappingURL=signin.validator.js.map