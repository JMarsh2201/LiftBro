const express = require('express');
const UserSignUpAndSignIn = express.Router()
// import mongoose schemas
const User = require('../../models/user')
const UserSession = require('../../models/userSession')



// confirms that all necessary fields are filled in SignIn and SignUp routes.
function validateFields(body, isSigningUp) {
  let {
    username,
    email,
    password
  } = body;

  for (let key in body) {
    if (!body[key]) {
      // if signing up as a new user, all fields must be filled
      if (isSigningUp) {
        return res.send({
          success: false,
          message: `Error: ${body[key]} cannot be blank`
        })
      } else if (!isSigningUp) {
        // if signing in, we don't require the username, just email and password
        if (key !== 'username') {
          return res.send({
            success: false,
            message: `Error: ${body[key]} cannot be blank`
          })
        }
      }
    }
  }
  email = email.toLowerCase()
  return {
    username,
    email,
    password
  }
}

UserSignUpAndSignIn.route('/account/signup')
  .post((req, res, next) => {
    const { body } = req;
    let { username,
          email,
          password } = validateFields(body, true)
  User.find({ email }, (err, users) => {
    if (err) {
      return res.send({
        message: 'Server Error'
      })
    }
    // if the provided email address is found, user may not sign up.
    // They are already a user.
    else if (users.length > 0) {
      return res.send({
        message: 'Error: Account Email already exists!'
      })
    }
    const newUser = new User()
    newUser.email = email
    newUser.username = username
    // generateHash is bcrypt method imported from UserSchema
    newUser.password = newUser.generateHash(password)
    // if all fields are filled and the provided email is not already present
    // in the database, the users signup request will be successful
    newUser.save(err => {
      if (err) res.send(err)
      res.send({
        message: 'Successfully signed up!'
      })
    })
  })
})

UserSignUpAndSignIn.route('/account/signin')
  .post((req, res, next) => {
    const { body } = req;
    let { username,
          email,
          password } = validateFields(body, false)
    User.find({ email }, (err, users) => {
      if (err) {
        res.send({
          success: false,
          message: 'Error: Server Error'
        })
      }
      // There should only ever be exactly 1 matching email address when signing in
      // if there are 0 the user has not signed up, and the sign up route prevents
      // duplicate emails from adding to the database.
      if (users.length != 1) {
        res.send({
          success: false,
          message: 'No user with that email'
        })
      }
      const user = users[0]
      // validPassword is an imported bcrypt method from UserSchema
      if (!user.validPassword(password)) {
        res.send({
          success: false,
          message: 'Error: Invalid Password'
        })
      }
      const userSession = new UserSession()
      // makes user._id available to UserSession object.
      userSession.userId = user._id
      userSession.save((err, doc) => {
        if (err) {
          res.send({
            success: false,
            message: 'Error: Server Error'
          })
        }
        return res.send({
          success: true,
          message: 'successfully signed in!',
          token: doc._id
        })
      })
    })
  })

// route to check authorization to various url paths.
UserSignUpAndSignIn.route('/account/verify')
  .get((req, res, next) => {
    const token = req.query.token
    // searches for session that matches users token, and confirms that session
    // is not currently deleted
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server Error'
        })
      }
      // if no session is found, user is not verified
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Not Authorized'
        })
      } else {
        // if token matches a session and session is not deleted then user may
        // access the private route they are attempting to access
        return res.send({
          success: true,
          message: 'oh boy.'
        })
      }
    })
  })

// finds the users active session and sets isDeleted to true, ending the session.
UserSignUpAndSignIn.route('/account/logout')
  .get((req, res, next) => {
    const token = req.query.token
    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted: true
      }
    }, null, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server Error'
        })
      }
      return res.send({
        success: true,
        message: 'you have logged out now'
      })
    })
  })

module.exports = UserSignUpAndSignIn
