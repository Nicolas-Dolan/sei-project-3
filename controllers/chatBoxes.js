const ChatBox = require('../models/chatBox')

function index(req, res) {
  ChatBox
    .find()
    .populate('members')
    .then(foundChatBoxes => res.status(200).json(foundChatBoxes))
    .catch(err => res.status(400).json(err))
}

function create(req, res) {
  req.body.owner = req.currentUser
  // req.body.owner = [req.currentUser, req.params.userId]
  req.body.members = [req.currentUser, req.params.userId]
  ChatBox
    .create(req.body)
    // .populate('members')
    .then(createdChatBox => {
      console.log(req.body)
      return res.status(202).json(createdChatBox)
    })
    .catch(err => res.status(400).json(err))
}

function show(req, res) {
  ChatBox
    .findById(req.params.id)
    .populate('members')
    .populate('messages.user')
    .then(chatBox => {
      return res.status(202).json(chatBox)
    })
    .catch(err => res.status(400).json(err))
}


function messageCreate(req, res, next) {
  req.body.user = req.currentUser
  ChatBox
    .findById(req.params.id)
    .populate('members')
    .populate('messages.user')
    .then(chatBox => {
      if (!chatBox) return res.status(404).json({ message: 'Not Found' })
      chatBox.messages.push(req.body)
      return chatBox.save()
    })
    .then(chatBox => res.status(201).json(chatBox))
    .catch(next)
}

function messageDelete(req, res) {
  ChatBox
    .findById(req.params.id)
    .then(chatBox => {
      if (!chatBox) return res.status(404).json({ message: 'Not Found' })
      const message = chatBox.messages.id(req.params.messageId)
      if (!message.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      message.remove()
      return chatBox.save()
    })
    .then(chatBox => res.status(204).json(chatBox))
    .catch(err => res.json(err))
}



module.exports = { index, create, show, messageCreate, messageDelete }
