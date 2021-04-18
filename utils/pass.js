"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const User = require("../models/User.js");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcrypt");

// local strategy for username password login
passport.use(
    new Strategy(
        {
            usernameField: "username",
            passwordField: "password",
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                console.log("Local strategy", user); // result is binary row
                if (user === undefined) {
                    return done(null, false, { message: "Incorrect username." });
                }
                if (!(await bcrypt.compare(password, user.password))) {
                    return done(null, false, { message: "Wrong cretendials." });
                }
                return done(null, user.toJSON(), { message: "Logged In Successfully" }); // use spread syntax to create shallow copy to get rid of binary row type
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: "your_jwt_secret",
        },
        async (jwtPayload, done) => {
            try {
                const user = await User.findById(jwtPayload._id);
                // console.log("JWT strategy", user);
                if (user == null) {
                    return done(null, false, { message: "User not found." });
                }

                return done(null, user, { message: "Logged In Successfully" });
            } catch (err) {
                return done(err);
            }
        }
    )
);

module.exports = passport;