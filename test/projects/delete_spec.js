/* global api, describe, it, expect, beforeEach, afterEach */
const Project = require('../../models/project')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testUserData = [{ 
  username: 'test1',
  name: 'test1',
  email: 'test1@email',
  password: 'pass',
  passwordConfirmation: 'pass'
}, {
  username: 'test2',
  name: 'test2',
  email: 'test2@email',
  password: 'pass',
  passwordConfirmation: 'pass'
}]

describe('DELETE /projects/:id', () => {
  let token = null  
  let incorrectToken = null
  let project = null 

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' }) 
        incorrectToken = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '6h' })
        return Project.create({ 
          name: 'Project 1',
          collaborators: [],
          description: 'This is a description of project 1',
          location: 'Glasgow',
          images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360'],
          completed: true,
          recruiting: false,
          owner: users[0] 
        })
      })
      .then(createdproject => {
        project = createdproject 
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Project.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => { 
    api.delete(`/api/projects/${project._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => { //! DONE
    api.delete(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should return no data', done => { //! DONE
    api.delete(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.deep.eq({})
        done()
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => { //! DONE
    api.delete(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

})