'use strict'
const bCrypt = require('bcrypt-nodejs')
const LocalStrategy = require('passport-local').Strategy

module.exports = (passport, userModel) => {
    
  passport.serializeUser((userModel, done) => done(null, userModel.id))

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id)
    user ? done(null, user.get()) : done(user.errors, null)
  })

  passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        email: 'email',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    async (req, username, password, done)  => {

      const generateHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)

        const userNick = await userModel.findOne({
          where: { username: username }
        })

        const userEmail = await userModel.findOne({
          where: { email: req.body.email }
        })

        if (userNick || userEmail) {
          if(userNick){
            return done(null, false, { message: 'Username is already taken' })
          } else {
            return done(null, false, { message: 'Email address is already taken' })
          }
        } else {
          const userPassword = generateHash(password)
          const data = { username: username,
            password: userPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email.toLowerCase()
          }

          await userModel.create(data).then((newUser, created) => {
            newUser ? done(null, newUser) : done(null, false)
          })
        }
    }
    ))

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    async (req, username, password, done) => {
      try {
        const isValidPassword = (userpass, password) => bCrypt.compareSync(password, userpass)
        const user = await userModel.findOne({
          where: {
            username: username
          }
        })
        if (!user) {
          return done(null, false, { message: 'Username does not exist' })
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        const userInfo = user.get()
          return done(null, userInfo)
        } catch (err) {
          console.log("Error:", err)
          return done(null, false, { message: 'Something went wrong with your Signin' })
        }
    }
  ))
}