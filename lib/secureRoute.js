const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const User = require('../models/user')

function secureRoute(req, res, next) {
  // If there is no Authorization header, Unauthorized
  if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' })
  const token = req.headers.authorization.replace('Bearer ', '')
  // Get the token and verify that it is a real token
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
    // Find the user by that token
    .then(payload => {
      return User.findById(payload.sub)
    })
    // If the user is real
    .then(user => {
      if (!user) res.status(401).json({ message: 'Unauthorised' })
      // add that user onto the request for authentication stuff later on
      req.currentUser = user
      next()
    })
    .catch(() => res.status(401).json({ message: 'Unauthorised' }))

}

module.exports = secureRoute