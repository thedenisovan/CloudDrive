import { validationResult } from 'express-validator';
import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
export default async function signupUser(req, res) {
    const { name, surname, email, password } = req.body;
    const result = validationResult(req);
    try {
        if (result.isEmpty()) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    surname,
                    password: hashedPassword,
                },
            });
            await prisma.profile.create({
                data: {
                    userId: user.id,
                    folders: {
                        create: [
                            { name: 'All Files' },
                            { name: 'Documents' },
                            { name: 'Images' },
                            { name: 'Gif' },
                            { name: 'Other' },
                        ],
                    },
                },
            });
            return res.status(200).redirect('/signin');
        }
        return res.status(400).render('signup', {
            errors: result.array(),
        });
    }
    catch {
        res.status(404).render('404');
    }
}
//# sourceMappingURL=signupUser.js.map