import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import passportJWT from "passport-jwt";
const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;

import User from "../db/User.js"; // Adjust the import path as per your file structure


const filterJson = (obj, unwantedKeys) => {
    const filteredObj = {};
    Object.keys(obj).forEach((key) => {
        if (unwantedKeys.indexOf(key) === -1) {
            filteredObj[key] = obj[key];
        }
    });
    return filteredObj;
};

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req, email, password, done, res) => {
            try {
                const user = await User.findOne({ email: email });
                if (!user) {
                    return done(null, false, {
                        message: "User does not exist",
                    });
                }

                await user.login(password);
                user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
                return done(null, user);
            } catch (err) {
                return done(err, false, {
                    message: "Password is incorrect.",
                });
            }
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "jwt_secret",
        },
        async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload._id);
                if (!user) {
                    return done(null, false, {
                        message: "JWT Token does not exist",
                    });
                }
                user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
                return done(null, user);
            } catch (err) {
                return done(err, false, {
                    message: "Incorrect Token",
                });
            }
        }
    )
);

export default passport;
