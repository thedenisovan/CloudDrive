import bcrypt from 'bcryptjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { prisma } from '../lib/prisma.js';

passport.use(
  new LocalStrategy.Strategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { email: username } });
      if (!user) return done(null, false);

      const deserializedPassword = await bcrypt.compare(
        password,
        user.password
      );

      if (!deserializedPassword) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    done(null, user);
  } catch (err) {
    done(err);
  }
});
