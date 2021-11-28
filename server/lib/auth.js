const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ emailField: 'email' },
    async (username, password, done) => {   
    try {
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            return done(null, false, { message: 'Invalid email address or password' });

        }
        const passwordOK = await user.comparePassword(password);
        if (!passwordOK) {
            return done(null, false, { message: 'Invalid email address or password' });
        }
            return done(null, user);
    } catch (err) {
        return done(err);
    }
    })); // Setting up auth 1:53

passport.serializeUser((user, done) =>  done(null, user._id));
passport.deserializeUser(ansync, (id, done) => {
    try {
        const user = await User.findbyId(id).exec();
        return done(null, user); 

    } catch(err) {
        return done(err);
    }
});

module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),
    setUser: (req, res, next) => {
        res.locals.user = req.user;
        return next();
    },

};