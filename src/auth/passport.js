import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import 'dotenv/config';
import { UserModel } from '../models/user.schema.js'; // o tu User model

const cookieExtractor = (req) => (!req || !req.cookies) ? null : req.cookies['jwt'] || null;

export default function initPassport() {
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
}
