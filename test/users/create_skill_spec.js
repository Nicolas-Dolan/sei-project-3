/* global api, describe, it, expect, beforeEach, afterEach */
const User = require('../../models/user') 
const jwt = require('jsonwebtoken') 
const { secret } = require('../../config/environment') 

const testUserData = [{ 
  username: 'test1',
  name: 'test1',
  email: 'test1@test1.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  profileImage: 'test',
  location: 'Glasgow',
  bio: 'test',
  level: 'Intern',
  professions: [],
  skills: [],
  projects: [],
  pendingProjects: [],
  likes: []
}, {
  username: 'test2',
  name: 'test2',
  email: 'test2@test2.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  profileImage: 'test',
  location: 'Glasgow',
  bio: 'test',
  level: 'Intern',
  professions: [],
  skills: [],
  projects: [],
  pendingProjects: [],
  likes: []
}]

describe('POST /users/:username/newskill', () => {
  let token1, token2, user1

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {    
        token1 = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' }) 
        token2 = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '6h' }) 
        user1 = users[0]                   
        done()
      })
  })

  afterEach(done => { 
    User.deleteMany()
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.post(`/api/users/${user1.username}/newskill`)
      .send({ skill: 'Quicktime' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 202 response with a token', done => {
    api.post(`/api/users/${user1.username}/newskill`)
      .set('Authorization', `Bearer ${token1}`)
      .send({ skill: 'Quicktime' })
      .end((err, res) => {
        expect(res.status).to.eq(202)
        done()
      })
  })

  it('should return an object', done => {
    api.post(`/api/users/${user1.username}/newskill`)
      .set('Authorization', `Bearer ${token1}`)
      .send({ skill: 'Quicktime' })
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.post(`/api/users/${user1.username}/newskill`)
      .set('Authorization', `Bearer ${token1}`)
      .send({ skill: 'Quicktime' })
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '__v',
          '_id',
          'bio',
          'chatBoxes',
          'email',
          'id',
          'level',
          'location',
          'name',
          'pendingProjects',
          'professions',
          'profileImage',
          'projects',
          'skills',
          'username'       
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.post(`/api/users/${user1.username}/newskill`)
      .set('Authorization', `Bearer ${token1}`)
      .send({ skill: 'Quicktime' })
      .end((err, res) => {
        const user = res.body
        expect(user.professions).to.be.an('array')
        expect(user.projects).to.be.an('array')
        expect(user.chatBoxes).to.be.an('array')
        expect(user._id).to.be.a('string')
        expect(user.username).to.be.a('string')
        expect(user.name).to.be.a('string')
        expect(user.email).to.be.a('string')
        expect(user.bio).to.be.a('string')
        expect(user.profileImage).to.be.a('string')
        expect(user.location).to.be.a('string')
        expect(user.level).to.be.a('string')
        expect(user.skills).to.be.an('array')
        expect(user.pendingProjects).to.be.an('array')
        expect(user.__v).to.be.a('number')
        expect(user.id).to.be.a('string')  
        
        done()
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.post(`/api/users/${user1.username}/newskill`)
      .set('Authorization', `Bearer ${token2}`)
      .send({ skill: 'This message has been changed' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })
})