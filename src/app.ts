import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import dotenv from 'dotenv';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pool from './db/pool.js';

import homePage from './routes/homePage.js';
import signupPage from './routes/signupPage.js';
import signinPage from './routes/signinPage.js';
import storagePage from './routes/storagePage.js';
import './controllers/signinUser.js'; // import local strategy controller

dotenv.config();

// adapter so i can use neon dp in my prisma project
const adapter = new PrismaPg(pool);

const app = express();
const SECRET = process.env.NOT_FOR_YOU as string;

// Paths
const assetsPath = path.join(import.meta.dirname, 'public');
const viewsPath = path.join(import.meta.dirname, 'views');

// Middleware
app.use(express.static(assetsPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
    },
    store: new PrismaSessionStore(new PrismaClient({ adapter }), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// View engine
app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use('/signup', signupPage);
app.use('/signin', signinPage);
app.use('/storage', storagePage);
app.use('/', homePage);

app.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

app.get('{*splat}', (_req, res) => {
  res.status(404);
  res.render('404');
});

export default app;
