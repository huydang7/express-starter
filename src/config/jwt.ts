import config from '.';
import { TokenType } from 'interfaces/token';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: any, done: any) => {
  try {
    if (payload.type !== TokenType.ACCESS) {
      throw new Error('invalid token type');
    }

    // const user = await User.findById(payload.sub);
    // if (!user) {
    //   return done(null, false);
    // }
    done(null, payload.sub);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
