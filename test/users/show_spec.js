/* global api, describe, it, expect, beforeEach, afterEach */
const User = require('../../models/user') 

describe('GET /users/:username', () => {

  let user

  beforeEach(done => {
    User.create({
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
    })
      .then(createdUser => {
        user = createdUser       
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => done())
  })

  it('should return a 404 not found for an invalid project id', done => {
    api.get('/api/users/1234')
      .end((err, res) => {
        expect(res.status).to.eq(404)
        done()
      })
  })

  it('should return a 200 response', done => {
    api.get(`/api/users/${user.username}`) 
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/users/${user.username}`) 
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get(`/api/users/${user.username}`)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          'professions',
          'projects',
          'chatBoxes',
          '_id',
          'username',
          'name',
          'email',
          'bio',
          'profileImage',
          'location',
          'level',
          'skills'          ,
          'pendingProjects',
          '__v',
          'id'
        ])
        done()
      })
  })

  it('should return correct data types of keys in object', done => {
    api.get(`/api/users/${user.username}`) 
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


})