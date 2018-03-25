'use strict'
const regExp = require('./regExpressions').regExpressions

const signUpValidation = (req) => {
  req.checkBody('username', 'Username is not valid').matches(regExp.signUp.usernameRegex, "i")
  req.checkBody('password', 'Password is not valid').matches(regExp.signUp.passwordRegex, "i")
  req.checkBody('firstName', 'First name is not valid').matches(regExp.signUp.nameRegex, "i")
  req.checkBody('lastName', 'Last name is not valid').matches(regExp.signUp.nameRegex, "i")
  req.checkBody('email', 'Email address is not valid').isEmail()
  return req.validationErrors()
}

const createNewLeagueValidation = (req) => {
  req.checkBody('leagueName', 'League name is not valid').matches(regExp.createNewLeague.leagueName, "i")
  return req.validationErrors()
}

const returnErrors = (validationErrors) => {
  const errors = []
  if(validationErrors.length > 0) {
    validationErrors.forEach(err => errors.push(err.msg))
  }
  return errors
}

module.exports = {
  singUp: (req) => returnErrors(signUpValidation(req)),

  createNewLeague: (req) => {
    let errors = returnErrors(createNewLeagueValidation(req))
    if(!req.body.hasOwnProperty('sport')){
      errors.push('Any sport must be selected')
    }
    return errors
  }
}