const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { skills, professions, level } = require('../config/environment')

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

const skillSchema = new mongoose.Schema({
  skill: { type: String, enum: skills, required: true },
  likes: [likeSchema]
})

const projectRequestSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.ObjectId, ref: 'Project' },
  owner: { type: Boolean, required: true },
  user: { type: Boolean, required: true }, 
  ownerId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, maxlength: 350 },
  profileImage: { type: String },
  location: { type: String },
  level: { type: String, enum: level },
  professions: [{ type: String, enum: professions }],
  projects: [{ type: mongoose.Schema.ObjectId, ref: 'Project' }],
  chatBoxes: [{ type: mongoose.Schema.ObjectId, ref: 'ChatBox' }],
  pendingProjects: [projectRequestSchema],
  firstLogin: { type: Boolean },
  skills: [skillSchema]
})

userSchema.virtual('createdProjects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.virtual('collaboratedProjects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'collaborators'
})

userSchema.virtual('chats', {
  ref: 'ChatBox',
  localField: '_id',
  foreignField: 'members'
})

// userSchema.virtual('likedProjects', {
//   ref: 'Project',
//   localField: '_id',
//   foreignField: 'likes.user'
// })

// ! deleting password on user when sent to JSON
userSchema
  .set('toJSON', {
    virtuals: true,
    transform(doc, json) {
      delete json.password
      return json
    }
  })

// ! Compares hashed log in password with the password attached to the user
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

// ! Setting the password Confirmation virtual field 
userSchema
  .virtual('passwordConfirmation') 
  .set(function setPasswordConfirmaion(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

// ! pre validation, checks that the password and passwordConfirmation match. If not, automatically invalidate the process
userSchema
  .pre('validate', function checkPasswordMatch(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('PasswordConfirmation', 'does not match')
    }
    next()
  })

// ! Pre saving the document, hash the bleedin password
userSchema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

//! importing the mongoose error validation plug in for better error handling 
userSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('User', userSchema)