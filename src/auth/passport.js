import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import 'dotenv/config';
import { UserModel } from '../models/user.schema.js';

const cookieExtractor = (req) => {
  if (!req || !req.cookies) return null;
  return req.cookies['jwt'] || null;
};

passport.use('current', new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET
  },
  async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.uid).populate('cart');
      if (!user) return done(null, false);
      return done(null, user);
    } catch (e) { return done(e, false); }
  }
));

export default passport;
