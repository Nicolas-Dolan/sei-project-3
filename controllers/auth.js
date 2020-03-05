const User = require('./../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function register(req, res, next) {
  req.body.firstLogin = true
  User
    .create(req.body)
    .then(user => res.status(201).json({ message: `Thanks for registering ${user.name}` }))
    .catch(next)
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' })
      const firstLogin = user.firstLogin
      user.firstLogin = false
      user.save()
      res.status(202).json({ message: `Welcome back ${user.name}`, token, firstLogin })
    })
    .catch(next)
}

// current user profile
function myPortfolio(req, res, next) {
  User
    .findById(req.currentUser._id)
    .populate('chats')
    .populate('chats.members')
    .populate('chats.members.user')
    .populate('createdProjects')
    .populate('collaboratedProjects')
    .populate('pendingProjects.project')
    .populate('pendingProjects.ownerId')
    .populate('pendingProjects.userId')
    .then(user => res.status(200).json(user))
    .catch(next)
}

// edit user profile
function myPortfolioUpdate(req, res, next) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      if (!user) throw new Error('ValidationError')
      if (!user._id.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      Object.assign(user, req.body)
      return user.save()
    })
    .then(user => res.status(202).json(user))
    .catch(next)
}

module.exports = { register, login, myPortfolio, myPortfolioUpdate }