/* global describe, beforeEach, afterEach, it, api, expect */

const Project = require('../../models/project') 
const User = require('../../models/user')


describe('GET /api/users', () => {
  beforeEach(done => {
    User.create([
      {
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
      },
      {
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
      },
      {
        username: 'test3',
        name: 'test3',
        email: 'test3@test1.com',
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
      },
      {
        username: 'test4',
        name: 'test4',
        email: 'test4@test1.com',
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
      }
    ])
      .then(() => done())
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Project.deleteMany())
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/users')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })
  it('should return an array', done => {
    api.get('/api/users')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })
  it('should return an array of objects', done => {
    api.get('/api/users')
      .end((err, res) => {
        res.body.forEach(user => {
          expect(user).to.be.an('object')
        })
        done()
      })
  })
  it('should return an array of objects with the correct fields', done => {
    api.get('/api/users')
      .end((err, res) => {
        res.body.forEach(user => {
          expect(user).to.contains.keys([
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
        })
        done()
      })
  })
  it('should return an array of objects with the correct fields and types of values', done => {
    api.get('/api/users')
      .end((err, res) => {
        res.body.forEach(user => {
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
        })
        done()
      })
  })
})





