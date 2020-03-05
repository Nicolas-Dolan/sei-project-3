const Project = require('../models/project')

function index(req, res) {
  Project
    .find()
    .populate('owner')
    .then(foundProjects => res.status(200).json(foundProjects))
    .catch(err => res.status(400).json(err))
}

function create(req, res, next) {
  req.body.user = req.currentUser
  req.body.owner = req.currentUser
  req.body.collaborators = [req.body.owner]
  Project
    .create(req.body)
    .then(createdProject => {
      return res.status(201).json(createdProject)
    })
    .catch(next)
}

function show(req, res) {
  Project
    .findById(req.params.id)
    .populate('owner')
    .populate('collaborators')
    .populate('pendingCollaborators')
    .populate('comments.user')
    .populate('messages.user')
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found' })
      return res.status(200).json(project)
    })
    .catch(err => res.status(404).json(err))
}

function update(req, res, next) {
  Project
    .findById(req.params.id)
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found' })
      if (!project.owner.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      Object.assign(project, req.body)
      return project.save()
    })
    .then(project => res.status(202).json(project))
    .catch(next)
}

function destroy(req, res) {
  Project
    .findById(req.params.id)
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found' })
      if (!project.owner.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      else project.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}

function commentCreate(req, res, next) {
  req.body.user = req.currentUser
  Project
    .findById(req.params.id)
    .populate('owner')
    .populate('collaborators')
    .populate('pendingCollaborators')
    .populate('comments.user')
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found' })
      project.comments.push(req.body)
      return project.save()
    })
    .then(project => res.status(201).json(project))
    .catch(next)
}

function commentDelete(req, res) {
  Project
    .findById(req.params.id)
    .populate('owner')
    .populate('collaborators')
    .populate('pendingCollaborators')
    .populate('comments.user')
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found' })
      const comment = project.comments.id(req.params.commentId)
      if (!comment.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      comment.remove()
      return project.save()
    })
    .then(project => res.status(204).json(project))
    .catch(err => res.json(err))
}

function messageCreate(req, res, next) {
  req.body.user = req.currentUser
  Project
    .findById(req.params.id)
    .populate('owner')
    .populate('collaborators')
    .populate('pendingCollaborators')
    .populate('comments.user')
    .populate('messages.user')
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found' })
      project.messages.push(req.body)
      return project.save()
    })
    .then(project => res.status(201).json(project))
    .catch(next)
}

function messageDelete(req, res) {
  Project
    .findById(req.params.id)
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found' })
      const message = project.messages.id(req.params.messageId)
      if (!message.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      message.remove()
      return project.save()
    })
    .then(project => res.status(204).json(project))
    .catch(err => res.json(err))
}


function commentEdit(req, res) {
  Project
    .findById(req.params.id)
    .populate('owner')
    .populate('collaborators')
    .populate('pendingCollaborators')
    .populate('comments.user')
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found' })
      const comment = project.comments.id(req.params.commentId)
      if (!comment.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      comment.text = req.body.text
      return project.save()
    })
    .then(comment => res.status(202).json(comment))
    .catch(err => res.status(400).json(err))
}

function like(req, res) {
  Project
    .findById(req.params.id)
    .populate('owner')
    .populate('collaborators')
    .populate('pendingCollaborators')
    .populate('comments.user')
    .then(project => {
      if (!project) return res.status(404).json({ message: 'Not Found ' })
      const likeUsers = project.likes.map(like => like.user.toString())
      if (!likeUsers.includes(req.currentUser._id.toString())) {
        project.likes.push({ user: req.currentUser })
      } else {
        const newLikes = project.likes.filter(like => like.user.toString() !== req.currentUser._id.toString())
        project.likes = newLikes
      }
      // if (project.likes.some(like => like.user.equals(req.currentUser._id))) return project
      // project.likes.push({ user: req.currentUser })
      return project.save()
    })
    .then(project => res.status(202).json(project))
    .catch(err => res.json(err))
}


module.exports = { index, create, show, update, destroy, commentCreate, commentDelete, commentEdit, messageCreate, messageDelete, like }
