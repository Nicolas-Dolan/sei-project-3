/* global describe, beforeEach, afterEach, it, api, expect */

const Project = require('../../models/project') 
const User = require('../../models/user')


describe('GET /api/projects', () => {
  beforeEach(done => {
    User.create({
      username: 'test',
      name: 'test',
      email: 'test@test.com',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(user => {
        Project.create([
          {
            name: 'Project 1',
            owner: user,
            collaborators: [],
            description: 'This is a description of project 1',
            location: 'Glasgow',
            images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360'],
            completed: true,
            recruiting: false,                                        
            skillsInvolved: [],
            lookingFor: [], 
            likes: [],
            comments: [],
            messages: []
          },
          {
            name: 'Project 2',
            owner: user,
            collaborators: [],
            description: 'This is a description of project 2',
            location: 'Glasgow',
            images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360'],
            completed: true,
            recruiting: false,  
            skillsInvolved: [],
            lookingFor: [], 
            likes: [],
            comments: [],
            messages: []
          }
        ])
      })
      .then(() => done())
  })
  afterEach(done => {
    User.deleteMany()
      .then(() => Project.deleteMany())
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/projects')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })
  it('should return an array', done => {
    api.get('/api/projects')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })
  it('should return an array of objects', done => {
    api.get('/api/projects')
      .end((err, res) => {
        res.body.forEach(project => {
          expect(project).to.be.an('object')
        })
        done()
      })
  })
  it('should return an array of objects with the correct fields', done => {
    api.get('/api/projects')
      .end((err, res) => {
        res.body.forEach(project => {
          expect(project).to.contains.keys([
            '_id',
            'name',
            'owner',
            'collaborators',
            'description',
            'location',
            'images',
            'completed',
            'recruiting',
            'skillsInvolved',
            'lookingFor',
            'likes',
            'comments',
            'messages'
          ])
        })
        done()
      })
  })
  it('should return an array of objects with the correct fields and types of values', done => {
    api.get('/api/projects')
      .end((err, res) => {
        res.body.forEach(project => {
          expect(project._id).to.be.a('string')
          expect(project.name).to.be.a('string')
          expect(project.owner).to.be.an('object')
          expect(project.collaborators).to.be.an('array')
          expect(project.description).to.be.a('string')
          expect(project.location).to.be.a('string')
          expect(project.images).to.be.an('array')
          expect(project.skillsInvolved).to.be.an('array')
          expect(project.lookingFor).to.be.an('array')
          expect(project.likes).to.be.an('array')
          expect(project.comments).to.be.an('array')
          expect(project.completed).to.be.a('boolean')
          expect(project.recruiting).to.be.a('boolean')
        })
        done()
      })
  })
})



