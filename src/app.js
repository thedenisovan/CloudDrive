import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import dotenv from 'dotenv';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from './lib/prisma.js';
import homePage from './routes/homePage.js';
import signupPage from './routes/signupPage.js';
import signinPage from './routes/signinPage.js';
import storagePage from './routes/storagePage.js';
import uploadPage from './routes/uploadPage.js';
import fileViewPage from './routes/fileViewPage.js';
import './auth/signinUser.js'; // import local strategy controller
dotenv.config();
const app = express();
const SECRET = process.env.NOT_FOR_YOU;
// Middleware
app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
    },
    store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    }),
}));
app.use(passport.initialize());
app.use(passport.session());
// View engine
app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/fileViewPage', fileViewPage);
app.use('/signup', signupPage);
app.use('/signin', signinPage);
app.use('/storage', storagePage);
app.use('/upload', uploadPage);
app.use('/', homePage);
app.get('/log-out', (req, res, next) => {
    req.logout((err) => {
        if (err)
            return next(err);
        res.redirect('/');
    });
});
app.get('{*splat}', (_req, res) => {
    res.status(404);
    res.render('404');
});
export default app;
//# sourceMappingURL=app.js.map