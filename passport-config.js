const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail) {
  const authenticateUser = (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
        return done(null, false, { message: 'No user by that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Incorrect Password'})
      } 
    } catch (error) {
      return done(error)
    }
  }

  passport.use(new localStrategy({ usernameField: 'email' }),
  authenticateUser)
  passport.serializeUser((user, done) => { })
  passport.deserializeUser((id, done) => { })
}

module.exports = initialize()