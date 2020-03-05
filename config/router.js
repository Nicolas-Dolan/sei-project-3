const router = require('express').Router()
const projects = require('../controllers/projects')
const auth = require('../controllers/auth')
const users = require('../controllers/users')
const chatBoxes = require('../controllers/chatBoxes')
const secureRoute = require('../lib/secureRoute')

router.route('/projects')
  .get(projects.index)
  .post(secureRoute, projects.create)

router.route('/projects/:id')
  .get(projects.show)
  .put(secureRoute, projects.update)
  .delete(secureRoute, projects.destroy)

router.route('/projects/:id/comments')
  // Need an edit comment route
  .post(secureRoute, projects.commentCreate)

router.route('/projects/:id/comments/:commentId')
  .delete(secureRoute, projects.commentDelete)
  .put(secureRoute, projects.commentEdit)

router.route('/projects/:id/messages')
  .post(secureRoute, projects.messageCreate)

router.route('/projects/:id/messages/:messageId')
  .delete(secureRoute, projects.messageDelete)

router.route('/projects/:id/like')
  .get(secureRoute, projects.like)

router.route('/users')
  .get(users.index)

router.route('/users/:username')
  .get(users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.destroy)

router.route('/users/:username/newskill')
  .post(secureRoute, users.newSkill)

router.route('/users/:username/skills/:skill/like')
  .get(secureRoute, users.like)

router.route('/users/collaborate')
  .post(secureRoute, users.userPendingProject)
  
router.route('/users/:userId/collaborate/:projectId')
  .delete(secureRoute, users.deletePendingProject)
  .get(secureRoute, users.acceptPendingProject)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

router.route('/myportfolio')
  .get(secureRoute, auth.myPortfolio)

router.route('/myportfolio/edit')
  .get(secureRoute, auth.myPortfolio)
  .put(secureRoute, auth.myPortfolioUpdate)
  // .delete(secureRoute, users.destroy)

router.route('/users/:userId/chatboxes')
  // .get(chatBoxes.index)
  .post(secureRoute, chatBoxes.create)

router.route('/users/:userId/chatboxes/:id')
  .get(secureRoute, chatBoxes.show)

router.route('/users/:userId/chatboxes/:id/messages')
  .post(secureRoute, chatBoxes.messageCreate)

router.route('/users/:userId/chatboxes/:id/messages/:messageId')
  .delete(secureRoute, chatBoxes.messageDelete)

module.exports = router