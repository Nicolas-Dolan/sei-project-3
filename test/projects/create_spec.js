/* global api, describe, it, expect, beforeEach, afterEach */
const Project = require('../../models/project')
const User = require('../../models/user')
const jwt = require('jsonwebtoken') 
const { secret } = require('../../config/environment') 

const testProject = {
  name: 'Project 1' ,
  description: 'This is a description of project 1',
  location: 'Glasgow',
  images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360'],
  completed: true,
  recruiting: false            
}

const testProjectMissingData = {
  name: 'Project 1',
  collaborators: [],
  location: 'Glasgow',
  images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360']
  
}

const testUserData = {
  username: 'test',
  name: 'test',
  email: 'testk@email',
  password: 'pass',
  passwordConfirmation: 'pass'
}

describe('POST /api/projects', () => {

  let token

  beforeEach(done => {
    User.create(testUserData)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
        done()
      })
  })

  afterEach(done => { 
    User.deleteMany()
      .then(() => Project.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => { //! DONE
    api.post('/api/projects')
      .send(testProject)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 422 response with wrong data', done => {
    console.log(token)
    api.post('/api/projects')
      .set('Authorization', `Bearer ${token}`) 
      .send(testProjectMissingData)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 201 response with a token', done => { // ! DONE
    api.post('/api/projects')
      .set('Authorization', `Bearer ${token}`) 
      .send(testProject)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return a 201 response with a token', done => { //! DONE
    api.post('/api/projects')
      .set('Authorization', `Bearer ${token}`) 
      .send(testProject)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => { //! DONE
    api.post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(testProject)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(testProject)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'owner',
          'collaborators',
          'description',
          'location',
          'images',
          'skillsInvolved',
          'lookingFor',
          'likes',
          'comments',
          'completed',
          'recruiting'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {  // ! DONE
    api.post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(testProject)
      .end((err, res) => {
        const project = res.body
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
        done()
      })
  })


})
