import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import config from "./config";
import TokenTypes from "./token";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: any, done: any) => {
  try {
    if (payload.type !== TokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    console.log("jwtVerify", payload.sub);
    // const user = await User.findById(payload.sub);
    // if (!user) {
    //   return done(null, false);
    // }
    done(null, "user");
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
