import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import genFunc from 'connect-pg-simple';

dotenv.config();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const PostgresqlStore = genFunc(session);

const app = express();
const SECRET = process.env.NOT_FOR_YOU as string;

// Paths
const assetsPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'views');

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
    store: new PostgresqlStore({
      conString: process.env.LOCAL_CONNECTION,
      tableName: 'session',
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// View engine
app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.send('hi'));

// app.get('/log-out', (req, res, next) => {
//   req.logout((err) => {
//     if (err) return next(err);
//     res.redirect('/');
//   });
// });

// app.get('{*splat}', (_req, res) => {
//   res.status(404);
//   res.render('404');
// });

export default app;
