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

describe('DELETE /projects/:id/comments/:commentId', () => {
  let tokenUser0 = null  
  let tokenUser1 = null
  let project = null
  let comment0 = null
  let comment1 = null

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        tokenUser0 = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' }) 
        tokenUser1 = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '6h' })
        return Project.create({ 
          name: 'Project 1',
          collaborators: [],
          description: 'This is a description of project 1',
          location: 'Glasgow',
          images: ['http://via.placeholder.com/360x360','http://via.placeholder.com/360x360'],
          completed: true,
          recruiting: false,
          owner: users[0],
          comments: [
            { user: users[0]._id, text: 'This is text from user 1' },
            { user: users[1]._id, text: 'This is text from user 2' }]
        })
      })
      .then(createdproject => {
        project = createdproject 
        comment0 = project.comments[0]
        comment1 = project.comments[1]
        done()
      })
  })

  afterEach(done => { 
    User.deleteMany()
      .then(() => Project.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.delete(`/api/projects/${project._id}/comments/${comment0._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 401 response with a wrong token', done => {
    api.delete(`/api/projects/${project._id}/comments/${comment0._id}`)
      .set('Authorization', `Bearer ${tokenUser1}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 401 response, project owner can\'t delete other comments', done => {
    api.delete(`/api/projects/${project._id}/comments/${comment1._id}`)
      .set('Authorization', `Bearer ${tokenUser0}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => {
    console.log(comment0._id)
    api.delete(`/api/projects/${project._id}/comments/${comment0._id}`)
      .set('Authorization', `Bearer ${tokenUser0}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

})