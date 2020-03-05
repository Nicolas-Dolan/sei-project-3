/* global api, describe, it, expect, beforeEach, afterEach */
const Project = require('../../models/project')
const User = require('../../models/user')
const jwt = require('jsonwebtoken') 
const { secret } = require('../../config/environment') 

const testUserData = {
  username: 'test',
  name: 'test',
  email: 'test@test',
  password: 'pass',
  passwordConfirmation: 'pass'
}

const commentCorrect = {
  text: 'This is text data'
}

const commentBlank = {
  text: ''
}

const commentTooLong = {
  text: 'Test data too long. Test data too long. Test data too long. Test data too long. Test data too long. Test data too long. Test data too long. Test data too long. Test data too long. Test data too long'
}

const commentTooLongWhiteSpace = {
  text: '                                                                                                                                                                '
}


describe('POST /projects/:id/comments', () => {

  let token, project

  beforeEach(done => {
    User.create(testUserData)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' }) 
        return Project.create({
          name: 'Project 1',
          collaborators: [],
          description: 'This is a description of project 1',
          location: 'Glasgow',
          images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360'],
          completed: true,
          recruiting: false,
          owner: user
        })
      })
      .then(createdProject => {
        project = createdProject 
        done()
      })
  })

  afterEach(done => { 
    User.deleteMany()
      .then(() => Project.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.post(`/api/projects/${project._id}/messages`)
      .send(commentCorrect)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 422 response, no body sent', done => {
    api.post(`/api/projects/${project._id}/messages`)
      .set('Authorization', `Bearer ${token}`)      
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 422 response, text too long', done => {
    api.post(`/api/projects/${project._id}/messages`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentTooLong)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 422 response, text too long (white space)', done => {
    api.post(`/api/projects/${project._id}/messages`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentTooLongWhiteSpace)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 422 response with blank data', done => {
    api.post(`/api/projects/${project._id}/messages`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentBlank)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })


  it('should return a 201 response with a token', done => {
    api.post(`/api/projects/${project._id}/messages`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentCorrect)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post(`/api/projects/${project._id}/messages`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentCorrect)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

})