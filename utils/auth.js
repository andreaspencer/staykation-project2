const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login/handlebars');
    } else {
        next();
    }
}

module.exports = withAuth;