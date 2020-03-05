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

describe('DELETE /users/:username', () => {
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
    api.delete(`/api/users/${user1.username}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => {
    api.delete(`/api/users/${user1.username}`)
      .set('Authorization', `Bearer ${token1}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should return an object', done => {
    api.delete(`/api/users/${user1.username}`)
      .set('Authorization', `Bearer ${token1}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.delete(`/api/users/${user1.username}`)
      .set('Authorization', `Bearer ${token2}`)
      .send({ bio: 'This message has been changed' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })
})