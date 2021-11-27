//  File used to collect and package all API routes

const router = require('express').Router();
const passport = require('passport');
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
<<<<<<< HEAD

router.post('login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'views/login.handlebars?error=true',
}));

router.get('/login', (req, res) => res.render('views/login.handlebars', {error: req.query.error}));

router.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/');
});
=======
const commentRoutes = require('./comment-routes');
>>>>>>> 68010ad841546c25ad3525746d6c994108178810

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;