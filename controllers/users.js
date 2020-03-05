const User = require('../models/user')
const Project = require('../models/project')

// all users profiles
function index(req, res) {
  User
    .find()
    .populate('pendingProjects')
    .then(foundUsers => res.status(200).json(foundUsers))
    .catch(err => res.status(400).json(err))
}

// need to change the findby id to find username - also needs to be changed on front end -- same with likes
function show(req, res, next) {
  User
    .findOne({ username: req.params.username })
    .populate('chats')
    .populate('chats.members')
    .populate('createdProjects')
    .populate('collaboratedProjects')
    .populate('pendingProjects.project')
    .then(user => {
      if (!user) throw new Error('Not Found')
      res.status(200).json(user)
    })
    .catch(next)
}

function update(req, res, next) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      if (!user)  throw new Error('ValidationError')  
      if (!user._id.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      Object.assign(user, req.body)
      return user.save()
    })
    .then(user => res.status(202).json(user))
    .catch(next)
}

function destroy(req, res) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      
      if (!user._id.equals(req.currentUser._id)) {
        res.status(401).json({ message: 'Unauthorised' })
      } else {
        user.remove().then(() => res.sendStatus(204))
      }
    })
    .catch(err => res.json(err))
}

function like(req, res) {
  User
    .findOne({ username: req.params.username })
    .populate('createdProjects')
    .populate('collaboratedProjects')
    .then(user => {
      console.log(user)
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      if (req.currentUser._id.toString() === user._id.toString()) return res.status(401).json({ message: 'Unauthorized' })
      const skill = user.skills.id(req.params.skill)
      const users = skill.likes.map(like => like.user)
      if (!users.includes(req.currentUser._id)) {
        skill.likes.push({ user: req.currentUser._id })
      } else {
        const newLikes = skill.likes.filter(like => like.user._id.toString() !== req.currentUser._id.toString())
        skill.likes = newLikes
      }
      return user.save()
    })
    .then(user => res.status(202).json(user))
    .catch(err => res.status(400).json(err))
}

function newSkill(req, res) {
  User
    .findOne({ username: req.params.username })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      if (req.currentUser._id.toString() !== user._id.toString()) return res.status(401).json({ message: 'Unauthorized' })
      const skills = user.skills.map(skill => skill.skill)
      if (!skills.includes(req.body.skill)) {
        user.skills.push(req.body)
      } else {
        user.skills = user.skills.filter(skill => skill.skill !== req.body.skill)
      }
      return user.save() 
    })
    .then(user => res.status(202).json(user))
    .catch(err => res.status(400).json(err))
}

function userPendingProject(req, res) {
  User
    .findById(req.body.userId)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      if (req.currentUser._id.toString() !==  req.body.userId.toString() && req.currentUser._id.toString() !== req.body.ownerId.toString()) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      User.findById(req.body.ownerId)
        .then(owner => {
          const projects = user.pendingProjects.map(project => project.project)
          if (projects.includes(req.body.project.project)) return user.save()
          if (req.body.userId.toString() === req.currentUser._id.toString()) {
            req.body.user = true
            owner.pendingProjects.push(req.body)
            user.pendingProjects.push(req.body)
          } else if (req.body.ownerId.toString() === req.currentUser._id.toString()) {
            req.body.owner = true
            owner.pendingProjects.push(req.body)
            user.pendingProjects.push(req.body)
          }
          owner.save()
          return user.save()
        })
        .then(user => res.status(202).json(user))
      // const projects = user.pendingProjects.map(project => project.project)
      // if (projects.includes(req.body.project.project)) return user.save()
      // if (req.body.user.toString() === req.currentUser._id.toString()) {
      //   req.body.project.user = true
      //   user.pendingProjects.push(req.body.project)
      // } else if (req.body.owner.toString() === req.currentUser._id.toString()) {
      //   req.body.project.owner = true
      //   user.pendingProjects.push(req.body.project)
      // }
      // return user.save()
    })
    // .then(user => res.status(202).json(user))
    .catch(err => res.status(400).json(err))
}

function deletePendingProject(req, res) {
  User
    .findById(req.params.userId)
    .populate('pendingProjects.userId')
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      const proj = user.pendingProjects.find(project => project.project.toString() === req.params.projectId.toString())
      const userPending = proj.userId.pendingProjects.filter(project => project.project.toString() !== req.params.projectId.toString())
      console.log(user)
      // const userPending = user.pendingProjects.filter(project => project.project.toString() !== req.params.projectId.toString())
      console.log(userPending)
      // user.pendingProjects = userPending
      proj.userId.pendingProjects = userPending
      proj.userId.save()
      Project.findById(req.params.projectId)
        .then(project => {
          User.findById(project.owner)
            .then(owner => {
              const ownerPending = owner.pendingProjects.filter(project => (
                !(project.project.toString() === req.params.projectId.toString()) &&
                project.userId.toString() === user._id.toString())
              )
              owner.pendingProjects = ownerPending
              owner.save()
            })
        })
      return user.save()
    })
    .then(user => res.status(202).json(user))
    .catch(err => res.status(400).json(err))
}

function acceptPendingProject(req, res) {
  User
    .findById(req.params.userId)
    .populate('pendingProjects.project')
    .populate('pendingProjects.userId')
    .populate('pendingProjects.ownerId')
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      const pendingProject = user.pendingProjects.find(pendingProject => pendingProject.project._id.toString() === req.params.projectId.toString())
      if (req.currentUser._id.toString() === pendingProject.userId._id.toString()) {
        // console.log(req.currentUser._id.toString(), pendingProject.ownerId.toString(), pendingProject.userId.toString())
        pendingProject.user = true
      } else if (req.currentUser._id.toString() === pendingProject.ownerId._id.toString()) {
        pendingProject.owner = true
        // console.log(req.currentUser._id.toString(), pendingProject.ownerId.toString(), pendingProject.userId.toString())
      } else {
        // console.log('getting here for some reason')
        // console.log(req.currentUser._id.toString(), pendingProject.ownerId.toString(), pendingProject.userId.toString())
        return res.status(401).json({ message: 'Unauthorized' })
      }
      console.log(pendingProject)
      if (pendingProject.owner === true && pendingProject.user === true) {
        pendingProject.project.collaborators.push(pendingProject.userId._id)
        const userPendingProject = pendingProject.userId.pendingProjects.find(pendingProject => pendingProject.project._id.toString() === req.params.projectId.toString())
        const ownerPendingProject = pendingProject.ownerId.pendingProjects.find(pendingProject => pendingProject.project._id.toString() === req.params.projectId.toString())
        console.log(userPendingProject, ownerPendingProject)
        ownerPendingProject.remove()
        userPendingProject.remove()
        pendingProject.userId.save()
        pendingProject.ownerId.save()
        pendingProject.project.save()
        pendingProject.remove()
        return user
      }
    })
    .then(user => res.status(202).json(user))
    .catch(err => res.status(400).json(err))
}

module.exports = { index, show, update, destroy, like, newSkill, userPendingProject, deletePendingProject, acceptPendingProject }