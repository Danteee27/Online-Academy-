import passport from 'passport'
import session from 'express-session'
import dotenv from "dotenv";
import GoogleStrategy from 'passport-google-oauth2'
dotenv.config();
import usersService from '../services/users.service.js'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export default function (app) {

    passport.use(new GoogleStrategy.Strategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/google/callback",
            passReqToCallback: true,
        },
        function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    function isLoggedIn(req, res, next) {
        req.user ? next() : res.sendStatus(401);
    }

    app.use(passport.initialize());
    app.use(passport.session());



    app.get('/google',
        passport.authenticate('google', { scope: [ 'email', 'profile' ] }
        ));

    app.get( '/google/callback',
        passport.authenticate( 'google', {
            successRedirect: '/protected',
            failureRedirect: '/auth/google/failure'
        })
    );

    app.get('/protected', isLoggedIn,async (req, res) => {

        const existedUser = await usersService.findByEmail(req.user.emails);

        if(existedUser === null)
        {

            const user = {
                name: req.user.displayName,
                email: req.user.emails[0].value,
                password: '123',
                role: 'ROLE.USER'
            }
            await usersService.add(user);
        }
        else
        {
            console.log('Email already in used');
        }


        res.send(`Hello ${req.user.displayName}`);
    });

    app.get('/logout', (req, res) => {
        req.logout();
        req.session.destroy();
        res.send('Goodbye!');
    });

    app.get('/auth/google/failure', (req, res) => {
        res.send('Failed to authenticate..');
    });
}