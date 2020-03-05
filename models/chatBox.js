const mongoose = require('mongoose')


//! creating private collab messages schema
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 150 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

//! creating chatbox schema
const chatBoxSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  messages: [ messageSchema ]
}, {
  timestamps: true
})

// chatBoxSchema
//   .pre('validate', function checkIfChatAlreadyExists(next) {
//     if (this.isModified('password') && this._passwordConfirmation !== this.password) {
//       this.invalidate('PasswordConfirmation', 'does not match')
//     }
//     next()
//   })

//! importing mongoose error validation plug in for better error handling 
chatBoxSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('ChatBox', chatBoxSchema)