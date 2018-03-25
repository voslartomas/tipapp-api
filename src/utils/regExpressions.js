module.exports.regExpressions = {
  signUp: {
    usernameRegex: /^(([a-zA-Z])[a-zA-Z_]*[\w_]*[\S]$|^([a-zA-Z])[0-9_]*[\S]$|^[a-zA-Z]*[\S]{2,30})$/,
    passwordRegex: /^([a-zA-Z0-9@*#]{4,15})$/,
    nameRegex: /^([a-zA-Z0-9áäéëěíóöôúůüýčďňřšťžĺľ@_'\- ]{2,30})$/
  },

  createNewLeague: {
    leagueName: /^([a-zA-Z0-9áäéëěíóöôúůüýčďňřšťžĺľ@_'\- ]{2,30})$/
  }
}